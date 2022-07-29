import HangmanGame from '../HangmanGame';
import HangmanState, { getHangmanStateAssets } from '../HangmanState';
import Screen from '../Screen';
import Text from '../attachments/Text';
import { isAlpha } from '../utils';
import RetryScreen from './RetryScreen';
import LoseScreen from './LoseScreen';
import WinScreen from './WinScreen';

export default class HangmanGameScreen extends Screen {
  private state: HangmanState;
  private guessText: Text;
  private guessLetterText: Text;
  private word!: string;
  private guessedStr!: string;
  private guessedLetters!: string[];

  private assets!: Map<HangmanState, HTMLImageElement>;

  private game: HangmanGame;

  private keyPressBoundMethod!: (ev: KeyboardEvent) => void; // event listener api an L fr

  private ready: boolean = false;

  public constructor(game: HangmanGame) {
    super();
    this.state = HangmanState.NONE;

    this.game = game;

    this.guessText = new Text(
      { x: 50, y: game.getCanvas().height / 3 },
      game.getCanvas().height / 10,
      game.getCanvas().width / 3.1,
      ''
    );
    this.guessLetterText = new Text(
      { x: 50, y: (game.getCanvas().height * 2) / 3 },
      game.getCanvas().height / 15,
      game.getCanvas().width / 3.1,
      ''
    );
    this.startGame();
  }

  private checkLetter(letter: string): 'repeat' | boolean {
    const l = letter.toLowerCase();
    if (this.guessedLetters.includes(l) || !isAlpha(l)) return 'repeat'; // alreay guessed

    let containsLetter = false;

    for (let i = 0; i < this.word.length; i++) {
      const letter = this.word[i];
      if (letter.toLowerCase() !== l) continue;
      this.guessedStr = this.guessedStr.substring(0, i) + letter + this.guessedStr.substring(i + 1);
      containsLetter = true;
    }
    this.guessedLetters.push(l);
    return containsLetter;
  }

  private async fetchWord() {
    // https://github.com/mcnaveen/Random-Words-API
    const wordResp = await fetch('https://random-words-api.vercel.app/word');
    const word = (await wordResp.json()) as { word: string; definition: string; pronunciation: string }[];

    return word[0].word;
  }

  private async startGame() {
    this.ready = false;
    this.word = await this.fetchWord();

    this.assets = await getHangmanStateAssets();
    this.guessedStr = '_'.repeat(this.word.length);
    this.guessedLetters = [];

    this.game.render();
    this.ready = true;
  }

  onAttach(elem: HTMLCanvasElement) {
    this.addAttachment(this.guessText);
    this.addAttachment(this.guessLetterText);
    this.keyPressBoundMethod = this.onKeyPress.bind(this);
    window.addEventListener('keypress', this.keyPressBoundMethod, false);
  }

  onDetach(elem: HTMLCanvasElement): void {
    window.removeEventListener('keypress', this.keyPressBoundMethod, false);
  }

  private onKeyPress(e: KeyboardEvent) {
    if (!this.ready) return;
    if (e.key.length !== 1) return;
    e.preventDefault();
    const chkLtr = this.checkLetter(e.key);

    if (!chkLtr) {
      this.incrementState();
    } else if (this.word === this.guessedStr) {
      this.win();
    }
    this.game.render();
  }

  private incrementState() {
    this.state++;
    if (this.state === HangmanState.RIGHT_LEG) {
      this.lose();
    }
  }

  private win() {
    this.game.attachScreen(new WinScreen(this.game, this));
  }

  private lose() {
    this.game.attachScreen(new LoseScreen(this.game, this, this.word));
  }

  onRender(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'black';
    this.guessText.setText(this.guessedStr.split('').join(' '));
    this.guessLetterText.setText(this.guessedLetters.join(', '));

    const asset = this.assets.get(this.state);
    if (!asset) return;

    const aspectRatioR = asset.height / asset.width;

    ctx.drawImage(
      asset,
      (ctx.canvas.width * 3.4) / 5,
      ctx.canvas.height / 10,
      (ctx.canvas.width * 1.6) / 5,
      ((ctx.canvas.width * 1.6) / 5) * aspectRatioR
    );
  }
}

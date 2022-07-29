import HangmanGame from '../HangmanGame';
import HangmanGameScreen from './HangmanGameScreen';
import RetryScreen from './RetryScreen';
import Text from '../attachments/Text';

export default class LoseScreen extends RetryScreen {
  private t1: Text;
  private t2: Text;
  constructor(game: HangmanGame, gameScreen: HangmanGameScreen, correctWord: string) {
    super(game, gameScreen);
    this.t1 = new Text(
      { x: game.getCanvas().width / 2, y: game.getCanvas().height / 4 },
      200,
      300,
      `You lost!`,
      'center'
    );
    this.t2 = new Text(
      { x: game.getCanvas().width / 2, y: game.getCanvas().height / 4 + 100 },
      200,
      300,
      `Correct Word: ${correctWord}`,
      'center'
    );
  }

  onAttach(elem: HTMLCanvasElement): void {
    super.onAttach(elem);
    this.addAttachment(this.t1);
    this.addAttachment(this.t2);
  }
}

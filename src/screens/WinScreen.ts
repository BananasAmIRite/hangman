import HangmanGame from '../HangmanGame';
import HangmanGameScreen from './HangmanGameScreen';
import RetryScreen from './RetryScreen';
import Text from '../attachments/Text';

export default class WinScreen extends RetryScreen {
  private winText: Text;
  constructor(game: HangmanGame, gameScreen: HangmanGameScreen) {
    super(game, gameScreen);
    this.winText = new Text(
      { x: game.getCanvas().width / 2, y: game.getCanvas().height / 4 },
      300,
      300,
      'You won!',
      'center'
    );
  }

  onAttach(elem: HTMLCanvasElement): void {
    super.onAttach(elem);
    this.addAttachment(this.winText);
  }
}

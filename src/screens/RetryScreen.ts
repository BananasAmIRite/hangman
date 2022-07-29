import Button from '../attachments/Button';
import HangmanGame from '../HangmanGame';
import HangmanGameScreen from './HangmanGameScreen';
import OverlayScreen from './OverlayScreen';

export default class RetryScreen extends OverlayScreen {
  private retryBtn: Button;
  public constructor(game: HangmanGame, gameScreen: HangmanGameScreen) {
    super(gameScreen);

    const WIDTH = 250;
    const HEIGHT = 100;

    this.retryBtn = new Button(
      'Retry',
      {
        x: game.getCanvas().width / 2 - WIDTH / 2,
        y: game.getCanvas().height / 2 - HEIGHT / 2,
      },
      WIDTH,
      HEIGHT,
      5,
      'green',
      () => {
        game.start();
      }
    );
  }

  onAttach(elem: HTMLCanvasElement): void {
    this.addAttachment(this.retryBtn);
  }
  renderOverlay(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); // gray overlay
  }
  onDetach(elem: HTMLCanvasElement): void {}
}

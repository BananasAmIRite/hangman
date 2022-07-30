import Screen from './Screen';
import HangmanGameScreen from './screens/HangmanGameScreen';

export default class HangmanGame {
  private screen?: Screen;
  private canvas: HTMLCanvasElement;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public attachScreen(screen: Screen) {
    this.detachScreen();
    this.screen = screen;
    screen.attach(this.canvas);
  }

  public detachScreen() {
    this.screen?.detach(this.canvas);
    this.screen = undefined;
  }

  public render() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas rendering context does not exist. ');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.screen?.render(ctx);
  }

  public start() {
    this.attachScreen(new HangmanGameScreen(this));
  }

  public getCanvas() {
    return this.canvas;
  }
}

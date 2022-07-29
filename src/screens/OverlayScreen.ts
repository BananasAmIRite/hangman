import Screen from '../Screen';

export default abstract class OverlayScreen extends Screen {
  private screen: Screen;
  public constructor(screen: Screen) {
    super();
    this.screen = screen;
  }
  onRender(ctx: CanvasRenderingContext2D): void {
    this.screen.render(ctx);
    this.renderOverlay(ctx);
  }

  abstract renderOverlay(ctx: CanvasRenderingContext2D): void;
}

import ScreenAttachment from '../ScreenAttachment';
import Vector2 from '../Vector2';

export default class Text extends ScreenAttachment {
  private text: string;
  private position: Vector2;
  private maxWidth: number;
  private maxHeight: number;
  private textAlign: CanvasTextAlign;

  public constructor(
    position: Vector2,
    maxHeight: number,
    maxWidth: number,
    original: string = '',
    textAlign: CanvasTextAlign = 'start' // ill clean these opts up one day
  ) {
    super();
    this.text = original;
    this.position = position;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.textAlign = textAlign;
  }

  onAttach(elem: HTMLCanvasElement) {}
  onRender(ctx: CanvasRenderingContext2D): void {
    ctx.textAlign = this.textAlign;

    ctx.font = this.findOptimalTextSize(ctx);

    ctx.fillStyle = 'black';

    ctx.fillText(this.text, this.position.x, this.position.y);
    ctx.textAlign = 'start';
  }
  onDetach(elem: HTMLCanvasElement): void {}

  public setText(text: string) {
    this.text = text;
  }

  private findOptimalTextSize(ctx: CanvasRenderingContext2D): string {
    const originalFont = ctx.font;
    if (this.text.length === 0) return originalFont;
    let size = 0;
    let lastMeasurement = 0;
    while (true) {
      ctx.font = `${size}px Arial`;
      const textWidth = ctx.measureText(this.text).width;

      if (lastMeasurement >= 0 && textWidth >= this.maxWidth) {
        ctx.font = originalFont;
        return `${size - lastMeasurement > this.maxHeight ? this.maxHeight : size - lastMeasurement}px Arial`;
      }

      lastMeasurement = Math.sign(this.maxWidth - textWidth);

      size += lastMeasurement;
    }
  }
}

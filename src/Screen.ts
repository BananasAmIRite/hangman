import ScreenAttachment from './ScreenAttachment';

export default abstract class Screen {
  private attachments: ScreenAttachment[];
  public constructor() {
    this.attachments = [];
  }

  public addAttachment(attachment: ScreenAttachment) {
    this.attachments.push(attachment);
  }

  public attach(elem: HTMLCanvasElement) {
    this.onAttach(elem);

    for (const a of this.attachments) {
      a.attach(elem);
    }
  }
  abstract onAttach(elem: HTMLCanvasElement): void;

  public render(ctx: CanvasRenderingContext2D): void {
    this.onRender(ctx);
    for (const a of this.attachments) {
      a.render(ctx);
    }
  }
  abstract onRender(ctx: CanvasRenderingContext2D): void;
  public detach(elem: HTMLCanvasElement) {
    this.onDetach(elem);
    for (const a of this.attachments) {
      a.detach(elem);
    }
  }
  abstract onDetach(elem: HTMLCanvasElement): void;
}

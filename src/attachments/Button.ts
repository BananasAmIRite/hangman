import ScreenAttachment from '../ScreenAttachment';
import Vector2 from '../Vector2';
import Text from './Text';

export default class Button extends ScreenAttachment {
  private text: Text;
  private color: string;
  private position: Vector2;
  private width: number;
  private height: number;
  private operation: () => void;

  private listenerBinding?: typeof this.onMouseClick;
  public constructor(
    text: string,
    position: Vector2,
    width: number,
    height: number,
    padding: number,
    color: string,
    op: () => void
  ) {
    super();
    this.text = new Text(
      { x: position.x + width / 2, y: position.y + height / 2 },
      height - padding * 2,
      (width / padding) * 2,
      text,
      'center'
    );
    this.color = color;
    this.position = position;
    this.width = width;
    this.height = height;
    this.operation = op;
  }

  onAttach(elem: HTMLCanvasElement): void {
    this.addAttachment(this.text);
    this.listenerBinding = this.onMouseClick.bind(this);

    elem.addEventListener('click', this.listenerBinding, false);
  }

  onMouseClick(evt: MouseEvent) {
    if (
      evt.offsetX >= this.position.x &&
      evt.offsetY >= this.position.y &&
      evt.offsetX <= this.position.x + this.width &&
      evt.offsetY <= this.position.y + this.height
    )
      this.operation();
  }

  onRender(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  onDetach(elem: HTMLCanvasElement): void {
    if (!this.listenerBinding) return;
    elem.removeEventListener('click', this.listenerBinding, false);
  }
}

/**
 * HTML-in-Canvas declarations used by these demos (not in lib.dom.d.ts yet).
 * https://wicg.github.io/html-in-canvas/
 */
interface CanvasRenderingContext2D {
  drawElementImage(element: Element, dx: number, dy: number): void;
}

interface HTMLCanvasElement {
  content: string;
  requestPaint(): void;
}

interface CanvasPaintEvent extends Event {
  readonly changedElements: readonly Element[];
}

interface HTMLElementEventMap {
  paint: CanvasPaintEvent;
}

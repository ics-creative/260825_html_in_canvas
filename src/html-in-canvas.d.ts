/**
 * HTML-in-Canvas is an experimental API and is not included in lib.dom.d.ts yet.
 * https://wicg.github.io/html-in-canvas/
 */
interface CanvasRenderingContext2D {
  drawElementImage(element: Element, dx: number, dy: number): DOMMatrix;
}

interface HTMLCanvasElement {
  requestPaint(): void;
}

interface CanvasPaintEvent extends Event {
  readonly changedElements: readonly Element[];
}

interface HTMLElementEventMap {
  paint: CanvasPaintEvent;
}

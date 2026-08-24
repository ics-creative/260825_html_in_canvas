import { renderCodeExcerpt } from "./shared";
import source from "./work.ts?raw";

const text = "The quick brown fox jumps over the lazy dog";

function getContext(canvasId: string) {
  const canvas = document.querySelector<HTMLCanvasElement>(`#${canvasId}`);
  const context = canvas?.getContext("2d");

  if (!context) {
    throw new Error(`Canvas 2D context is unavailable: #${canvasId}`);
  }

  context.fillStyle = "#404040";
  context.textBaseline = "alphabetic";

  return context;
}

async function drawTextExamples() {
  await document.fonts.load('40px "Noto Sans JP"');

  {
    const ctx = getContext("canvas-no-wrap");

    // #region simple
    ctx.font = '40px "Noto Sans JP"';
    ctx.fillText(text, 0, 50, 400);
    // #endregion
  }

  {
    const ctx = getContext("canvas-word-wrap");

    ctx.font = '40px "Noto Sans JP"';
    const segments = new Intl.Segmenter("en", { granularity: "word" }).segment(
      text,
    );
    const lineHeight = 42;
    let line = "";
    let y = 42;

    // #region wrap
    for (const { segment } of segments) {
      const nextLine = line + segment;

      if (ctx.measureText(nextLine).width > 400) {
        ctx.fillText(line.trimEnd(), 0, y);
        line = segment.trimStart();
        y += lineHeight;
      } else {
        line = nextLine;
      }
    }
    // #endregion

    if (line) {
      ctx.fillText(line.trimEnd(), 0, y);
    }
  }
}

// #region button
const buttonCanvas =
  document.querySelector<HTMLCanvasElement>("#canvas-ui-button")!;
const buttonContext = buttonCanvas.getContext("2d")!;
const buttonStatus = document.querySelector<HTMLElement>("#canvas-ui-status")!;
const buttonBounds = { x: 90, y: 60, width: 220, height: 80 };
let hovered = false;
let pointerIsDown = false;
let pointerIsInside = false;
let activePointerId: number | undefined;
let activeKey: "Enter" | " " | undefined;
let activationCount = 0;
let lastInputWasKeyboard = false;
let focusRingVisible = false;

const rootStyle = getComputedStyle(document.documentElement);
const buttonColors = {
  primary: rootStyle.getPropertyValue("--theme-primary").trim(),
  secondary: rootStyle.getPropertyValue("--theme-secondary").trim(),
  active: rootStyle.getPropertyValue("--content-bg-dark").trim(),
  white: rootStyle.getPropertyValue("--white").trim(),
};

function isPointInButton(event: PointerEvent) {
  const canvasBounds = buttonCanvas.getBoundingClientRect();
  const x =
    ((event.clientX - canvasBounds.left) * buttonCanvas.width) /
    canvasBounds.width;
  const y =
    ((event.clientY - canvasBounds.top) * buttonCanvas.height) /
    canvasBounds.height;
  return (
    x >= buttonBounds.x &&
    x <= buttonBounds.x + buttonBounds.width &&
    y >= buttonBounds.y &&
    y <= buttonBounds.y + buttonBounds.height
  );
}

function drawCanvasButton() {
  const pressed = activeKey !== undefined || (pointerIsDown && pointerIsInside);
  const scale = pressed ? 0.94 : 1;
  const centerX = buttonBounds.x + buttonBounds.width / 2;
  const centerY = buttonBounds.y + buttonBounds.height / 2;

  buttonContext.clearRect(0, 0, buttonCanvas.width, buttonCanvas.height);
  buttonContext.save();

  if (focusRingVisible) {
    buttonContext.strokeStyle = buttonColors.secondary;
    buttonContext.lineWidth = 4;
    buttonContext.beginPath();
    buttonContext.roundRect(
      buttonBounds.x - 8,
      buttonBounds.y - 8,
      buttonBounds.width + 16,
      buttonBounds.height + 16,
      15,
    );
    buttonContext.stroke();
  }

  buttonContext.translate(centerX, centerY);
  buttonContext.scale(scale, scale);
  buttonContext.translate(-centerX, -centerY);
  buttonContext.fillStyle = pressed
    ? buttonColors.active
    : hovered
      ? buttonColors.secondary
      : buttonColors.primary;
  buttonContext.beginPath();
  buttonContext.roundRect(
    buttonBounds.x,
    buttonBounds.y,
    buttonBounds.width,
    buttonBounds.height,
    10,
  );
  buttonContext.fill();

  buttonContext.fillStyle = buttonColors.white;
  buttonContext.font = '700 32px "Noto Sans JP"';
  buttonContext.textAlign = "center";
  buttonContext.textBaseline = "middle";
  buttonContext.fillText("Click Me!", centerX, centerY - 2);
  buttonContext.restore();
}

function activateCanvasButton() {
  activationCount += 1;
  buttonStatus.textContent = `Click Me! が押されました（${activationCount}回目）`;
}

buttonCanvas.addEventListener("pointermove", (event) => {
  const isInside = isPointInButton(event);
  hovered = isInside;
  pointerIsInside = isInside;
  buttonCanvas.style.cursor = isInside ? "pointer" : "default";
  drawCanvasButton();
});

buttonCanvas.addEventListener("pointerleave", () => {
  hovered = false;
  pointerIsInside = false;
  buttonCanvas.style.cursor = "default";
  drawCanvasButton();
});

buttonCanvas.addEventListener("pointerdown", (event) => {
  if (
    (event.pointerType === "mouse" && event.button !== 0) ||
    !isPointInButton(event)
  )
    return;

  event.preventDefault();
  pointerIsDown = true;
  pointerIsInside = true;
  hovered = true;
  focusRingVisible = false;
  activePointerId = event.pointerId;
  buttonCanvas.setPointerCapture(event.pointerId);
  buttonCanvas.focus({ preventScroll: true });
  drawCanvasButton();
});

buttonCanvas.addEventListener("pointerup", (event) => {
  if (!pointerIsDown || event.pointerId !== activePointerId) return;

  const shouldActivate = isPointInButton(event);
  pointerIsDown = false;
  pointerIsInside = shouldActivate;
  hovered = shouldActivate;
  activePointerId = undefined;
  buttonCanvas.releasePointerCapture(event.pointerId);
  drawCanvasButton();
  if (shouldActivate) activateCanvasButton();
});

function cancelPointerPress() {
  pointerIsDown = false;
  pointerIsInside = false;
  activePointerId = undefined;
  drawCanvasButton();
}

buttonCanvas.addEventListener("pointercancel", cancelPointerPress);
buttonCanvas.addEventListener("lostpointercapture", () => {
  if (pointerIsDown) cancelPointerPress();
});

buttonCanvas.addEventListener("keydown", (event) => {
  if (
    (event.key !== "Enter" && event.key !== " ") ||
    event.repeat ||
    activeKey !== undefined
  )
    return;

  event.preventDefault();
  focusRingVisible = true;
  activeKey = event.key;
  drawCanvasButton();
});

buttonCanvas.addEventListener("keyup", (event) => {
  if (event.key !== activeKey) return;

  event.preventDefault();
  activeKey = undefined;
  drawCanvasButton();
  activateCanvasButton();
});

window.addEventListener(
  "keydown",
  () => {
    lastInputWasKeyboard = true;
  },
  { capture: true },
);
window.addEventListener(
  "pointerdown",
  () => {
    lastInputWasKeyboard = false;
  },
  { capture: true },
);

buttonCanvas.addEventListener("focus", () => {
  focusRingVisible = lastInputWasKeyboard;
  drawCanvasButton();
});
buttonCanvas.addEventListener("blur", () => {
  activeKey = undefined;
  focusRingVisible = false;
  cancelPointerPress();
});
buttonCanvas.addEventListener("click", (event) => {
  if (event.detail === 0 && activeKey === undefined) activateCanvasButton();
});

async function initializeCanvasButton() {
  await document.fonts.load('700 32px "Noto Sans JP"');
  drawCanvasButton();
}

void initializeCanvasButton();
// #endregion

void drawTextExamples();
void renderCodeExcerpt(source, "#simple-code", "simple");
void renderCodeExcerpt(source, "#wrap-code", "wrap");
void renderCodeExcerpt(source, "#canvas-ui-code", "button");

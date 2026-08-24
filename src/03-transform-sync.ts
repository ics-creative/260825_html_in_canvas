import {
  attachClickAlert,
  isApiAvailable,
  renderCodeExcerpt,
  showApiNotice,
  startClock,
} from "./shared";
import source from "./03-transform-sync.ts?raw";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const domView = document.querySelector<HTMLElement>("#dom-view")!;
const content = document.querySelector<HTMLElement>("#content")!;
const clock = document.querySelector<HTMLElement>("#clock")!;
const sampleUi = document.querySelector<HTMLElement>(".sample-form")!;
const moveButton = document.querySelector<HTMLButtonElement>("#move-btn")!;
const xSlider = document.querySelector<HTMLInputElement>("#x-slider")!;
const scaleSlider = document.querySelector<HTMLInputElement>("#scale-slider")!;
const angleSlider = document.querySelector<HTMLInputElement>("#angle-slider")!;
const xValue = document.querySelector<HTMLOutputElement>("#x-value")!;
const scaleValue = document.querySelector<HTMLOutputElement>("#scale-value")!;
const angleValue = document.querySelector<HTMLOutputElement>("#angle-value")!;
const ctx = canvas.getContext("2d")!;

startClock(clock);
attachClickAlert(sampleUi);
showApiNotice();

const apiAvailable = isApiAvailable();

// 記事の説明を補助するため、HTMLをCanvasの内外へ移動できるようにする
moveButton.addEventListener("click", () => {
  const movingIntoCanvas = content.parentElement !== canvas;
  (movingIntoCanvas ? canvas : domView).append(content);
  domView.classList.toggle("is-empty", movingIntoCanvas);
  moveButton.textContent = movingIntoCanvas
    ? "▲ Canvasから出す"
    : "▼ Canvasに入れる";
  for (const slider of [xSlider, scaleSlider, angleSlider]) {
    slider.disabled = !movingIntoCanvas;
  }

  ctx.reset();
  if (movingIntoCanvas && apiAvailable) canvas.requestPaint();
});

if (apiAvailable) {
  // #region excerpt
  canvas.addEventListener("paint", () => {
    ctx.reset();
    if (content.parentElement !== canvas) return;

    const centerX = content.offsetWidth / 2;
    const centerY = content.offsetHeight / 2;
    ctx.translate(Number(xSlider.value) + centerX, 36 + centerY);
    ctx.rotate((Number(angleSlider.value) * Math.PI) / 180);
    const scale = Number(scaleSlider.value);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);

    // 描画に使った変換行列をHTML側にも設定し、見た目と操作位置を一致させる
    const transform = ctx.drawElementImage(content, 0, 0);
    content.style.transform = transform.toString();
  });

  for (const slider of [xSlider, scaleSlider, angleSlider]) {
    slider.addEventListener("input", () => canvas.requestPaint());
  }

  canvas.requestPaint();
  // #endregion
}

const updateValues = () => {
  xValue.textContent = `${xSlider.value}px`;
  scaleValue.textContent = `${Number(scaleSlider.value).toFixed(2)}倍`;
  angleValue.textContent = `${angleSlider.value}°`;
};

updateValues();
for (const slider of [xSlider, scaleSlider, angleSlider]) {
  slider.addEventListener("input", updateValues);
}

void renderCodeExcerpt(source);

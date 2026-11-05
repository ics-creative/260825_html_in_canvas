import {
  attachClickAlert,
  isApiAvailable,
  renderCodeExcerpt,
  showApiNotice,
  startClock,
} from "./shared";
import source from "./03-transform-sync.ts?raw";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const content = document.querySelector<HTMLElement>("#content")!;
const clock = document.querySelector<HTMLElement>("#clock")!;
const sampleUi = document.querySelector<HTMLElement>(".sample-form")!;
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

if (isApiAvailable()) {
  // #region excerpt
  canvas.addEventListener("paint", () => {
    ctx.reset();

    const centerX = content.offsetWidth / 2;
    const centerY = content.offsetHeight / 2;
    ctx.translate(Number(xSlider.value) + centerX, 36 + centerY);
    ctx.rotate((Number(angleSlider.value) * Math.PI) / 180);
    const scale = Number(scaleSlider.value);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);

    // 描画時の変換がDOMの操作位置にも自動で反映される
    ctx.drawElementImage(content, 0, 0);
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

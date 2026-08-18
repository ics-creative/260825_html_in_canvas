import {
  attachClickAlert,
  isApiAvailable,
  renderCodeExcerpt,
  showApiNotice,
  startClock,
} from './shared';
import source from './02-paint-event.ts?raw';

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
const domView = document.querySelector<HTMLElement>('#dom-view')!;
const content = document.querySelector<HTMLElement>('#content')!;
const clock = document.querySelector<HTMLElement>('#clock')!;
const sampleUi = document.querySelector<HTMLElement>('.sample-form')!;
const moveButton = document.querySelector<HTMLButtonElement>('#move-btn')!;
const ctx = canvas.getContext('2d')!;

startClock(clock);
attachClickAlert(sampleUi);
showApiNotice();

const apiAvailable = isApiAvailable();

// 記事の説明を補助するため、HTMLをCanvasの内外へ移動できるようにする
moveButton.addEventListener('click', () => {
  const movingIntoCanvas = content.parentElement !== canvas;
  (movingIntoCanvas ? canvas : domView).append(content);
  domView.classList.toggle('is-empty', movingIntoCanvas);
  moveButton.textContent = movingIntoCanvas ? '▲ Canvasから出す' : '▼ Canvasに入れる';

  ctx.reset();
  if (movingIntoCanvas && apiAvailable) canvas.requestPaint();
});

if (apiAvailable) {
  // #region excerpt
  canvas.addEventListener('paint', () => {
    ctx.reset();
    if (content.parentElement !== canvas) return;

    // HTMLの描画内容が変わるたびに、現在の状態を描き直す
    ctx.drawElementImage(content, 0, 0);
  });

  canvas.requestPaint();
  // #endregion
}

void renderCodeExcerpt(source);

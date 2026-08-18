import {
  attachClickAlert,
  isApiAvailable,
  renderCodeExcerpt,
  showApiNotice,
  startClock,
} from './shared';
import source from './01-oneshot.ts?raw';

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
const domView = document.querySelector<HTMLElement>('#dom-view')!;
const content = document.querySelector<HTMLElement>('#content')!;
const clock = document.querySelector<HTMLElement>('#clock')!;
const sampleUi = document.querySelector<HTMLElement>('.sample-form')!;
const moveButton = document.querySelector<HTMLButtonElement>('#move-btn')!;
const drawButton = document.querySelector<HTMLButtonElement>('#draw-btn')!;
const status = document.querySelector<HTMLElement>('#status')!;
const ctx = canvas.getContext('2d')!;

startClock(clock);
attachClickAlert(sampleUi);
showApiNotice();

moveButton.addEventListener('click', () => {
  const movingIntoCanvas = content.parentElement !== canvas;
  (movingIntoCanvas ? canvas : domView).append(content);
  domView.classList.toggle('is-empty', movingIntoCanvas);
  moveButton.textContent = movingIntoCanvas ? '▲ Canvasから出す' : '▼ Canvasに入れる';
  status.textContent = '';
});

if (!isApiAvailable()) {
  drawButton.disabled = true;
} else {
  // #region excerpt
  drawButton.addEventListener('click', () => {
    ctx.reset();
    status.textContent = '';
    try {
      // クリックした瞬間のHTMLをCanvasへ描画する
      ctx.drawElementImage(content, 0, 0);
    } catch (error) {
      status.textContent = `描画できませんでした：${String(error)}`;
    }
  });
  // #endregion
}

const loupe = document.querySelector<HTMLCanvasElement>('#loupe')!;
const loupeContext = loupe.getContext('2d')!;
const zoom = 8;
const sourceSize = loupe.width / zoom;

canvas.addEventListener('pointermove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  loupeContext.imageSmoothingEnabled = false;
  loupeContext.clearRect(0, 0, loupe.width, loupe.height);
  loupeContext.drawImage(
    canvas,
    x - sourceSize / 2,
    y - sourceSize / 2,
    sourceSize,
    sourceSize,
    0,
    0,
    loupe.width,
    loupe.height,
  );

  loupe.hidden = false;
  loupe.style.left = `${event.clientX - rect.left + 24}px`;
  loupe.style.top = `${event.clientY - rect.top - loupe.height / 2}px`;
});

canvas.addEventListener('pointerleave', () => {
  loupe.hidden = true;
});

void renderCodeExcerpt(source);

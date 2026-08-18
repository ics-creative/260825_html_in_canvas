import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

export function isApiAvailable(): boolean {
  const ctx = document.createElement('canvas').getContext('2d')!;
  return 'drawElementImage' in ctx;
}

export function showApiNotice(): void {
  if (isApiAvailable()) return;

  const notice = document.createElement('aside');
  notice.className = 'api-notice';
  notice.innerHTML =
    '<strong>このブラウザーではAPIを利用できません。</strong>' +
    '<span>対応するChrome系ブラウザーでお試しください。</span>';
  document.querySelector('.demo-header')?.after(notice);
}

export function startClock(clock: HTMLElement): void {
  const update = () => {
    clock.textContent = new Date().toLocaleTimeString('ja-JP');
  };
  update();
  window.setInterval(update, 1000);
}

export function attachClickAlert(container: HTMLElement): void {
  const button = container.querySelector<HTMLButtonElement>('button')!;
  button.addEventListener('click', () => {
    window.alert('クリックされました');
  });
}

export async function renderCodeExcerpt(source: string): Promise<void> {
  const target = document.querySelector<HTMLElement>('#code');
  if (!target) return;

  const lines = source.split('\n');
  const start = lines.findIndex((line) => line.includes('#region excerpt'));
  const end = lines.findIndex((line) => line.includes('#endregion'));
  const excerpt = lines
    .slice(start + 1, end)
    .join('\n')
    .trim();

  target.innerHTML = (await getHighlighter()).codeToHtml(excerpt, {
    lang: 'typescript',
    theme: 'github-light',
  });
}

let highlighter: Promise<HighlighterCore> | undefined;

function getHighlighter(): Promise<HighlighterCore> {
  highlighter ??= createHighlighterCore({
    themes: [import('@shikijs/themes/github-light')],
    langs: [import('@shikijs/langs/typescript')],
    engine: createJavaScriptRegexEngine(),
  });
  return highlighter;
}

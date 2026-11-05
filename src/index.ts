import { isApiAvailable } from "./shared";

const support = document.querySelector<HTMLElement>("#support")!;

if (isApiAvailable()) {
  support.textContent = "このブラウザーではHTML-in-Canvas APIが有効です。";
  support.classList.add("is-supported");
} else {
  support.textContent =
    "このブラウザーではAPIを利用できません。対応するChrome系ブラウザーでお試しください。";
  support.classList.add("is-unsupported");
}

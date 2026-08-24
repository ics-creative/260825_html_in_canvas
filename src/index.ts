const support = document.querySelector<HTMLElement>("#support")!;
const ctx = document.createElement("canvas").getContext("2d")!;

if ("drawElementImage" in ctx) {
  support.textContent = "このブラウザーではHTML-in-Canvas APIが有効です。";
  support.classList.add("is-supported");
} else {
  support.textContent =
    "このブラウザーではAPIを利用できません。対応するChrome系ブラウザーでお試しください。";
  support.classList.add("is-unsupported");
}

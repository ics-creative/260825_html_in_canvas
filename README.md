# HTML-in-Canvas demos

ICS MEDIAの記事[『新API「HTML-in-Canvas」紹介 - CanvasにHTMLを描くAPIは何を解決するのか？』](https://ics.media/entry/260825/)で使用するデモプロジェクトです。

## デモ

[デモページを表示](https://ics-creative.github.io/260825_html_in_canvas/)

## 実行方法

```sh
npm install
npm run dev
```

このデモは`content="drawable"`、描画対象の`drawable`属性、2Dでの操作位置の自動同期に対応したHTML-in-Canvas APIを使用しています。旧`layoutsubtree` APIのみを提供するブラウザーは対象外です。対応するChrome系ブラウザーで実行してください。

Demo 01は記録済みの最新スナップショットをボタン操作で転写し、Demo 02は`paint`イベントで継続的に再描画します。Demo 03ではCanvas側で変形しても操作位置が自動同期されることを確認できます。Demo 01でも入力やクリックはできますが、見た目の更新には再描画が必要です。

各デモには公開先用のOrigin Trialトークンを設定しています。トークン内の有効期限は2027年3月2日（UTC）です。トークンだけで旧APIが新APIになるわけではありません。更新時は`index.html`と3つのデモHTMLの`origin-trial`メタタグを揃えてください。

APIの詳細は[WICGの提案](https://wicg.github.io/html-in-canvas/)と[Chromeの移行ガイド](https://developer.chrome.com/blog/html-in-canvas-ot-changes)を参照してください。

## コマンド

```sh
npm run dev          # 開発サーバーを起動
npm run build        # 型チェックと本番ビルド
npm run format       # oxfmtでコードを整形
npm run format:check # 整形状態を確認
```

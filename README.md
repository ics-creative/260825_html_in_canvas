# HTML-in-Canvas demos

ICS MEDIAの記事[『新API「HTML-in-Canvas」紹介 - CanvasにHTMLを描くAPIは何を解決するのか？』](https://ics.media/entry/260825/)で使用するデモプロジェクトです。

## デモ

[デモページを表示](https://ics-creative.github.io/260825_html_in_canvas/)

## 実行方法

```sh
npm install
npm run dev
```

HTML-in-Canvasは提案段階のAPIです。公開デモのデプロイ先はOrigin Trialへ登録する前提です。ローカル環境や独自のデプロイ先で試す場合は、対応するChrome系ブラウザーで`chrome://flags/#canvas-draw-element`を有効にするか、そのオリジンをOrigin Trialへ登録してください。

公開デモのOrigin Trialトークンは2026年10月20日まで有効です。Trialが延長された場合は、各HTMLの`origin-trial`メタタグを新しいトークンへ差し替えてください。

## コマンド

```sh
npm run dev          # 開発サーバーを起動
npm run build        # 型チェックと本番ビルド
npm run format       # oxfmtでコードを整形
npm run format:check # 整形状態を確認
```

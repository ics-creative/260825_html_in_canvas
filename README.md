# HTML-in-Canvas demos

ICS MEDIAの記事「HTML-in-Canvasの現在地 ー canvasにHTMLを描くAPIは何を解決するのか？」で使用するデモプロジェクトです。

## デモ

1. `drawElementImage()`でHTMLを一度だけCanvasへ描画する
2. `paint`イベントでHTMLの変化を自動的に再描画する
3. 戻り値の変換行列を使い、Canvasの描画位置とDOMの操作位置を一致させる

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

仕様提案: [WICG/html-in-canvas](https://wicg.github.io/html-in-canvas/)

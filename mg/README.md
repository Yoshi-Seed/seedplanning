# MG Website (HTML scaffold)

このフォルダは「デザイン指示書_重症筋無力症.pptx」を元に、**箱（レイアウト）と色・余白**を再現する目的で作った静的HTMLです。
テキストは後から差し替えられるよう、各ページはできるだけ素直な構造にしています。

## ファイル構成
- `index.html`：HOME
- `diagnosis.html`：診断までの道のり
- `daily.html`：日常生活での困難
- `medical.html`：医療との関わり方
- `message.html`：伝えたいメッセージ
- `resources.html`：相談先・参考情報
- `styles.css`：全ページ共通CSS
- `scripts.js`：軽いUI（HOMEの切替、続きを読むの展開）

## 画像について
- 画像は **HTMLと同じ階層（ルート）** に置く前提で `src="..."` を張っています。
- `flower and bird.png` はファイル名にスペースが入っているので、HTML側は安全のため `%20` にエンコードして参照しています。

## テキスト差し替えの場所
- 各ページの `<p>` や `<li>` を、そのまま上書きで差し替えできます。
- HOMEの右側詳細は、`index.html` 内に4つのパネルとして実装しています（JSは表示切替のみ）。

## フォント（任意）
- 指定フォント（ヒカリ角ゴ / Glow Sans）を**自己ホスト**する場合は、`styles.css` 冒頭の `@font-face` を有効化し、
  `./fonts/` に `woff2` を置いてください。

## GitHub Pages
- そのままリポジトリ直下に配置して GitHub Pages で公開できます。


# Seed Planning Global Website (GitHub-ready)

この zip は、そのまま GitHub にアップロードしやすい静的サイト構成です。

## 主なファイル
- `index.html` トップページ
- `how-we-work.html`
- `japan-fact-sheets.html`
- `about-team.html`
- `rare-disease.html`
- `contact.html`
- `fact-sheet.html` 1つの共通詳細ページ（URL の `?slug=` で内容が切り替わります）
- `assets/css/styles.css` デザイン全体のスタイル
- `assets/js/data.js` テキスト・カード一覧・PDFリンク・チーム情報などの管理用データ
- `assets/js/main.js` 画面の動き、フィルター、カルーセル、フォーム制御
- `assets/docs/` ダウンロード用PDF

## GitHub へのアップロード方法
1. zip を展開
2. 中のファイルを GitHub リポジトリのルートにアップロード
3. GitHub Pages を `Deploy from a branch` / `root` で公開

## いちばん編集しやすい場所
### 文言やカード内容を変えたい
`assets/js/data.js`

### 色や余白や見た目を変えたい
`assets/css/styles.css`

## フォーム送信について
このサイトは GitHub Pages でも動くように、`assets/js/data.js` の `formEndpoint` が空の場合は、
**メールアプリを開く fallback** で送れるようにしてあります。

本番でフォームサービスを使うなら、`assets/js/data.js` の `siteConfig.formEndpoint` に
Formspree などの endpoint を入れてください。

## 追加メモ
- 画像とPDFはすべて相対パスなので、ルート構成を変えなければそのまま動きます。
- 共通ヘッダー / フッター、Fact Sheets一覧、カルーセル、詳細ページの内容はJSで共通管理しています。

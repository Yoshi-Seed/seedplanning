# テストマトリクス（Codex-D / 統合）

最終更新日: 2026-02-26
対象ブランチ: 現在の作業ブランチ

## 前提
- 本リポジトリは静的Web構成（HTML/CSS/JS）で、ビルド工程はありません。
- そのため、最低限の品質担保として以下を実施します。
  - JavaScript構文チェック（Node.js）
  - 主要ファイル存在確認
  - 回帰観点の簡易点検（ファイル単位）

## テストケース一覧

| ID | 種別 | 観点 | 実行コマンド | 期待結果 | 実結果 | 判定 |
|---|---|---|---|---|---|---|
| UT-01 | 単体相当 | `app.js` 構文妥当性 | `node --check app.js` | エラーなし | エラーなし | PASS |
| UT-02 | 単体相当 | `data.js` 構文妥当性 | `node --check data.js` | エラーなし | エラーなし | PASS |
| UT-03 | 単体相当 | `people/app.js` 構文妥当性 | `node --check people/app.js` | エラーなし | エラーなし | PASS |
| UT-04 | 単体相当 | `people/form.js` 構文妥当性 | `node --check people/form.js` | エラーなし | エラーなし | PASS |
| UT-05 | 単体相当 | `people/profile.js` 構文妥当性 | `node --check people/profile.js` | エラーなし | エラーなし | PASS |
| IT-01 | 結合相当 | 主要画面ファイルの存在 | `test -f index.html && test -f styles.css && test -f app.js` | 0終了 | 0終了 | PASS |
| IT-02 | 結合相当 | people画面ファイルの存在 | `test -f people/index.html && test -f people/form.html && test -f people/profile.html` | 0終了 | 0終了 | PASS |
| ENV-01 | 環境確認 | 外部Web検索の可用性 | Python urllib による検索ページ取得 | 取得できる | プロキシ制限で403 | WARN |

## 異常系の確認
- ENV-01として、外部情報取得失敗（403）を確認。
- 本件はアプリケーション不具合ではなく実行環境のネットワーク制約として記録。

## 回帰テスト観点（チェックリスト）
- [x] 既存のルートページ資産（`index.html`,`styles.css`,`app.js`）が残存
- [x] people配下の導線ページ（一覧/入力/詳細）が残存
- [x] 既存のJSファイルが構文エラーなく読み込める状態

## 残課題
- 画面操作に基づくE2E自動テスト（Playwright等）は未整備。
- 仕様書（`docs/spec/*`）未整備のため、契約ベースの厳密な統合判定は次工程で必要。

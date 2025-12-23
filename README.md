# 受注経路セレクター（静的HTML）

End Client → 一次エージェンシー →（二次 or 直）→ シード・プランニング  
を、クリックだけで段階的に選べるUIです。**ビルド不要**でそのまま動きます。

## 使い方（ローカル）
- `index.html` をダブルクリックで開く（基本これでOK）
- もしブラウザの制限でうまく表示されない場合は、簡易サーバーで開く：
  - Python: `python -m http.server 8000`
  - その後 `http://localhost:8000` を開く

## GitHub Pagesで公開する
このフォルダをそのままGitHubリポジトリに置いて、Pagesを有効化すればOKです。

## データ編集
`data.js` の `RELATIONSHIP_DATA` を編集してください。

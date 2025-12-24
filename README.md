# 受注エコシステム（複数End + 分岐ルート）

## できること
- End Client を複数表示して「ズームアウト → End選択」から開始
- Endをクリックすると、そのEndに紐づく一次が“ふわっ”と強調表示
- 一次をクリックすると、次が展開：
  - 直→SEED
  - 二次→SEED
  - Seed外で終了（終点ノード）
- 分岐（例：HRW 直→SEED / HRW→Holden→SEED）は同一一次から2本の矢印として表現し、
  一次クリック後に「SEED（直）をクリック」or「二次をクリック」で経路確定します。

## データ編集
- `data.js` の `nodes / edges / descriptions` を編集してください。
  - Endを増やす：type:`end` ノード追加 + End→一次の edge 追加
  - 分岐を増やす：一次→SEED edge と 一次→二次 edge を両方追加
  - Seed外終了：一次→end_only edge を追加

## 注意
- 会社名の表記ゆれは `label` を統一すると見やすいです。

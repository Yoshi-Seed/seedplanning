# Seed Planning Medical Panel - デザイン仕様書

## 📋 概要
HCP（Healthcare Professional）向けパネル管理システムのWebデザイン仕様書

---

## 🎨 カラーパレット

### プライマリカラー
```css
/* メインブルー（サイドバー背景） */
#3d5a73

/* ダークブルー（テキスト、ポイント表示） */
#2c5282

/* アクセントグリーン（アクションボタン） */
#5a8b7e

/* ホバーグリーン（ボタンホバー状態） */
#4a7568
```

### セカンダリカラー
```css
/* 背景グレー */
#f5f5f5

/* ライトグレー（入力フィールド背景） */
#f8f9fa

/* ボーダーグレー */
#ddd

/* テキストグレー（ラベル） */
#666

/* テキストダークグレー */
#333

/* エラーレッド（マイナスポイント） */
#d9534f

/* 成功グリーン（プラスポイント - 履歴表示用） */
#5a8b7e
```

### 透明度
```css
/* サイドバーホバー */
rgba(255, 255, 255, 0.1)

/* ボーダー（サイドバーメニュー） */
rgba(255, 255, 255, 0.1)

/* シャドウ */
rgba(0, 0, 0, 0.1)    /* ヘッダー、カード */
rgba(0, 0, 0, 0.05)   /* コンテンツカード */
```

---

## 📐 レイアウト構造

### 全体構成
```
┌─────────────────────────────────────────┐
│ Header (Logo + Logout)                  │ 固定ヘッダー
├──────────┬──────────────────────────────┤
│          │                              │
│ Sidebar  │  Main Content                │ フレックスレイアウト
│ (260px)  │  (残りの幅)                   │
│          │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

### グリッドシステム
- **ヘッダー高さ**: 78px
- **サイドバー幅**: 260px（固定）
- **メインコンテンツパディング**: 40px
- **カード間マージン**: 30px

---

## 🖼️ コンポーネント仕様

### 1. ログインページ（index.html）

#### レイアウト
- **配置**: 画面中央（Flexbox center）
- **コンテナ幅**: 最大420px
- **背景**: #f5f5f5
- **カード背景**: #ffffff
- **カードパディング**: 40px
- **カードボーダー半径**: 8px
- **シャドウ**: 0 2px 10px rgba(0, 0, 0, 0.1)

#### ロゴセクション
```css
.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
}

.logo-video {
  width: 162px;
  height: 162px;
  object-fit: contain;
}
```

**ロゴテキスト**
- 英語: 18px, #666, font-weight: 500
- 日本語: 16px, #2c5282, font-weight: 600

#### フォームフィールド
```css
input[type="email"],
input[type="password"] {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

/* フォーカス状態 */
input:focus {
  border-color: #4a7ba7;
  outline: none;
}
```

#### ログインボタン
```css
.login-button {
  background-color: #2c5282;
  color: white;
  padding: 14px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
}

.login-button:hover {
  background-color: #1e3a5f;
}
```

#### パスワード忘れリンク
```css
.forgot-password a {
  color: #4a7ba7;
  font-size: 14px;
  text-decoration: none;
}

.forgot-password a:hover {
  color: #2c5282;
  text-decoration: underline;
}
```

---

### 2. ダッシュボードページ（dashboard.html）

#### ヘッダー
```css
.header {
  background-color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

**ロゴ（ヘッダー用）**
- サイズ: 48px × 48px（ログインページより小さい）
- 英語テキスト: 12px
- 日本語テキスト: 16px

**ログアウトリンク**
- 色: #666
- ホバー: #2c5282
- フォントサイズ: 14px

---

#### サイドバー
```css
.sidebar {
  width: 260px;
  background-color: #3d5a73;
  color: white;
}
```

**メニュー項目**
```css
.sidebar-menu a {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 25px;
  color: white;
  font-size: 16px;
}

.sidebar-menu a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
```

**アイコン**
- サイズ: 24px × 24px
- 色: 白（`filter: brightness(0) invert(1);`）
- 絵文字アイコン使用

**ボーダー**
- 各メニュー項目間: `border-bottom: 1px solid rgba(255, 255, 255, 0.1)`

---

#### メインコンテンツエリア
```css
.main-content {
  flex: 1;
  padding: 40px;
  background-color: #f5f5f5;
}
```

**ユーザー情報表示**
```css
.user-info {
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
}
```
フォーマット: 「山田太郎　先生」

---

#### ポイントセクション
```css
.points-section {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
```

**ポイント表示カード**
```css
.points-display {
  background-color: #f8f9fa;
  padding: 20px 30px;
  border-radius: 6px;
  display: inline-block;
}

.points-value {
  font-size: 36px;
  font-weight: 600;
  color: #2c5282;
}

.points-unit {
  font-size: 24px;
  color: #666;
}
```

**ポイント交換ボタン**
```css
.points-exchange-btn {
  background-color: #5a8b7e;
  color: white;
  padding: 14px 30px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
}

.points-exchange-btn:hover {
  background-color: #4a7568;
}
```

---

#### 履歴セクション
```css
.history-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #f0f0f0;
}
```

**履歴項目の構成**
- 日付: 14px, #666
- 説明: 16px, #333, flex: 1
- ポイント: 24px, font-weight: 600

**ポイント表示色**
- プラス: #5a8b7e
- マイナス: #d9534f

---

#### お知らせセクション
```css
.notifications-section {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.notification-list li::before {
  content: "・";
  color: #5a8b7e;
}
```

---

## 📱 レスポンシブデザイン

### ブレイクポイント

#### モバイル（768px以下）
```css
@media (max-width: 768px) {
  /* レイアウト変更 */
  .container {
    flex-direction: column;  /* サイドバーが上に */
  }
  
  .sidebar {
    width: 100%;  /* 全幅 */
  }
  
  .main-content {
    padding: 20px;  /* パディング削減 */
  }
  
  /* ポイントセクション */
  .points-header {
    flex-direction: column;
    gap: 20px;
  }
  
  /* 履歴項目 */
  .history-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
```

#### 小型モバイル（480px以下）
```css
@media (max-width: 480px) {
  /* ログインページ */
  .login-container {
    padding: 30px 20px;
  }
  
  .logo-video {
    width: 135px;
    height: 135px;
  }
  
  .logo-text-en {
    font-size: 16px;
  }
  
  .logo-text-ja {
    font-size: 14px;
  }
}
```

#### 極小モバイル（360px以下）
```css
@media (max-width: 360px) {
  .login-container {
    padding: 25px 15px;
  }
  
  .logo-video {
    width: 121px;
    height: 121px;
  }
  
  .logo-text-en {
    font-size: 15px;
  }
  
  .logo-text-ja {
    font-size: 12px;
  }
}
```

---

## 🎬 アニメーション・トランジション

### ホバーエフェクト
```css
/* すべてのインタラクティブ要素 */
transition: 0.3s;

/* 適用先 */
- ボタン: background-color 0.3s
- リンク: color 0.3s
- 入力フィールド: border-color 0.3s
- サイドバーメニュー: background-color 0.3s
```

### 動画ロゴ設定
```html
<video 
  autoplay      /* 自動再生 */
  loop          /* ループ再生 */
  muted         /* ミュート */
  playsinline   /* iOS対応 */
  poster="Entry_HCP_Panel_poster.png"  /* フォールバック画像 */
>
  <source src="Entry_HCP_Panel_web.mp4" type="video/mp4">
</video>
```

---

## 📝 タイポグラフィ

### フォントファミリー
```css
font-family: -apple-system, BlinkMacSystemFont, 
  "Segoe UI", "Helvetica Neue", Arial, 
  "Hiragino Kaku Gothic ProN", "Hiragino Sans", 
  Meiryo, sans-serif;
```

### フォントサイズスケール
| 用途 | サイズ | 太さ | 色 |
|------|--------|------|-----|
| ポイント値 | 36px | 600 | #2c5282 |
| ポイント単位 | 24px | normal | #666 |
| 履歴ポイント | 24px | 600 | #5a8b7e / #d9534f |
| セクションタイトル | 20px | 600 | #333 |
| ユーザー情報 | 18px | normal | #333 |
| ロゴ英語テキスト | 18px / 12px* | 500 | #666 |
| ロゴ日本語テキスト | 16px / 16px* | 600 | #2c5282 |
| ボタンテキスト | 16px | 600 | white |
| サイドバーメニュー | 16px | normal | white |
| 履歴説明 | 16px | normal | #333 |
| フォームラベル | 14px | 500 | #333 |
| 入力フィールド | 14px | normal | inherit |
| リンク | 14px | normal | #4a7ba7 |
| 履歴日付 | 14px | normal | #666 |
| お知らせ項目 | 15px | normal | #333 |

*ログインページ / ダッシュボードページ

---

## 🎯 スペーシング

### 基本単位: 10px

| 要素 | 値 |
|------|-----|
| カードパディング | 30px / 40px |
| セクション間マージン | 30px |
| フォームグループ間ギャップ | 20px |
| ロゴとテキストのギャップ | 12px |
| サイドバーアイコンギャップ | 15px |
| ページパディング | 40px (PC) / 20px (mobile) |

### ボーダー半径
| 要素 | 値 |
|------|-----|
| カード | 8px |
| ポイント表示 | 6px |
| ボタン | 4px / 6px |
| 入力フィールド | 4px |

---

## 🔍 シャドウ

```css
/* ヘッダー */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

/* ログインカード */
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

/* コンテンツカード */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
```

---

## 🎨 デザイン原則

### 1. カラーの使い方
- **ブルー系**: 信頼感、医療関連を表現
- **グリーン**: アクション、プラス要素（ポイント加算、交換ボタン）
- **レッド**: マイナス要素（ポイント減算）
- **グレー**: 中立的な情報、補助テキスト

### 2. ホワイトスペース
- 十分な余白で読みやすさを確保
- カード間は30px、セクション内は20pxを基本

### 3. 視覚階層
1. ポイント値（36px、太字、色付き）
2. セクションタイトル（20px、太字）
3. 本文テキスト（14-16px）
4. 補助テキスト（14px、グレー）

### 4. インタラクション
- すべてのクリック可能要素にホバーエフェクト
- トランジション時間は0.3s
- フォーカス状態は明確に表示（ボーダー色変更）

---

## 📂 ファイル構成

```
/panel/
├── index.html                    # ログインページ
├── dashboard.html                # ダッシュボード
├── Entry_HCP_Panel_web.mp4      # ロゴ動画
├── Entry_HCP_Panel_poster.png   # 動画フォールバック画像
└── DESIGN_SPEC.md               # このファイル
```

---

## 🔧 実装ノート

### CSSリセット
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### Flexbox使用箇所
- ヘッダー（space-between）
- ロゴコンテナ（align-items: center）
- サイドバーメニュー項目
- 履歴項目
- ポイントヘッダー

### レスポンシブ戦略
- モバイルファースト ❌ → デスクトップファースト ✅
- 768px以下でサイドバーが上部に移動
- フレックスボックスで柔軟なレイアウト

---

## 🌐 ブラウザサポート

- Chrome（最新）
- Firefox（最新）
- Safari（最新）
- Edge（最新）
- iOS Safari（iOS 12+）
- Chrome for Android

---

## 📞 技術的な質問・確認事項

このデザイン仕様について不明点があれば、以下を確認してください：

1. カラーコードは正確に記載されています
2. すべてのサイズはピクセル単位で指定
3. レスポンシブブレイクポイントは明確に定義
4. アニメーション時間は0.3秒で統一
5. 動画ロゴの設定（autoplay, loop, muted, playsinline）

---

**最終更新日**: 2026-02-15
**バージョン**: 1.0

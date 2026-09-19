# titan11111.github.io — 接続用ハブ

- 仕様書名: Titans Game Works 入口
- 対象: `titan11111.github.io`
- 作成日: 2026-09-19
- ステータス: 公開
- 参照ファイル: `index.html` `style.css` `script.js` `games.js`

## ゲーム概要

- ジャンル: 公開ゲームの目次（ゲーム本体ではない）
- 一言説明: `https://titan11111.github.io/` から、各リポジトリの GitHub Pages へ進む入口
- 想定プレイヤー: iPhone Safari / Facebook から来た人
- クリア体験の要点: 「遊ぶ」を押すと、そのゲームの Pages URL が開く

## 対象環境

### 必須
- 配信先: GitHub Pages（ユーザーサイト。リポジトリ名は `titan11111.github.io`）
- 最優先端末: iPhone Safari
- 実装方式: 静的 HTML / CSS / JS。ビルドなし

### 任意
- PC: キーボードで検索可能

## 操作 / 設定UI

- 入力: 検索は `<input type="search">`。絞り込みは Pointer Events のチップ
- 遊ぶ: ネイティブの `<a href>`（各ゲームの Pages）。`setPointerCapture` は一覧スクロールを奪うため使わない
- ポーズ / ミュート: なし（音もゲームループも無い）
- 保存: なし

## 画面

1. 見出しと検索
2. 今月 / 今年度 / すべて
3. タイトル・日付・一言・遊ぶ

## 勝敗条件

なし。目次である。

## 実装制約

- 一覧は GitHub Pages が HTTP 200 だったリポジトリだけを `games.js` に入れる
- タイトルは `textContent` で描く（`innerHTML` 禁止）
- 一覧はスクロールできる。`overflow: hidden` と全面 `touch-action: none` は使わない

## 未確定事項

- 新規ゲーム公開のたびに `games.js` を更新する運用（自動化は未着手）

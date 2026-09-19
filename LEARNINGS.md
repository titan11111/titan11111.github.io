# LEARNINGS — titan11111.github.io

## 2026-09-19 | 接続用ハブを新設

- やったこと: ユーザーサイト `titan11111.github.io` を作り、公開済みゲームへ進む入口にした
- うまくいったこと: ルート `https://titan11111.github.io/` はユーザーリポジトリが無いと 404 になる。ゲーム本体はこれまでどおり `https://titan11111.github.io/<repo>/`
- 詰まった箇所: `publish.sh` の URL 組み立てはプロジェクトサイト向けなので、このリポジトリでは使わず Pages を手動で有効化した
- 一覧の根拠: `gh repo list` のあと、各 Pages URL を HTTP 確認し、200 のみを `games.js` に入れた

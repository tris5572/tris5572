
# GitHub Pages へ Vite で作った React の SPA をデプロイする方法

毎回手探りで進めてしまうので、メモ。

## ワークフローファイルを作成

リポジトリ内の `.github/workflows/deploy.yml` に、以下のようなファイルを作成する。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main # main ブランチに push されたときに実行される

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "24"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build React app
        run: pnpm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: gh-pages
          enable_jekyll: false
```

例: https://github.com/tris5572/map-style/blob/a0fd3b9df455ddb6c18b9df97fbb73727a4383fd/.github/workflows/deploy.yml

## `vite.config.ts` を編集

公開される URL のディレクトリ名を指定するため、`vite.config.ts` に `base` として `/リポジトリ名` を追加する。

```ts diff
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/<リポジトリ名>",
  plugins: [react()],
});
```

```diff
+ base: "/<リポジトリ名>",
```

## リポジトリの Actions の設定を変更

リポジトリの設定 (Settings) で、`Actions > General > Workflow permissions` を `Read and write permissions` に変更して Save する。

（デフォルトでは `Read repository contents and packages permissions` になっている）

## ローカルの変更を push して Actions を動かす

PR をマージするなどして `main` ブランチに反映する。

これで Actions が実行され、`gh-pages` ブランチが作成される。

## GitHub Pages の設定

リポジトリの設定 (Settings) で、`Pages > Build and deployment > Branch` でプルダウンから `gh-pages` を選び（ディレクトリは `/(root)`）、Save する。

これで少し待てば `https://<アカウント名>.github.io/<リポジトリ名>/` に公開される。

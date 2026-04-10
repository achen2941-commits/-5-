# 会员收录示例（Express + SQLite）

快速启动：

1. 在该文件夹打开终端（PowerShell 或 CMD）。
2. 安装依赖：

```bash
npm install
```

3. 启动服务：

```bash
npm start
```

服务默认运行在 `http://localhost:3000`。API：

- `POST /api/members` — 添加会员，JSON body: `{ name, email, phone?, note? }`，返回 `{ id }`。
- `GET /api/members` — 列出最近会员（示例）。

备注：页面 `index.html` 中的表单会向 `http://localhost:3000/api/members` 提交数据。若你直接用浏览器打开本地 `index.html` 文件（file://），服务器已允许跨域（CORS）访问，但为避免 CORS 或资源路径问题，建议将站点放到 `public/` 下并通过该服务访问：

```bash
# 将网站文件放入 public/，然后访问
http://localhost:3000/
```

部署到公网（Render / Vercel）
-----------------------------

如果你希望 `https://` 的 GitHub Pages 页面能直接调用后端，推荐把后端部署到支持 HTTPS 的托管服务（例如 Render、Vercel、Railway）。下面是通用流程：

- 将本项目推送到一个 GitHub 仓库。
- 在 Render 上创建一个新的 **Web Service**：连接到你的仓库，构建命令留空（使用默认），启动命令设置为 `npm start`，端口使用 `3000`。
- 或在 Vercel 中创建一个 Node 服务（Vercel 更偏向 serverless，可能需改造）；Render 对长期运行的 Node 服务更直接友好。

注意（SQLite）：本仓库使用 SQLite文件存储，这在大多数免费/无状态宿主上不会保证持久化（部署或重启后数据可能丢失）。生产建议使用托管数据库（Postgres / MySQL）并把代码改为使用该数据库，或选择支持持久磁盘的付费方案。

快速推送并部署（示例命令）：

```bash
git init
git add .
git commit -m "Add Dockerfile and deployment notes"
git branch -M main
git remote add origin <your-git-repo-url>
git push -u origin main
```

在你创建好远程仓库并推送后，去 Render 建立服务并使用上面的 `npm start` 启动命令。


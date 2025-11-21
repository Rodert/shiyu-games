# 安装和配置指南

## 系统要求

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0 或 **yarn**: >= 1.22.0
- **操作系统**: Windows / macOS / Linux

## 安装步骤

### 1. 克隆或下载项目

```bash
# 如果是 git 项目
git clone <repository-url>
cd snake-game

# 或直接进入项目目录
cd /Users/xuanxuanzi/home/s/javapub/shiyu-games/snake-game
```

### 2. 安装依赖

使用 npm：
```bash
npm install
```

或使用 yarn：
```bash
yarn install
```

或使用 pnpm：
```bash
pnpm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

输出示例：
```
  VITE v4.4.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

浏览器会自动打开 `http://localhost:5173`

### 4. 开始开发

编辑 `src/` 目录中的文件，浏览器会自动热更新。

## 生产构建

### 构建项目

```bash
npm run build
```

输出文件位置：`dist/` 目录

### 预览生产构建

```bash
npm run preview
```

## 部署指南

### 部署到 Netlify

#### 方法 1：使用 Netlify CLI

```bash
# 全局安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 部署
netlify deploy --prod --dir=dist
```

#### 方法 2：使用 GitHub 连接

1. 将项目推送到 GitHub
2. 登录 [Netlify](https://netlify.com)
3. 点击 "New site from Git"
4. 选择 GitHub 仓库
5. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 点击 "Deploy site"

### 部署到 Vercel

#### 方法 1：使用 Vercel CLI

```bash
# 全局安装 Vercel CLI
npm install -g vercel

# 部署
vercel
```

#### 方法 2：使用 GitHub 连接

1. 将项目推送到 GitHub
2. 登录 [Vercel](https://vercel.com)
3. 点击 "New Project"
4. 导入 GitHub 仓库
5. Vercel 会自动检测 Vite 项目
6. 点击 "Deploy"

### 部署到 GitHub Pages

```bash
# 1. 修改 vite.config.ts
# 添加 base 配置
export default defineConfig({
  base: '/shiyu-games/snake-game/',
  // ...
})

# 2. 构建
npm run build

# 3. 部署到 gh-pages 分支
npm install --save-dev gh-pages

# 4. 在 package.json 中添加脚本
"deploy": "npm run build && gh-pages -d dist"

# 5. 运行部署
npm run deploy
```

### 部署到自己的服务器

```bash
# 1. 构建
npm run build

# 2. 将 dist 目录上传到服务器
# 使用 FTP、SCP 或其他方式上传

# 3. 配置 Web 服务器（以 Nginx 为例）
server {
    listen 80;
    server_name yourdomain.com;
    
    root /var/www/snake-game;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# 4. 重启 Nginx
sudo systemctl restart nginx
```

## 环境变量配置

如果需要使用环境变量，创建 `.env` 文件：

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Snake Game
```

在代码中使用：

```typescript
const apiUrl = import.meta.env.VITE_API_URL
const appName = import.meta.env.VITE_APP_NAME
```

## 常见问题

如有其他问题，欢迎在 [GitHub Issues](https://github.com/Rodert/shiyu-games/issues) 中提出。

### Q: 安装时出现 npm ERR! code ERESOLVE

**解决方案**：
```bash
# 使用 legacy peer deps
npm install --legacy-peer-deps

# 或升级 npm
npm install -g npm@latest
```

### Q: 启动时出现 "Port 5173 is already in use"

**解决方案**：
```bash
# 使用其他端口
npm run dev -- --port 3000

# 或杀死占用该端口的进程
# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Q: 构建后文件很大

**解决方案**：
```bash
# 分析构建大小
npm install --save-dev rollup-plugin-visualizer

# 在 vite.config.ts 中添加
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
    }),
  ],
})

# 重新构建
npm run build
```

### Q: 热更新不工作

**解决方案**：
1. 检查文件是否保存
2. 检查浏览器控制台是否有错误
3. 清除浏览器缓存
4. 重启开发服务器

### Q: TypeScript 错误

**解决方案**：
```bash
# 重新生成 node_modules
rm -rf node_modules package-lock.json
npm install

# 或清除 TypeScript 缓存
rm -rf node_modules/.vite
```

## 开发工具推荐

### 浏览器扩展

- **React Developer Tools**: 调试 React 组件
- **Redux DevTools**: 状态管理调试（如果使用 Redux）

### IDE 扩展（VS Code）

- **ES7+ React/Redux/React-Native snippets**: 代码片段
- **Tailwind CSS IntelliSense**: Tailwind 代码补全
- **TypeScript Vue Plugin**: TypeScript 支持
- **Prettier**: 代码格式化
- **ESLint**: 代码检查

### 安装 VS Code 扩展

```bash
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
```

## 性能优化建议

### 开发阶段

1. 使用 React DevTools 检查不必要的重新渲染
2. 使用浏览器 Performance 标签分析性能
3. 使用 Lighthouse 检查页面质量

### 生产阶段

1. 启用 gzip 压缩
2. 使用 CDN 加速
3. 启用浏览器缓存
4. 使用 lazy loading 加载组件

## 更新依赖

```bash
# 检查过期的依赖
npm outdated

# 更新所有依赖到最新版本
npm update

# 更新特定依赖
npm install react@latest

# 检查安全漏洞
npm audit

# 自动修复安全漏洞
npm audit fix
```

## 许可证

MIT

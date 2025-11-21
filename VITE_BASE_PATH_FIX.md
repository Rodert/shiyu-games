# 🔧 Vite 基础路径修复说明

## 问题描述

在 GitHub Pages 上访问贪吃蛇游戏时，出现以下错误：

```
GET https://rodert.github.io/src/main.tsx net::ERR_ABORTED 404 (Not Found)
The deferred DOM Node could not be resolved to a valid node.
```

## 原因分析

### 问题根源

Vite 构建的应用默认假设部署在域名根路径 `/`。

但在 GitHub Pages 上，项目部署在子路径：
```
https://Rodert.github.io/shiyu-games/snake-game/
```

### 路径错误示例

**错误的路径**：
```
https://rodert.github.io/src/main.tsx  ❌
https://rodert.github.io/assets/main.js  ❌
```

**正确的路径**：
```
https://rodert.github.io/shiyu-games/snake-game/src/main.tsx  ✅
https://rodert.github.io/shiyu-games/snake-game/assets/main.js  ✅
```

### 解决方案

在 `vite.config.ts` 中添加 `base` 配置：

```typescript
export default defineConfig({
  base: '/shiyu-games/snake-game/',  // 添加这一行
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

## 修复详情

### 修改的文件

**文件**: `snake-game/vite.config.ts`

**修改内容**：
```diff
export default defineConfig({
+ base: '/shiyu-games/snake-game/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### 修复原理

`base` 配置告诉 Vite：
- 在构建时，所有资源路径都应该相对于 `/shiyu-games/snake-game/`
- 生成的 HTML 会自动调整所有资源引用
- 例如：`/src/main.tsx` 会变成 `/shiyu-games/snake-game/src/main.tsx`

## 验证修复

### 第 1 步：等待部署完成

1. 进入 GitHub 仓库 → **Actions**
2. 查看最新的 **Deploy to GitHub Pages** 工作流
3. 等待显示 ✅ 绿色勾号（通常 2-5 分钟）

### 第 2 步：清除缓存并访问

1. 清除浏览器缓存（重要！）
2. 访问 https://Rodert.github.io/shiyu-games/
3. 点击 "🎮 开始游戏" 进入贪吃蛇游戏

### 第 3 步：检查浏览器控制台

1. 打开浏览器开发者工具（F12）
2. 进入 **Console** 标签
3. 应该没有 404 错误
4. 应该看到游戏正常加载

### 第 4 步：测试游戏功能

- ⬆️ ⬇️ ⬅️ ➡️ 或 WASD 移动蛇
- SPACE 暂停/继续
- R 重新开始
- 游戏应该正常运行

## 📊 修复前后对比

### 修复前（错误）

```
请求: GET /src/main.tsx
实际路径: https://rodert.github.io/src/main.tsx
结果: 404 Not Found ❌
```

### 修复后（正确）

```
请求: GET /shiyu-games/snake-game/src/main.tsx
实际路径: https://rodert.github.io/shiyu-games/snake-game/src/main.tsx
结果: 200 OK ✅
```

## 🔍 其他可能的路径问题

### 如果还有其他路径问题

检查以下文件中是否有硬编码的绝对路径：

1. **HTML 文件**：
   - `snake-game/index.html`
   - 检查 `<script>` 和 `<link>` 标签中的路径

2. **CSS 文件**：
   - `snake-game/src/index.css`
   - 检查 `url()` 中的路径

3. **JavaScript 文件**：
   - 检查动态导入路径
   - 检查 API 调用路径

### 修复绝对路径

**错误**：
```html
<script src="/src/main.tsx"></script>
<link rel="stylesheet" href="/src/index.css">
```

**正确**：
```html
<script src="./src/main.tsx"></script>
<link rel="stylesheet" href="./src/index.css">
```

或者让 Vite 自动处理（推荐）：
```html
<script type="module" src="/src/main.tsx"></script>
```

Vite 会自动将其转换为正确的路径。

## 📚 相关文档

- [Vite 官方文档 - Base URL](https://vitejs.dev/config/shared-options.html#base)
- [GitHub Pages 设置指南](./GITHUB_PAGES_SETUP.md)
- [GitHub Pages 故障排除](./GITHUB_PAGES_TROUBLESHOOTING.md)
- [游戏链接修复说明](./GAME_LINK_FIX.md)

## ✅ 修复检查清单

- [x] 添加 `base` 配置到 `vite.config.ts`
- [x] 推送修复到 GitHub
- [x] GitHub Actions 自动重新部署
- [ ] 等待部署完成（2-5 分钟）
- [ ] 清除浏览器缓存
- [ ] 访问网站并测试游戏
- [ ] 检查浏览器控制台是否有错误
- [ ] 验证游戏正常运行

## 🎉 修复完成！

修复已推送，GitHub Actions 正在重新部署。等待部署完成后，清除缓存，就可以正常访问贪吃蛇游戏了！

---

**最后更新**: 2024-11-21

**修复状态**: ✅ 已应用并推送

**预期效果**: 所有资源路径正确，游戏正常加载和运行

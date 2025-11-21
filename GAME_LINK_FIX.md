# 🎮 游戏链接修复说明

## 问题描述

点击主页上的 "🎮 开始游戏" 按钮时，无法正确跳转到贪吃蛇游戏页面。

## 原因分析

**问题原因**：主页 `index.html` 中使用了绝对路径 `/snake-game/`

在 GitHub Pages 上，项目部署在子路径 `https://Rodert.github.io/shiyu-games/` 下，而不是根路径。

**错误的路径**：
```html
<a href="/snake-game/">🎮 开始游戏</a>
```

这会尝试访问 `https://Rodert.github.io/snake-game/`（错误！）

**正确的路径**：
```html
<a href="./snake-game/">🎮 开始游戏</a>
```

这会访问 `https://Rodert.github.io/shiyu-games/snake-game/`（正确！）

## 修复方案

### 已应用的修复

✅ 已将 `index.html` 中的游戏链接从绝对路径改为相对路径

```diff
- <a href="/snake-game/" class="game-link">🎮 开始游戏</a>
+ <a href="./snake-game/" class="game-link">🎮 开始游戏</a>
```

### 修复已推送

修复已推送到 GitHub，GitHub Actions 会自动重新部署。

## 验证修复

### 第 1 步：等待部署完成

1. 进入 GitHub 仓库 → **Actions**
2. 查看最新的 **Deploy to GitHub Pages** 工作流
3. 等待显示 ✅ 绿色勾号（通常 2-5 分钟）

### 第 2 步：清除缓存并访问网站

1. 打开浏览器
2. 访问 https://Rodert.github.io/shiyu-games/
3. **清除缓存**（重要！）：
   - Chrome/Edge: `Ctrl+Shift+Delete` 或 `Cmd+Shift+Delete`
   - Firefox: `Ctrl+Shift+Delete` 或 `Cmd+Shift+Delete`
   - Safari: 菜单 → 开发 → 清空缓存

### 第 3 步：测试游戏链接

1. 在主页上找到 "🐍 贪吃蛇" 卡片
2. 点击 "🎮 开始游戏" 按钮
3. 应该跳转到 `https://Rodert.github.io/shiyu-games/snake-game/`
4. 游戏应该正常加载

### 第 4 步：测试游戏功能

1. 游戏页面应该显示：
   - 游戏标题：🐍 Snake Game - 贪吃蛇
   - 游戏画布（黑色背景）
   - 控制按钮（暂停、重启）
   - 统计信息（分数、长度、速度）

2. 测试游戏：
   - 使用方向键或 WASD 移动蛇
   - 按 SPACE 暂停/继续
   - 按 R 重新开始

## 🔍 如果仍有问题

### 问题 1：仍然显示 404

**解决方案**：
1. 硬刷新页面：`Ctrl+Shift+R` 或 `Cmd+Shift+R`
2. 清除浏览器缓存
3. 尝试隐私/无痕浏览模式
4. 等待 5-10 分钟（GitHub Pages 缓存）

### 问题 2：游戏页面加载但样式混乱

**解决方案**：
1. 检查浏览器控制台（F12）是否有错误
2. 清除缓存并硬刷新
3. 检查网络连接

### 问题 3：游戏无法运行

**解决方案**：
1. 检查浏览器控制台错误
2. 确保 JavaScript 已启用
3. 尝试其他浏览器
4. 查看 [GitHub Pages 故障排除指南](./GITHUB_PAGES_TROUBLESHOOTING.md)

## 📋 相关文件

- **index.html** - 主页（已修复）
- **snake-game/index.html** - 游戏页面
- **.github/workflows/deploy-gh-pages.yml** - 部署工作流

## 🔗 相关链接

- [GitHub Pages 设置指南](./GITHUB_PAGES_SETUP.md)
- [GitHub Pages 故障排除](./GITHUB_PAGES_TROUBLESHOOTING.md)
- [部署指南](./DEPLOYMENT.md)

## ✅ 修复检查清单

- [x] 修改 index.html 中的游戏链接
- [x] 推送修复到 GitHub
- [x] GitHub Actions 自动重新部署
- [ ] 等待部署完成（2-5 分钟）
- [ ] 清除浏览器缓存
- [ ] 访问网站并测试游戏链接
- [ ] 验证游戏正常运行

## 🎉 修复完成！

修复已应用并推送到 GitHub。现在应该可以正常点击 "🎮 开始游戏" 按钮进入贪吃蛇游戏了。

---

**最后更新**: 2024-11-21

**修复状态**: ✅ 已应用并推送

**预期效果**: 点击 "🎮 开始游戏" 按钮可以正常跳转到贪吃蛇游戏

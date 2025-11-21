# 贡献指南

感谢你对贪吃蛇游戏项目的兴趣！本文档将指导你如何为项目做出贡献。

## 📋 行为准则

我们致力于为所有贡献者提供一个友好、包容的环境。请遵守以下原则：

- 尊重他人的观点和想法
- 接受建设性的批评
- 关注对项目最有利的事情
- 对社区成员表示同情

## 🚀 如何开始贡献

### 1. Fork 项目

点击 GitHub 上的 "Fork" 按钮，将项目复制到你的账户。

### 2. Clone 你的 Fork

```bash
git clone https://github.com/YOUR_USERNAME/shiyu-games.git
cd shiyu-games/snake-game
```

### 3. 创建特性分支

```bash
git checkout -b feature/your-feature-name
```

或修复 Bug：

```bash
git checkout -b bugfix/your-bug-fix
```

### 4. 安装依赖

```bash
npm install
```

### 5. 进行更改

编辑文件并测试你的更改。

### 6. 提交更改

```bash
git add .
git commit -m "feat: add your feature description"
```

### 7. Push 到你的 Fork

```bash
git push origin feature/your-feature-name
```

### 8. 创建 Pull Request

在 GitHub 上创建 Pull Request，描述你的更改。

## 📝 提交信息规范

请遵循以下格式编写提交信息：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type（类型）

- **feat**: 新功能
- **fix**: 修复 Bug
- **docs**: 文档更新
- **style**: 代码风格调整（不影响功能）
- **refactor**: 代码重构
- **perf**: 性能优化
- **test**: 添加或修改测试
- **chore**: 构建过程、依赖管理等

### Scope（范围）

- **game**: 游戏逻辑
- **ui**: 用户界面
- **canvas**: Canvas 绘制
- **config**: 配置文件
- **docs**: 文档

### Subject（主题）

- 使用祈使句，例如 "add" 而不是 "added" 或 "adds"
- 不要大写首字母
- 末尾不加句号
- 限制在 50 个字符以内

### 示例

```
feat(game): add pause functionality

Add ability to pause and resume the game using SPACE key.
Implement pause state in useGameLogic hook.

Closes #123
```

## 🎯 贡献类型

### Bug 修复

1. 在 GitHub Issues 中搜索相关问题
2. 如果问题不存在，创建新的 Issue
3. Fork 项目并创建修复分支
4. 修复 Bug 并添加测试
5. 提交 Pull Request

### 新功能

1. 在 Issues 中讨论你的想法
2. 等待维护者的反馈
3. 获得批准后，Fork 项目
4. 实现功能并添加测试
5. 提交 Pull Request

### 文档改进

1. Fork 项目
2. 编辑相关文档文件
3. 提交 Pull Request

## 🧪 测试

### 运行开发服务器

```bash
npm run dev
```

### 手动测试

1. 启动开发服务器
2. 在浏览器中打开游戏
3. 测试你的更改
4. 检查是否有错误或问题

### 浏览器兼容性测试

在以下浏览器中测试：

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

## 📐 代码风格

### TypeScript

- 使用 TypeScript 编写代码
- 为函数参数和返回值添加类型注解
- 避免使用 `any` 类型

### React

- 使用函数组件和 Hooks
- 使用 `useCallback` 缓存函数
- 使用 `useMemo` 缓存计算结果
- 避免在 JSX 中创建新对象或数组

### CSS

- 优先使用 Tailwind CSS 类
- 自定义 CSS 放在 `index.css` 中
- 使用 CSS 变量管理颜色

### 命名规范

- **组件**：PascalCase（例如 `GameCanvas`）
- **函数/变量**：camelCase（例如 `updateGame`）
- **常量**：UPPER_SNAKE_CASE（例如 `GRID_SIZE`）
- **CSS 类**：kebab-case（例如 `neon-glow`）

## 🔍 代码审查

所有 Pull Request 都需要通过代码审查。审查过程中：

- 维护者会检查代码质量
- 可能会要求进行更改
- 一旦批准，你的 PR 将被合并

### 审查标准

- 代码是否遵循项目风格
- 是否添加了必要的测试
- 是否更新了相关文档
- 是否有性能问题
- 是否有安全问题

## 📚 项目结构

```
snake-game/
├── src/
│   ├── components/      # React 组件
│   ├── hooks/          # 自定义 Hooks
│   ├── App.tsx         # 主应用
│   ├── main.tsx        # 入口
│   └── index.css       # 样式
├── docs/               # 文档（计划）
├── tests/              # 测试（计划）
└── ...
```

## 🐛 报告 Bug

### 创建 Bug Report

1. 在 GitHub Issues 中点击 "New Issue"
2. 选择 "Bug report" 模板
3. 填写以下信息：

```markdown
## 描述 Bug
清晰简洁地描述 Bug 是什么。

## 复现步骤
1. 进入 '...'
2. 点击 '...'
3. 看到错误

## 预期行为
描述你期望发生的事情。

## 实际行为
描述实际发生的事情。

## 环境
- 操作系统: [例如 Windows 10]
- 浏览器: [例如 Chrome 90]
- 版本: [例如 1.0.0]

## 截图
如果适用，添加截图。

## 其他信息
任何其他相关信息。
```

## 💡 功能建议

### 创建功能请求

1. 在 GitHub Issues 中点击 "New Issue"
2. 选择 "Feature request" 模板
3. 填写以下信息：

```markdown
## 功能描述
清晰简洁地描述你想要的功能。

## 解决的问题
这个功能解决什么问题？

## 建议的解决方案
你建议如何实现这个功能？

## 替代方案
是否有其他方式实现这个功能？

## 其他信息
任何其他相关信息。
```

## 📞 联系方式

- 在 [GitHub Issues](https://github.com/Rodert/shiyu-games/issues) 中讨论
- 在 [Pull Request](https://github.com/Rodert/shiyu-games/pulls) 中评论
- 访问 [GitHub 仓库](https://github.com/Rodert/shiyu-games)

## 🎓 学习资源

### React

- [React 官方文档](https://react.dev)
- [React Hooks 文档](https://react.dev/reference/react)

### TypeScript

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)

### Tailwind CSS

- [Tailwind CSS 文档](https://tailwindcss.com/docs)

### Canvas API

- [MDN Canvas 文档](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## 🙏 致谢

感谢所有为项目做出贡献的人！

## 📄 许可证

通过贡献，你同意你的贡献将在 MIT 许可证下发布。

---

**最后更新**: 2024 年

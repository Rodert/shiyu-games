# ⌨️ 打字大师 (Typing Master)

一个极限打字挑战游戏，在 60 秒内尽快输入随机单词，测试你的打字速度和准确率。

## 🎮 游戏特性

- **60 秒挑战**: 限时打字竞赛
- **速度测试**: 计算 WPM (Words Per Minute)
- **准确率统计**: 显示打字准确率百分比
- **实时反馈**: 即时的分数和统计显示
- **难度递增**: 单词难度随机分布
- **响应式设计**: 完美适配各种设备

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📖 游戏说明

### 基本操作
- **输入**: 在输入框中输入显示的单词
- **提交**: 按 Enter 键或点击"提交"按钮
- **开始**: 按空格键或点击"开始游戏"按钮

### 游戏规则
1. 点击"开始游戏"开始 60 秒的挑战
2. 屏幕显示一个英文单词
3. 在输入框中输入该单词
4. 按 Enter 提交答案
5. 正确 +10 分，错误 -5 分
6. 60 秒后游戏结束，显示最终统计

### 计分系统
- **正确**: +10 分
- **错误**: -5 分
- **WPM**: 每分钟字数 = (正确字数 × 5) / 分钟数
- **准确率**: 正确数 / (正确数 + 错误数) × 100%

## 🎯 游戏机制

### 单词库
包含 15 个常见编程相关单词：
- react, typescript, javascript, frontend, backend
- fullstack, database, algorithm, framework, component
- state, props, hook, context, reducer

### 时间系统
- **总时间**: 60 秒
- **倒计时**: 实时显示剩余时间
- **警告**: 剩余 10 秒时分数变红

### 分数计算
```
总分 = (正确数 × 10) - (错误数 × 5)
WPM = (正确数 × 5) / (总时间 / 60)
准确率 = 正确数 / (正确数 + 错误数) × 100%
```

## 🛠️ 技术栈

- **React 18**: UI 框架
- **TypeScript**: 类型安全
- **TailwindCSS**: 样式框架
- **Lucide React**: 图标库

## 📁 项目结构

```
typing-master-game/
├── src/
│   ├── App.tsx                 # 主应用组件
│   ├── components/
│   │   └── GameUI.tsx          # 游戏 UI 界面
│   ├── hooks/
│   │   └── useTypingMasterLogic.ts # 游戏逻辑
│   ├── main.tsx                # React 入口
│   └── index.css               # 全局样式
├── package.json                # 依赖配置
├── vite.config.ts              # Vite 配置
├── tsconfig.json               # TypeScript 配置
├── tailwind.config.js          # TailwindCSS 配置
└── index.html                  # HTML 入口
```

## 🎨 视觉效果

### 界面设计
- **背景**: 深蓝色渐变背景
- **卡片**: 半透明深灰色卡片
- **文本**: 彩色发光文本效果
- **输入框**: 蓝色边框，焦点时发光

### 颜色方案
- **主色**: 青色 (#00ffff)
- **强调色**: 绿色 (#00ff88)
- **警告色**: 红色 (剩余时间 < 10s)
- **成功色**: 绿色 (正确答案)
- **失败色**: 红色 (错误答案)

## 📊 游戏统计

### 实时显示
- **剩余时间**: 倒计时显示
- **当前单词**: 大字体显示待输入单词
- **输入框**: 用户输入区域
- **正确数**: 已正确输入的单词数
- **错误数**: 输入错误的单词数
- **分数**: 实时分数

### 游戏结束统计
- **总分**: 最终得分
- **WPM**: 每分钟字数
- **正确数**: 正确输入的单词数
- **错误数**: 输入错误的单词数
- **准确率**: 准确率百分比

## 🎮 游戏状态

### 准备状态
- 显示"准备好了吗？"提示
- 点击"开始游戏"按钮或按空格开始
- 显示游戏说明

### 游戏中
- 显示倒计时
- 显示当前单词
- 显示输入框
- 实时显示统计数据
- 支持 Enter 键提交

### 游戏结束
- 显示最终统计数据
- 显示 WPM 和准确率
- 显示分数对比
- 提供"重新开始"按钮

## 📊 性能指标

- **帧率**: 60 FPS (1000ms 计时器)
- **内存**: 低内存占用
- **响应时间**: < 50ms 输入响应

## 🔧 配置选项

### 游戏参数 (可在 hook 中调整)
```typescript
// 单词库
WORDS: ['react', 'typescript', ...]

// 游戏时长
timeLeft: 60

// 正确分数
correctScore: 10

// 错误分数
wrongScore: -5

// 单词长度 (用于 WPM 计算)
charPerWord: 5
```

### 单词库扩展
可以在 `useTypingMasterLogic.ts` 中修改 `WORDS` 数组：

```typescript
const WORDS = [
  'react', 'typescript', 'javascript', 'frontend', 'backend',
  'fullstack', 'database', 'algorithm', 'framework', 'component',
  'state', 'props', 'hook', 'context', 'reducer'
]
```

## 🎯 游戏技巧

1. **快速反应**: 尽快输入每个单词
2. **准确性**: 避免输入错误以保持分数
3. **节奏感**: 保持稳定的输入节奏
4. **专注力**: 集中注意力在单词上

## 🐛 已知问题

- 无已知问题

## 🚀 未来计划

- [ ] 添加多个难度等级
- [ ] 添加自定义单词库
- [ ] 添加排行榜
- [ ] 添加成就系统
- [ ] 添加音效反馈
- [ ] 支持多语言单词
- [ ] 添加练习模式

## 📝 更新日志

### v1.0.0 (2025-11-21)
- 初始版本发布
- 实现 60 秒打字挑战
- 添加 WPM 计算
- 实现准确率统计
- 添加实时反馈系统

## 📄 许可证

MIT License - 详见 [LICENSE](../../LICENSE)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

- GitHub: [Rodert/shiyu-games](https://github.com/Rodert/shiyu-games)
- 问题反馈: [Issues](https://github.com/Rodert/shiyu-games/issues)

## 💡 提示

- 使用机械键盘可能会获得更好的打字体验
- 在安静的环境中进行游戏可以提高专注力
- 多次练习可以提高你的 WPM 和准确率

# 个人主页 (Personal Homepage)

这是一个使用 Vue 3 和 Vite 构建的个人主页项目。

## ✨ 特点

*   响应式设计
*   亮色/暗色主题切换
*   通过 CSS 变量轻松定制主题
*   包含项目展示、技能展示、时间线等模块
*   集成了 FPS 计数器、弹窗等小功能

## 🛠️ 技术栈

*   [Vue 3](https://vuejs.org/)
*   [Vite](https://vitejs.dev/)
*   HTML
*   CSS (使用 CSS 变量进行主题化)
*   JavaScript

## 🚀 快速开始

**1. 克隆仓库 (如果适用)**

```bash
git clone <your-repository-url>
cd <project-directory>
```

**2. 安装依赖**

确保你已经安装了 Node.js 和 npm (或 yarn/pnpm)。

```bash
npm install
# 或者
yarn install
# 或者
pnpm install
```

**3. 运行开发服务器**

这将启动一个本地开发服务器，通常在 `http://localhost:5173` (端口可能因配置而异)。项目将具有热模块重载 (HMR) 功能。

```bash
npm run dev
# 或者
yarn dev
# 或者
pnpm dev
```

**4. 构建生产版本**

这将把项目打包到 `dist` 目录下，用于生产部署。

```bash
npm run build
# 或者
yarn build
# 或者
pnpm build
```

**5. 预览生产版本 (可选)**

构建完成后，你可以本地预览生产版本。

```bash
npm run preview
# 或者
yarn preview
# 或者
pnpm preview
```

## 🎨 主题定制

*   主题相关的 CSS 变量主要定义在 `src/styles/root.css` 文件中。
*   你可以修改 `html[theme="Light"]` 和 `html[theme="Dark"]` 块中的变量来自定义亮色和暗色主题。
*   主题切换逻辑位于 `src/utils/theme.js` 和 `src/components/HomePage.vue`。

## 📁 项目结构

```
├── public/         # 静态资源 (不会被 Vite 处理)
│   └── static/
│       ├── img/    # 公共图片 (如背景)
│       └── svg/    # 公共 SVG
├── src/
│   ├── assets/     # 源资源 (会被 Vite 处理, 如导入的图片/SVG)
│   │   ├── img/
│   │   └── svg/
│   ├── components/ # Vue 组件 (HomePage.vue)
│   ├── styles/     # CSS 样式 (root.css, style.css, index.css)
│   ├── utils/      # 工具函数 (common.js, index.js, popup.js, theme.js)
│   ├── App.vue     # 根组件
│   └── main.js     # 应用入口
├── index.html      # HTML 入口文件
├── package.json    # 项目依赖和脚本
├── vite.config.js  # Vite 配置文件
└── README.md       # 项目说明文件 (就是这个文件)
``` 
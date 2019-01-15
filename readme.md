### fis3-static-demo

### 环境搭建
- node环境 `8.14.0`
- 使用依赖包:
  - `npm i -g fis3` 全局安装最新版fis3
  - `npm i -g shx` shell执行包
  - `npm(cnpm) i -g fis3-server-browsersync` fis3 browsersync 服务器
  - `npm(cnpm) i -g fis3-optimizer-imagemin` 用于jpg,png,gif,webp,svg 压缩
  - `npm i -g fis3-optimizer-htmlmin` html压缩插件
  - `npm i -g fis3-parser-html-file` 扩展fis3的import标签, 使href属性中的uri参数可以被替换到引入页面中
  - `npm i -g fis-spriter-csssprites-group` 雪碧图插件
  - `npm i -g fis3-postprocessor-autoprefixer-latest`  css 预处理插件
  - `npm(cnpm) i -g fis3-parser-node-sass-latest`  sass 预处理
  - `npm i -g fis3-parser-less-latest`  less 预处理
  - `npm i -g fis3-optimizer-cleancss` 优化压缩css
  - `npm i -g fis3-optimizer-uglifyjs` js 压缩
  - `npm i -g fis3-postpackager-cloader` 把零散的文件（css,js）合并

- npm 任务
  - `npm run dev` 删除已有`../dist`目录，生成新`../dist` 开发目录
  - `npm run server` 开启开发`browsersync`服务器
  - `npm run clear` 手动删除`../dist` 目录
  - `npm run stop` 关闭开发`browsersync`服务器
  - `npm run build` 打包文件，生成`../build` 目录
  - mac 遇到权限问题`sudo chmod -R 777 /Users/$(whoami)/.fis3-tmp`
  
- run.py 执行发布脚本
  - 运行`python run.py www` 自动生成代码 提交至 发布代码仓库
  - 参考发布仓库[fis3-static-demo-release](https://github.com/xmllein/fis3-static-demo-release)
  
  
  

  

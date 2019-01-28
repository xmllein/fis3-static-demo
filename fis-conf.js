fis.set('namespace','fis3-static-name');

//======== 测试配置 ============//
const  TEST_OUTPUT_PATH = './test'; // 测试包路径 （仅执行编译，不压缩）

//======== 测试配置 ============//
const  DEV_OUTPUT_PATH = './dev'; // 开发包路径 （仅执行编译，不压缩）

//======== 线上包配置 ============//
const FORMAL_OUTPUT_PATH = './dist'; // 正式打包路径（包含编译、压缩代码 、图片压缩、csssprite）


// 常规配置  参考 http://fis.baidu.com/fis3/docs/api/config-props.html
fis.set('project.files', ['src/**']); // 源码path
fis.set('project.ignore', ['node_modules/**', 'dist/**', 'README.md', 'test/**', '.git/**', 'fis-conf.js']);
fis.set('charset', 'utf-8');
fis.set('project.charset', 'utf-8');

fis.match('::packager', { // fis-spriter-csssprites-group
  spriter: fis.plugin('csssprites-group')
});

fis.config.set('settings.spriter.csssprites-group', { //spriter-csssprites-group 配置
  scale: 1, //图片缩放比例
  rem: 50,  //1rem像素值
  unit: 'px',  // 默认单位
  margin: 11,//图之间的边距
  layout: 'matrix', //使用矩阵排列方式，默认为线性`linear`
  to: '/static/images/sprite' //合并图片存到/img/
});


//fis3-parser-html-file
fis.match('**.html', {
  parser: fis.plugin('html-file')
});

//fis3-parser-node-sass-latest
fis.match('*.{sass,scss}', {
  parser: fis.plugin('node-sass-latest', {}),
  postprocessor: fis.plugin('autoprefixer-latest', {
    browsers: ['last 2 versions'],
    "flexboxfixer": true,
    "gradientfixer": true
  }),
  rExt: '.css'
});

//fis3-parser-less-latest
fis.match('*.less', {
  parser: fis.plugin('less-latest', {}),
  postprocessor: fis.plugin('autoprefixer-latest', {
    browsers: ['last 2 versions'],
    "flexboxfixer": true,
    "gradientfixer": true
  }),
  rExt: '.css'
});

// 设置占位符,监听编译时需要设置固定的query才能捕获到进行替换
let query = '?v=123456798';

// 应用占位符
fis.match('*', {
  query: query
});

// 基本用法
fis.match('::package', {
  // 默认query为md5
  postpackager : fis.plugin('query', {
    placeholder: query // 这里传入占位符
  })
});

//使用 css next   可以配置 fis3-parser-css-next

fis.match(/^\/src\/(.*)$/i, {
  release: "$1",
  useCache: false
});

//=============开发模式=============//
fis.media('dev').match('*.{js,scss,css,jpg,png,gif,html}',{
  useHash: false,
  useSprite: false, //true 开启图片 Sprite， 如果不想预览设置false
  optimizer: false,
}).match('**', {
  deploy: fis.plugin('local-deliver', {
    to: DEV_OUTPUT_PATH
  })
});


//=============打包模式=============//
fis.media('build').match('*.{js,scss,css,jpg,png,gif}',{
  useHash: true,
  useSprite: true,
  optimizer: true,

}).match('lib/**.js', { // 库文件不加hash

  useHash: true

}).match('::packager', { // fis3-postpackager-cloader
  postpackager: fis.plugin('loader', {
      allInOne: {
        js: function (file) {
          return "/static/js/" + file.filename + "_aio.js";
        },
        css: function (file) {
          return "/static/css/" + file.filename + "_aio.css";
        }
      }
    })
}).match('*.html',{ // fis3-optimizer-htmlmin
  optimizer: fis.plugin('htmlmin',{
    jsmin: true
  })

}).match('::image', { // fis3-optimizer-imagemin
  optimizer: fis.plugin('imagemin', {})

}).match('*.{css,scss,sass,less}',{ //fis3-optimizer-cleancss
  optimizer: fis.plugin('cleancss',{}),


}).match('*.js', { // fis3-optimizer-uglifyjs
  optimizer: fis.plugin('uglifyjs', {})

}).match('{bs-config.js, package.json, fis-conf.js, server.log, run.py, readme.md,commonHtml/**,mock/**}',{ // 打包不发布文件
  release: false

}).match('**', {
  deploy: [
    fis.plugin('skip-packed', {
      // 配置项 过滤掉已被打包的文件
    }), fis.plugin('local-deliver', {
      to: FORMAL_OUTPUT_PATH
    })
  ]
});




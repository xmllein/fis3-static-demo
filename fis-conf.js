fis.set('namespace','fis3-static-name');

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
    browsers: ['last 2 versions']
  }),
  rExt: '.css'
});

//fis3-parser-less-latest
fis.match('*.less', {
  parser: fis.plugin('less-latest', {}),
  postprocessor: fis.plugin('autoprefixer-latest', {
    browsers: ['last 2 versions']
  }),
  rExt: '.css'
});

//=============开发模式=============//
fis.media('dev').match('*.{js,scss,css,jpg,png,gif,html}',{
  useHash: false,
  useSprite: false, //true 开启图片 Sprite， 如果不想预览设置false
  optimizer: false,
  release:'/$0'
});


//=============打包模式=============//
fis.media('build').match('*.{js,scss,css,jpg,png,gif}',{
  useHash: true,
  useSprite: true,
  optimizer: true,
  release:'/$0'

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

}).match('{bs-config.js, package.json, fis-conf.js, server.log, run.py, readme.md,commonHtml/**}',{ // 打包不发布文件
  release: false
});




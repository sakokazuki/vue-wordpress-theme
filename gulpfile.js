const gulp = require("gulp");
const browserSync = require("browser-sync").create()
const plumber     = require("gulp-plumber")
const runSequence = require('run-sequence')
const fs = require("fs")
const path = require("path");
const url = require('url');


/*------------------------------------------
env variables
------------------------------------------*/
const envfile = require("./env.js")
let isBuild;
let variables;
let _buildPath;
switch(process.env.NODE_ENV){
  case "release":
    variables = envfile.release;
    isBuild = true;
    _buildPath = "server/themes/wp-vue-release";
    break;
  case "dev":
  default:
    variables = envfile.dev;
    isBuild = false;
    _buildPath = "server/themes/wp-vue-dev";
  break;
}
variables = Object.assign(envfile.common, variables);

const PORT = 8888;
const SOURCEPATH = path.join('', 'app');
const LAYOUTPATH = path.join(SOURCEPATH, 'layout');
const STYLUSPATH = path.join(SOURCEPATH, 'style');
const ASSETSPATH = path.join(SOURCEPATH, 'assets');

const BUILDPATH = _buildPath;
const HTMLPATH = BUILDPATH;
const JSPATH = path.join(BUILDPATH, 'assets/js');
const CSSPATH = path.join(BUILDPATH, 'assets/styles');
const SPRITEPATHS = ["img/sp/sp-sprite", "img/pc-sprite"];


/*------------------------------------------
gulp tasks
------------------------------------------*/

//----------------
//  dafault & Build
//----------------

gulp.task('default', (cb)=> {
  return runSequence(
    'rewriteThemeStyle',
    'copy',
    'webpack',
    'stylus',
    'pug',
    'browser-sync',
    'watch',
    cb
  );
});

gulp.task('build', (cb)=> {
  return runSequence(
    'clean',
    'rewriteThemeStyle',
    'copy',
    'webpack',
    'stylus',
    'pug',
    'minify',
    'imagemin',
    cb
  );
});


//----------------
//  Watch
//----------------
gulp.task("watch", ()=>{
  const watch = require("gulp-watch");
  gulp.watch(path.join(LAYOUTPATH, "**/*.pug"), ()=>{
    runSequence('pug', 'reload');
  });
  gulp.watch(path.join(STYLUSPATH,"**/*.styl"), ["stylus"])

  watch(path.join(ASSETSPATH, "**/*"), (event)=>{
    gulp.start("copy");
  });

  let spriteDirArr = [];
  SPRITEPATHS.forEach((dir)=>{
    const arr = dir.split('/');
    const name = arr[arr.length-1];
    let soritepath = "";
    for(var j=0; j<arr.length-1; j++){
      soritepath += arr[j]+'/';
    }
    spriteDirArr.push(path.join(ASSETSPATH, soritepath, name, '*png'));
  });
  gulp.watch(spriteDirArr, ["sprite"]);
  gulp.watch(path.join(JSPATH, "**/*.js"), ()=>{
    browserSync.reload(path.join(BUILDPATH, "**/*.js"));
  })


})

//----------------
//  BROWER
//----------------
gulp.task("browser-sync", ()=>{
  browserSync.init({
    proxy: 'localhost:8000',
    scrollProportionally: false,
    open: true,
    port: PORT,
    ghostMode: false
  })
})

gulp.task("reload", ()=>{
  browserSync.reload();
})


//----------------
//  LAYOUT
//----------------
const pugReComplie = (v)=>{
  const userPugPath = v.path;
  const projectPath = process.cwd();
  const pugPath = path.relative(projectPath, userPugPath);
  const destfileName = path.relative(LAYOUTPATH, pugPath).replace('.pug', '.php');
  const destPath = path.join(HTMLPATH, destfileName);
  const pug = require('pug');

  try{
    fs.statSync(pugPath)
    const data = getPugData(pugPath);
    const html = pug.compileFile(pugPath, {
      locals:{},
      pretty: true,
      projectPath,
      compileDebug: true,
      doctype: "html"
    })(data);

    fs.writeFile(destPath, html, 'utf8', (err) => {
      if(err){
        throw err
        return;
      }
      browserSync.reload();
    });
  }catch(e){
    console.log(e)
  }
}

gulp.task("rewriteThemeStyle", (cb)=>{
  const filename = path.join(ASSETSPATH, 'style.css');
  const themename = process.env.NODE_ENV === 'dev' ? 'wp-vue-dev' : 'wp-vue'
  const data = `/*
    Theme Name: ${themename}
    Description: wordpress theme with vue.js
    Version: 1.0
  */
  `

  fs.writeFile(filename, data, (err)=>{
    cb();

  })

})

const getPugData = (filepath)=>{
  filepath = path.resolve(filepath, '../');
  const layoutRoot = path.join(__dirname, LAYOUTPATH);
  let rootpath = path.relative(filepath, layoutRoot);
  if(rootpath == '') rootpath = '.';
  return {ENV: variables, ROOTPATH: rootpath};
}

gulp.task("pug", ()=>{
  const pug = require("gulp-pug")
  const rename  = require('gulp-rename')
  const data = require("gulp-data")

  return gulp.src([
      path.join(LAYOUTPATH, "**/*.pug"),
      "!"+path.join(LAYOUTPATH, "partials/**/*.pug")
    ])
    .pipe(plumber())
    .pipe(data((file)=> {
      return getPugData(file.path);
    }))
    .pipe(pug({
      pretty: !isBuild
    }))
    .pipe( rename({
      extname: '.php'
    }) )
    .pipe(gulp.dest(HTMLPATH))
})


//----------------
//  webpack
//----------------
gulp.task('webpack', (cb)=>{
  const webpackStream = require("webpack-stream");
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config");
  webpackConfig.context = path.join(__dirname, SOURCEPATH);
  webpackConfig.watch = !isBuild;
  webpackConfig.mode = isBuild ? "production" : "development";
  webpackConfig.plugins[0] = new webpack.DefinePlugin({
    ENV: JSON.stringify(variables)
  })

  if(isBuild == false){
    cb();
  }
  return gulp.src('')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(JSPATH))
});

//----------------
// CSS
//----------------
gulp.task("stylus", ()=>{
  const stylus = require("gulp-stylus")
  const sourcemaps  = require('gulp-sourcemaps');
  const autoprefixer = require('gulp-autoprefixer')
  return gulp.src(path.join(STYLUSPATH, "/**/!(_)*.styl"))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
      cascade: false
     }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(CSSPATH))
    .pipe(browserSync.stream())
})

//----------------
//  MINIFY
//----------------
gulp.task("minify", ()=>{
  var uglify = require('gulp-uglify-es').default;
  var cleanCSS = require('gulp-clean-css');
  var mergeSteram = require('merge-stream');

  const js = gulp.src(BUILDPATH+"**/*.js")
    .pipe(uglify())
    .on('error', (e)=>{
      console.log(e);
    })
    .pipe(gulp.dest(BUILDPATH));

  const css = gulp.src(BUILDPATH+"**/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest(BUILDPATH));

  var merged = (js, css);
  return merged;
})

//----------------
//  CLEAN
//----------------
gulp.task("clean", ()=>{
  const del = require("del");
  return del([BUILDPATH]).then(e=>{

  });
});

//----------------
//  COPY
//----------------
gulp.task("copy", ()=>{
  //一度対象フォルダ内を空にしてからコピーし直す。
  const fs = require('fs');
  const dirname = ASSETSPATH;
  const files = fs.readdirSync(dirname);
  const del = require('del');
  const cpx = require('cpx');
  let arr = [];
  files.forEach((filename)=>{
    if(filename == 'js') return;
    arr.push(BUILDPATH+filename+"/");
  });
  // console.log(arr);

  const destPath = path.join(ASSETSPATH, "**/*");
  del(arr).then(e=>{
    return cpx.copy(destPath, BUILDPATH, ()=>{
      browserSync.reload(destPath);
    });
  });
});


//----------------
//  IMAGEMIN
//----------------
gulp.task('imagemin', ()=>{
  var imagemin = require("gulp-imagemin");
  var pngquant = require("imagemin-pngquant");
  var mozjpeg = require('imagemin-mozjpeg');

  return gulp.src(path.join(BUILDPATH, '**/*'))
    .pipe(plumber())
    .pipe(imagemin([
       pngquant({
         quality: '80-90',
         speed: 1,
         floyd:0
       }),
       mozjpeg({
         quality:85,
         progressive: true
       }),
       // imagemin.svgo({
       //  plugins: [{mergePaths: false}]
       // }),
       imagemin.optipng(),
       imagemin.gifsicle()
     ]
    ))
    .pipe(gulp.dest(BUILDPATH));
});



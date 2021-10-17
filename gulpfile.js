const gulp = require("gulp"); // 1)We're getting necessary components to gulp 
const webpack = require("webpack-stream");
const browserSync = require("browser-sync"); 
const htmlmin = require('gulp-htmlmin');

const dist = "./dist/"; // We sending the changes after use command gulp to file "dist"
// const dist = '../OSPanel/domains/picturePro.local'; // Doing same things before but to file "PictureLocal" then we can open in OpenServer

gulp.task('html', function () {
  return gulp.src("src/*.html")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("dist/"));
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browserSync.reload);
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
                .pipe(gulp.dest(dist + "/assets"))
                .on("end", browserSync.reload);
});

gulp.task("watch", () => {
    browserSync.init({
      server: "./dist/",
      port: 4000,
      notify: true
    });
    
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
    gulp.watch("src/*.html", gulp.parallel('html'));
});

gulp.task("build", gulp.parallel("copy-assets", "build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));
gulp.task('default', gulp.parallel('watch','html'));

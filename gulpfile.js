"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

var del = require("del");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var run = require('gulp-run-sequence');

var uglify = require('gulp-uglify');

gulp.task("style", function() {
  gulp.src("source/less/style.less")
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([autoprefixer()]))
  .pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename({suffix: '-min', prefix : ''}))
  .pipe(gulp.dest("build/css"));
});


gulp.task("serve",  function () {
  server.init({
    server: "build/"
  });
  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("build/*.html", ["html"]).on("change", server.reload);
});

//========================================================
gulp.task("clean", function () {
  return del("build");
});

gulp.task("js", function () {
  gulp.src("source/js/**/*.js")
  .pipe(plumber())
  .pipe(gulp.dest("build/js"))
  .pipe(rename({suffix: '-min', prefix : ''}))
  .pipe(uglify())
  .pipe(gulp.dest("build/js"));
});

gulp.task("images", function () {
  return gulp.src(["source/img/**/*.{png,jpg}", "source/img/*.svg"])
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
    ]))
  .pipe(gulp.dest("build/img"));
});


gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp())
  .pipe(gulp.dest("build/img/webp"));
});


gulp.task("sprite", function () {
  return gulp.src("source/img/sprite/icon-*.svg")
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([include()]))
  .pipe(gulp.dest("build/"));
});

gulp.task("fonts", function () {
  return gulp.src("source/fonts/**/*.{woff,woff2}")
  .pipe(gulp.dest("build/fonts"));
});

gulp.task("build", function (done) {
  run(
    "clean",
    ["fonts",  "style", "js", "images"],
    "sprite",
    "webp",
    "html",
    done
    );
});

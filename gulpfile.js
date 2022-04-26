const { notify } = require("browser-sync");
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browsersync = require("browser-sync").create();
const concat = require("gulp-concat");

// Sass Task

function scssTask() {
  return src("app/scss/**/*.scss").pipe(sass()).pipe(dest("dist/style"));
}

// JavaScript Task
function jsTask() {
  // return src("app/js/**/*.js", { sourcemaps: true }).pipe(
  //   dest("dist/js", { sourcemaps: "." })
  // );
  return src("app/js/*.js").pipe(concat("script.js")).pipe(dest("dist/js"));
}

// Browsersync Tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
    notify: false,
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browsersyncReload);
  watch(
    ["app/scss/**/*.scss", "app/js/*.js"],
    series(scssTask, jsTask, browsersyncReload)
  );
}

// Default Gulp task
exports.default = series(scssTask, jsTask, browsersyncServe, watchTask);

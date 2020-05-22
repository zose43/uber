const gulp = require("gulp");
const browserSync = require("browser-sync");
const gulpSass = require("gulp-sass");
const gulpRename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
/**
 * Static server
 */
gulp.task("server", () => {
  browserSync.init({
    server: {
      baseDir: "src",
    },
  });
});
/**
 * Complied sass
 */
gulp.task("sass", () => {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(
      gulpSass({ outputStyle: "compressed" }).on("error", gulpSass.logError)
    )
    .pipe(
      gulpRename({
        prefix: "",
        suffix: ".min",
      })
    )
    .pipe(autoprefixer())
    .pipe(
      cleanCss({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});
/**
 * Watch
 */
gulp.task("watch", () => {
  gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("sass"));
  gulp.watch("src/index.html").on("change", browserSync.reload);
});
/**
 * TASK DEF
 */
gulp.task("default", gulp.parallel("watch", "server", "sass"));

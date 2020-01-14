const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('autoprefixer', () => {
    const autoprefixer = require('autoprefixer');
    const sourcemaps = require('gulp-sourcemaps');
    const postcss = require('gulp-postcss');

    return gulp.src('./css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("css/*.css");
    gulp.watch("*.html").on('change', browserSync.reload);
});
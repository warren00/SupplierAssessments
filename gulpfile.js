var gulp = require('gulp');
var durandal = require('gulp-durandal');

gulp.task('default', function () {
    return durandal({
        baseDir: 'app',
        main: 'main.js',
        output: 'main-release.js',
        almond: true,
        minify: true
    }).pipe(gulp.dest('App'));
});
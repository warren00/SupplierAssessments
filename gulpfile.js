var gulp = require('gulp');
//var durandal = require('gulp-durandal');
var phonegapBuild = require('gulp-phonegap-build');

/*gulp.task('default', [function () {
    return durandal({
        baseDir: 'app',
        main: 'main.js',
        output: 'main-release.js',
        almond: true,
        minify: true
    }).pipe(gulp.dest('App'))},'phonegap-build']);*/

gulp.task('phonegap-build', function () {
    gulp.src('dist/**/*')
        .pipe(phonegapBuild({
            "isRepository": "false",
            "appId": "1135239",
            "user": {
                "token": "i5pLJvLsE3N_SWyCmy_R"
            },
            "keys": {
                ios: { "password": "bd15ag" },
                //android: { "key_pw": "foobar", "keystore_pw": "foobar" }
            },
            "download": {
                download: {
                    ios: 'ios.ipa',
                    android: 'android.apk'
                }
            }
        }));
});

gulp.task('default', ['phonegap-build']);
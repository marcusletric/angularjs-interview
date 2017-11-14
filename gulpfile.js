var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;
var $               = require('gulp-load-plugins')();
var runSequence     = require('run-sequence');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var Devutils = require('./dev/devutils.js');
var appPath = "app/";
var devutils = new Devutils('./');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./" + appPath
        }
    });
});

gulp.task('server', function(done) {
    return browserSync({
        server: {
            baseDir: './' + appPath
        }
    }, done);
});

gulp.task('default', ['devcompile', 'server'], function() {
    gulp.watch('styles/*.css', function(file) {
        if (file.type === "changed") {
            reload(file.path);
        }
    });
    gulp.watch(['./' + appPath + '**/*.html'], ['bs-reload']);
    gulp.watch(['./' + appPath + '**/*.js'], ['includeSrc', 'bs-reload']);
    gulp.watch(['./' + appPath + '**/*.scss'], ['sass']);
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('sass', function () {
    gulp.src(appPath + '!(_)*.scss')
        .pipe(concat('app.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(appPath + 'css'));
});

gulp.task('scripts', function() {
    return gulp.src(appPath + '**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('includeLib', function(){
    return gulp.src('./app/bower_components/**/*.min.js')
        .pipe(devutils.generateLibIncl());
});

gulp.task('includeSrc', function(callback) {
    gulp.src('./app/src/**/*.js')
        .pipe(devutils.generateIndex('./app')).on('finish', function () {
            devutils.doInclude('./app', callback);
        });
});

gulp.task('devscripts', function(cb) {
    runSequence('includeLib',
        'includeSrc',
        cb);
});

gulp.task('devcompile', function(cb) {
    runSequence('sass',
        'devscripts',
        cb);
});

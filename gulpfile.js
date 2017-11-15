var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;
var $               = require('gulp-load-plugins')();
var runSequence     = require('run-sequence');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var Devutils = require('./dev/devutils.js');
var karmaServer = require('karma').Server;
var templateCache = require('gulp-angular-templatecache');
var appPath = "app/";
var devutils = new Devutils('./');
var karmaRunner = new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    autoWatch: true
});

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

gulp.task('default', ['devcompile', 'server', 'unitTest'], function() {
    gulp.watch('styles/*.css', function(file) {
        if (file.type === "changed") {
            reload(file.path);
        }
    });
    gulp.watch(['./dev/**/*.html'], ['bs-reload']);
    gulp.watch(['./' + appPath + '**/*.html', './' + appPath + '**/*.js'], ['templateCache', 'bs-reload']);
    gulp.watch(['./' + appPath + '/*.scss', './' + appPath + '**/*.scss'], ['sass', 'bs-reload']);
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

gulp.task('unitTest', function () {
    karmaRunner.start();
});

gulp.task('templateCache', function () {
    return gulp.src(appPath + 'src/**/*.html')
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest(appPath + 'templateCache'));
});

gulp.task('includeLib', function(){
    return gulp.src(appPath + 'bower_components/**/*.min.js')
        .pipe(devutils.generateLibIncl());
});

gulp.task('includeSrc', function(callback) {
    gulp.src([appPath + 'src/**/*.js', '!' + appPath + 'src/**/*.spec.js', appPath + 'templateCache/**/*.js'])
        .pipe(devutils.generateIndex('./app')).on('finish', function () {
            devutils.doInclude('./app', callback);
        });
});

gulp.task('devscripts', function(cb) {
    runSequence(
        'includeLib',
        'includeSrc',
        cb);
});

gulp.task('devcompile', function(cb) {
    runSequence(
        'sass',
        'templateCache',
        'devscripts',
        cb);
});

var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var Stream = require('stream');
var fs = require('fs');

function Devutils(appPath){
    this.generateIndex = function(){

        var self = this;

        var stream = new Stream.Writable({objectMode:true});
        self.file = fs.createWriteStream(appPath + 'dev/templates/_includes.html');

        stream._write = function(file,encoding,callback){
            var pathParts = file.base.toString().match(/([^\/]+\/)/g);
            var relativeBase = pathParts[pathParts.length-1].replace(/\//g,'/');
            self.file.write(genScripTag( relativeBase + file.relative.toString().replace(/\//g,'/')) + '\n');
            callback();
        };

        return stream;
    };

    this.generateLibIncl = function(){
        var self = this;

        var stream = new Stream.Writable({objectMode:true});
        self.file = fs.createWriteStream(appPath + 'dev/templates/_lib.html');

        stream._write = function(file,encoding,callback){
            var pathParts = file.base.toString().match(/([^\/]+\/)/g);
            var relativeBase = pathParts[pathParts.length-1].replace(/\//g,'/');
            self.file.write(genScripTag( relativeBase + file.relative.toString().replace(/\//g,'/')) + '\n');
            callback();
        };

        return stream;
    };

    this.doInclude = function(destinationPath, callback){
        gulp.src([appPath + 'dev/templates/index.html'])
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest(destinationPath))
            .on('finish', callback);
    };


    function genScripTag(src){
        return  '  <script src="' + src + '"></script>';
    }
}

module.exports = Devutils;

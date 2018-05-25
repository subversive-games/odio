var gulp = require('gulp');
//var uglifyjs = require('uglify-js');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");

gulp.task('default', function (callback) {
    // place code for your default task here
    runSequence('default:concat','default:compress', callback);
});


gulp.task('default:concat', function () {
    return gulp.src('./src/*.js')
    .pipe(concat('odio.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default:compress', function (cb) {


    return pump([
            gulp.src('dist/odio.js'),
            uglify(),
            rename('odio.min.js'),
            gulp.dest('dist'),
            
        ]
        //cb
    );
});
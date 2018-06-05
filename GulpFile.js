var gulp = require('gulp');
//var uglifyjs = require('uglify-js');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");
var connect = require('gulp-connect');
var browserSync = require('browser-sync').create();

gulp.task('default', function (callback) {
    // place code for your default task here
    runSequence('default:concat','default:compress', callback);
});


gulp.task('default:concat', function () {
    return gulp.src('./src/**')
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



// gulp.task('dev:connect', function() {
//     connect.server({
//       root: './dist',
//       livereload: true
//     })
// });

// gulp.task('dev:reload', function() {
//     gulp.src('./dist/odio.js')
//     .pipe(connect.reload());
// });

gulp.task('dev:browserSync',['default'],  function(done) {
    browserSync.reload();
    done();
});


gulp.task('dev', ['default'],  function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('./src/**', ['dev:browserSync']);
    
});
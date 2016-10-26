var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    webserver = require('gulp-webserver');
    sass = require('gulp-sass');

var src = './components',
    dest = './builds/app',
    twbs = './node_modules/bootstrap-sass/assets',
    bsSelect = './node_modules/bootstrap-select/dist';

gulp.task('js', function(){
    return gulp.src( src + '/js/app.js' )
        .pipe(browserify({
            transform: 'reactify',
            debug: 'true'
        }))
        .on('error', function(err) {
            console.error('NOPE! ', err.message);
        })
        .pipe(gulp.dest( dest + '/js' ))
});

gulp.task('sass', function(){
    return gulp.src( src + '/sass/style.scss')
        .pipe( sass({
            style: 'expanded',
            includePaths:[
                twbs + '/stylesheets'
            ]
            }).on('error', sass.logError) )
        .pipe( gulp.dest( dest + '/css' ));
});

gulp.task('icons', function(){
    return gulp.src( twbs + '/fonts/bootstrap/**.*')
        .pipe( gulp.dest( dest + '/fonts/bootstrap' ));
});

gulp.task('html', function(){
    gulp.src( dest + '/**/*.html' );
});

gulp.task('watch', function(){
    gulp.watch( src + '/js/**/*.js', ['js']);
    gulp.watch( src + '/sass/**/*.scss', ['sass']);
    gulp.watch( src + '/sass/**/*.css', ['sass']);
    gulp.watch( dest + '/**/*.html', ['html']);
});

gulp.task('webserver', function(){
    gulp.src( dest + '/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['watch', 'html', 'js', 'sass', 'icons', 'webserver']);

var gulp = require('gulp');
var sass = require('gulp-sass');
//var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
//
var pathToSassFiles = "src/styles/sass/**/*.scss";
// var pathToCss = "src/styles";
 var pathToCssFiles  = "src/styles/**/*.css";

var paths = {
	styles: {
		src: 'src/styles/sass/**/*.scss'
		,dest: 'src/styles'
	}
	,html: {
		dir: '.'
		,index: 'home.html'
	}
};

function update_styles(){
	let stream =
	gulp.src(paths.styles.src)
		.pipe(sass())
		.pipe(gulp.dest(paths.styles.dest));
	return stream;
}
exports.update_styles = update_styles;

function update_styles_and_inject(){
	return update_styles().pipe(browserSync.stream());
}
exports.update_styles_and_inject = update_styles_and_inject;

function inject_styles(){
    return gulp.src(pathToCssFiles).pipe(browserSync.stream());
}
exports.inject_styles = inject_styles;


function reload(done){
    browserSync.reload();
    done();
}
exports.reload = reload;

function sync(){
	browserSync.init({
        server: ".",
        index: "home.html"
        // server: paths.html.dir,
        // index: paths.html.index
    });
    gulp.watch(paths.styles.src, update_styles_and_inject);
   // gulp.watch(pathToCssFiles, reload);
    gulp.watch("./*.html", reload);
}

exports.sync = sync;

// gulp.task('sync', function(){
//     // init нужен, чтобы обновление работало. Без интерпретатор не видит, к какому объекту применять функцию.
//     browserSync.init({
//         server: ".",
//         index: "home.html"
//     });
//     // gulp.watch(pathToCssFiles, browserSync.reload);
//     gulp.watch("./*.html", gulp.series(browserSync.reload));
// });


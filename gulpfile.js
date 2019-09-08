// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");
// css圧縮のためのプラグインの読み込み
const cleanCSS = require("gulp-clean-css");
// 画像ファイルの圧縮
const imagemin = require("gulp-imagemin");
// 元ディレクトリと指定ディレクトリの差分のみを対象とするプラグイン
const changed = require("gulp-changed");
// cssファイルをscssファイルに変換してインポートするプラグイン
const packageImporter = require('node-sass-package-importer');


// style.scssをタスクを作成する。
//gulp.task('タスク名', 実行される処理)
//タスク名と、実際に行われる処理を記述します。
//タスク名をdefaultにすると、タスク実行時のタスク名を省略できます。
//実行処理内にreturnを書くのを忘れないようにしましょう。
//タスク名をdefaultで指定すれば、npx gulpのみでタスクを実行できる。
//default以外の名前をつけた場合は、npx gulp (タスク名)で実行します。
gulp.task("sass", function() {
    const scssPath = "src/css/style.scss";
    return gulp.watch(scssPath, function() {
        // style.scssファイルを取得
        return (
            gulp.src(scssPath)
                // Sassのコンパイルを実行
                .pipe(
                    sass({
                        importer: packageImporter({
                            extensions: ['.scss', '.css']
                        }),
                        outputStyle: "expanded"
                    })
                        .on("error", sass.logError)//watchには必須。これがないと勝手に停止する
                )
                // cssを圧縮
                .pipe(cleanCSS())
                // cssフォルダー以下に保存
                .pipe(gulp.dest("dist/css"))
        );
    });
});

gulp.task("img", function() {
    const imgPathSrc = "src/img/**/*.+(jpg|jpeg|png|gif)"
    const imgPathDist = "dist/img";
    return gulp.watch(imgPathSrc, function() {
        // imgディレクトリ配下の全画像ファイルを取得
        return (
            gulp
                .src(imgPathSrc)
                // 画像の圧縮を実行
                .pipe(changed(imgPathDist))
                //差分のファイルのみを対象とするための処理
                .pipe(
                    imagemin([
                        imagemin.gifsicle({interlaced: true}),
                        imagemin.jpegtran({progressive: true}),
                        imagemin.optipng({optimizationLevel: 5})
                    ])
                )
                // imgフォルダー以下に保存
                .pipe(gulp.dest(imgPathDist))
        );
    });
});

//これでnpx gulpのみで監視して変更があれば処理を実行してくれる
gulp.task("default", 　gulp.series(gulp.parallel("sass", "img")));
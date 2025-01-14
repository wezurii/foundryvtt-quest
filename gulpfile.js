const gulp = require("gulp");
const less = require("gulp-less");
const esbuild = require("esbuild");
const esbuildSvelte = require("esbuild-svelte");

/* ----------------------------------------- */
/*  Compile LESS
/* ----------------------------------------- */

const QUEST_LESS = ["styles/*.less"];
function compileLESS() {
    return gulp
        .src("styles/simple.less")
        .pipe(less())
        .pipe(gulp.dest("./styles/"));
}
const css = gulp.series(compileLESS);

//Compile JS
async function buildCode() {
    return esbuild.build({
        entryPoints: ["./module/quest.js"],
        bundle: true,
        outfile: `./dist/quest.js`,
        sourcemap: true,
        minify: false,
        format: "esm",
        platform: "browser",
        plugins: [esbuildSvelte()],
        external: ["../assets/*"]
    });
}

const build = gulp.series(buildCode);
exports.build = build;

async function buildCodeMin() {
    return esbuild.build({
        entryPoints: ["./module/quest.js"],
        bundle: true,
        outfile: `./dist/quest.js`,
        sourcemap: true,
        minify: true,
        format: "esm",
        platform: "browser",
        plugins: [esbuildSvelte()],
        external: ["../assets/*"]
    });
}

const buildMin = gulp.series(buildCodeMin);
exports.buildMin = buildMin;

const STSTEM_JS = ["module/**/*.js", "module/*.js", "module/**/*.svelte"];

/* ----------------------------------------- */
/*  Watch Updates
/* ----------------------------------------- */

function watchUpdates() {
    gulp.watch(STSTEM_JS, build);
}

/* ----------------------------------------- */
/*  Export Tasks
/* ----------------------------------------- */

exports.default = gulp.series(watchUpdates, buildCode);
exports.css = css;

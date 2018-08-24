"use strict";
let gulp = require('gulp');
let ts = require("gulp-typescript")
let nodemon = require("gulp-nodemon");
gulp.task("default", ["serve"]);//create a default task and just log the message
gulp.task("watch", () => {//configure which files to watch and add the watch task to it
  gulp.watch('new docs/**/*.ts', ["compile"]);
});
gulp.task("compile", () => {//compiling the files from the source folder
  console.log("compiling files")
  return gulp.src(['new docs/**/*.ts'])
    .pipe(ts({ module: 'commonjs' })).js
    .pipe(gulp.dest('build'))
})
gulp.task("serve", ["compile", "watch"], () => {//start compiling the root file
  nodemon({
    script: "./server.js",
    env: { "NODE_ENV": "development" }
  })
    .on("restart", () => {
      console.log("restarted");
    })
})
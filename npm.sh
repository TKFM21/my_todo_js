#!/bin/sh

npm install browserify -D
npm install gulp -D
npm install gulp-clean-css -D
npm install gulp-sass -D
npm install gulp-imagemin -D
npm install gulp-changed -D
npm install node-sass-package-importer -D
npm install ress -S

mkdir -vp src/css
mkdir -vp src/img
mkdir -vp src/js/module
mkdir -vp dist/css
mkdir -vp dist/img
mkdir -vp dist/js/module

ls -l
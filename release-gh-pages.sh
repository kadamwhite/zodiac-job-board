#!/bin/bash

rm -rf dist
npm run build
cd dist/
git init
git remote add origin git@github.com:kadamwhite/zodiac-job-board.git
git add .
git commit -m 'Deploy!'
git branch -m gh-pages
git push -f origin gh-pages
cd ..
rm -rf dist

#!/bin/bash

#-----------------------------
# $1: examples/js/目录下的文件
# eg: sprite/video
#-----------------------------
useExample() {
    file=./examples/js/$1
    sed -i ''  's/^const app/\/\/&/' miniprogram/$file.js
    sed -i ''  's/^document.body/\/\/&/' miniprogram/$file.js

    sed -i ''  -E '/import "mywindow"/{n;d;}' miniprogram/game.js
    sed -i '' "/import \"mywindow\"/ a\\
import \"$file\"" miniprogram/game.js
}

CMD=$1
shift
case "$CMD" in
adapter)
    cd ../weapp-adapter && npm run build && cd - && \
    cp ../weapp-adapter/dist/weapp-adapter.js miniprogram/js/libs/;;
example) useExample $1;;
*) echo nothing;;
esac

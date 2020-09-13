#!/bin/bash

#-----------------------------
# $1: examples/js/目录下的文件
# eg: sprite/video
#-----------------------------
useExample() {
    file="./examples/js/$1"
    #sed -i ''  's/^const app/\/\/&/' miniprogram/$file.js
    #sed -i ''  's/^document.body/\/\/&/' miniprogram/$file.js
    # 范围内行数全部注释
    N1=`sed -n "/^const app/=" "miniprogram/$file.js"`
    N2=`sed -n "/^document.body/=" "miniprogram/$file.js"`
    if [ "$N1" != "" ]  && [ "$N2" != "" ]; then
        sed -i '' "$N1,$N2 s/^/\/\//" "miniprogram/$file.js"
    fi
    sed -i ''  -E '/import "mywindow"/{n;d;}' miniprogram/game.js
    sed -i '' "/import \"mywindow\"/ a\\
import \"$file\"" miniprogram/game.js
}

CMD=$1
shift
case "$CMD" in
adapter) # 重新编译weapp-adapter，并拷贝到该项目里
    cd ../weapp-adapter && npm run build && cd - && \
    cp ../weapp-adapter/dist/weapp-adapter.js miniprogram/js/libs/;;
example) useExample "$1";;
*) echo nothing;;
esac

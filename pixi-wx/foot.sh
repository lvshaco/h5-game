#!/bin/bash

CMD=$1
case "$CMD" in
adapter)
    cd ../weapp-adapter && npm run build && cd - && \
    cp ../weapp-adapter/dist/weapp-adapter.js miniprogram/js/libs/;;
*) echo nothing;;
esac

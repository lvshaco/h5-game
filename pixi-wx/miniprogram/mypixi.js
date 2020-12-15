/*
由于window.PIXI赋值语句会被调整顺序在import之后(有些情况？)
单独一个文件设置window.PIXI可以保证import本文件之后的import可以使用window.PIXI
*/
//window.PIXI = require('./js/libs/pixi')
import PIXI from "./js/libs/pixi"
window.PIXI = PIXI
window.__filters = PIXI.filters
import './js/libs/weapp-adapter'
import './js/libs/symbol'
import * as PIXI from "./js/libs/pixi"
import "./js/libs/unsafe-eval"
//install(PIXI)
//Create a Pixi Application
console.log("windows")
console.log(window.WebGLRenderingContext)
const {pixelRatio, windowWidth, windowHeight} = wx.getSystemInfoSync()
let app = new PIXI.Application({
    width: windowWidth * pixelRatio, 
    height: windowHeight * pixelRatio, 
    view: canvas
});
////Add the canvas that Pixi automatically created for you to the HTML document
////document.body.appendChild(app.view);
var bg = PIXI.Sprite.from('images/bg.jpg')
bg.interactive = true
bg.on('pointerdown', ev => {
    bg.visible = false
})
app.stage.addChild(bg)
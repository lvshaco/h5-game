import {Document} from "./js/libs/xmldom/dom"
window.XMLDocument = Document
window.log = console.log
//console.log("=======")
//console.log(window.XMLDocument)
//console.log("windows")
//console.log(window.WebGLRenderingContext)
const {pixelRatio, windowWidth, windowHeight, screenWidth, screenHeight} = wx.getSystemInfoSync()
console.log("pixelRatio", pixelRatio, "windowWidth", windowWidth, "windowHeight", windowHeight, screenWidth, screenHeight)
let app = new PIXI.Application({
    width: windowWidth * pixelRatio,
    height: windowHeight * pixelRatio,
    backgroundColor: 0x061639,
    view: canvas,
    //transparent: true,
});
console.log(app.renderer.plugins)
window.app = app

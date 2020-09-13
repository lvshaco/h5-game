window.XMLDocument = require("./js/libs/xmldom/dom.js").Document;
//console.log("=======")
//console.log(window.XMLDocument)
//console.log("windows")
//console.log(window.WebGLRenderingContext)
const {pixelRatio, windowWidth, windowHeight} = wx.getSystemInfoSync()
let app = new PIXI.Application({
    width: windowWidth * pixelRatio, 
    height: windowHeight * pixelRatio, 
    backgroundColor: 0x061639,
    view: canvas
});
window.app = app
console.log("========= document =======")
console.log(document)
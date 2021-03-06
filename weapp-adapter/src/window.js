import Canvas from './Canvas'

export document from './document'
export navigator from './navigator'
export XMLHttpRequest from './XMLHttpRequest'
export WebSocket from './WebSocket'
export Image from './Image'
export Audio from './Audio'
export FileReader from './FileReader'
export HTMLElement from './HTMLElement'
export HTMLImageElement from './HTMLImageElement'
export HTMLCanvasElement from './HTMLCanvasElement' 
export HTMLVideoElement from './HTMLVideoElement'
export WebGLRenderingContext from './WebGLRenderingContext'
export { TouchEvent, MouseEvent } from './EventIniter/index.js'
export localStorage from './localStorage'
export location from './location'
export * from './WindowProperties'

// 暴露全局的 canvas
//const canvas = new Canvas()
GameGlobal.screencanvas = GameGlobal.screencanvas || new Canvas()
const canvas = GameGlobal.screencanvas

export { canvas }
export { setTimeout }
export { setInterval }
export { clearTimeout }
export { clearInterval }
export { requestAnimationFrame }
export { cancelAnimationFrame }

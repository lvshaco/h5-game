//const uxStage = new PUXI.Stage({
//  width: 512,
//  height: 512
//});
//
//app.stage.addChild(uxStage);
//
//uxStage.addChild(new PUXI.Button({
//  text: "Hello world!"
//}));
//
//uxStage.addChild(new PUXI.Text({
//  value: "Click me!"
//}).setLayoutOptions({
//  new PUXI.FastLayoutOptions({
//     width: PUXI.LayoutOptions.WRAP_CONTENT, // width
//     height: 60, // height
//     x: .5, y: .5, // x, y (center)
//     anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR // properly center
//  })
//}).setPadding(4, 6) // horizontal/vertical padding
//    .setBackground(0xffaabb) // background color (can use a PIXI.Graphics too)
//    .setBackgroundAlpha(.5) // alpha for background
//    .setElevation(2) // drop-shadow on background!
//);
const uxStage = new PUXI.Stage(1000, 1000)
let button = new PUXI.Button({
  text: "Hello world!"
});
button.setBackground(0xff);
button.setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 300,
            height: 200,
            x: 10,
            y: 10
        }));
//button.interactive = true
//button.eventBroker.click.rightMouseButton = true
//console.log("2----------------", button.width, button.height)
//console.log(button.insetContainer.interactive, button.insetContainer.width, button.insetContainer.height)
button.on("click",  function(args) {
  console.log("click ====", args)
})
uxStage.addChild(button);
app.stage.addChild(uxStage);
console.log("children =====================")
for (var i in button.insetContainer.children) {
  var c = button.insetContainer.children[i]
  console.log(i, c.width, c.height)
}
console.log("============= button size", button.width, button.height)
// ---------------------------
var c1 = new PIXI.Container()
c1.x = 10
c1.y = 400
c1.interactive = true
c1.on("touchstart", function(args) {
  console.log("c1 touchstart:")
  //console.log(args)
})
console.log("================ c1 events")
console.log(c1._events)
var bg = new PIXI.Graphics()
        .beginFill(0xff)
        .drawRect(0, 0, 1, 1)
        .endFill();
bg.width = 100
bg.height = 200
c1.addChild(bg)
app.stage.addChild(c1)

//touch按整个屏幕
app.renderer.plugins.interaction.on('touchstart', (e) => {
    console.log("app touchstart")
})
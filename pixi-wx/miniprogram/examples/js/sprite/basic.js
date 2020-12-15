//const app = new PIXI.Application({ backgroundColor: 0x1099bb });
//document.body.appendChild(app.view);

// create a new Sprite from an image path
const bunny = PIXI.Sprite.from('examples/assets/bunny.png');
const spr = PIXI.Sprite.from('examples/assets/tilemask.png');

// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;
spr.x = bunny.x - 150
spr.y = bunny.y - 150
bunny.scale.set(5, 5)
app.stage.addChild(bunny);
app.stage.addChild(spr);

// Listen for animate update
app.ticker.add((delta) => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    //    bunny.rotation += 0.1 * delta;
});

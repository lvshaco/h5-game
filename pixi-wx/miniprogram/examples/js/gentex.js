function drawTex(x, size, row, col) {
    let seed, R, i, j, pass, s, X, Y;
    seed = Date.now(); // seed for random generaton, can be replaced with hardcoded value
    x.lineWidth = 2; // set 2 pixel wide line width to make the black outline
    R = () => (Math.sin(++s + i * i) + 1) * 1e9 % 256 | 0; // get a seeded random integer between 0-256

    for (i = row * col; i--;) {
        for (pass = 4; pass--;) {
            for (s = seed, j = R() / 5 + 50 | 0; j--;) {
                X = j & 7, Y = j >> 3, // X & Y pixel index in sprite
                R() < 19 ? // small chance of new color
                    x.fillStyle = `rgb(${R()},${R()},${R()})` : // randomize color
                    R() ** 2 / 2e3 > X * X + (Y - 5) ** 2 && // distance from center vs random number
                    x[pass & 2 ? 'strokeRect' : 'fillRect']( // stroke first for outline then fill with color
                        7 + i % col * 16 - pass % 2 * 2 * X + X, // x pos, flipped if pass is even
                        2 + (Math.floor(i/col)) * 16 + Y, // y pos
                        1, 1);
            }
        }
    } // 1 pixel size
}
const SCALE = 6
const SIZE = 16

function createTex() {
    var w = Math.floor(app.screen.width/SCALE)
    var h = Math.floor(app.screen.height/SCALE)

    const row = Math.floor(h/SIZE)
    const col = Math.floor(w/SIZE)
    w = col*SIZE
    h = row*SIZE

    const canvas = document.createElement('canvas');
    canvas.width = w
    canvas.height = h

    console.log("w", w, "h", h, "row", row, "col", col)

    const ctx = canvas.getContext('2d');
    drawTex(ctx, SIZE, row, col)

    const tex = PIXI.Texture.from(canvas);
    tex.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
    return tex
}

const tex = createTex();
console.log(tex.width, tex.height)
const sprite = new PIXI.Sprite(tex);
sprite.scale.set(SCALE, SCALE)
console.log(sprite.width, sprite.height)
const x = (app.screen.width-sprite.width)/2
const y = (app.screen.height-sprite.height)/2
console.log(x, y)
sprite.position.set(x, y);
console.log(sprite.width, sprite.height)
console.log(app.screen.width, app.screen.height)
//sprite.width = 500;
//sprite.height = 50;
app.stage.addChild(sprite);

//app.stage.on("touchstart", (e) => function() {
app.renderer.plugins.interaction.on('touchstart', (e) => {
    console.log("touchstart")
    sprite.texture = createTex()
})
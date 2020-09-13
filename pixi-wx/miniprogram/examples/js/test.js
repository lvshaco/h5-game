//app.renderer.backgroundColor = 0x061639
////Add the canvas that Pixi automatically created for you to the HTML document
//document.body.appendChild(app.view);
/*
PIXI.Loader.shared
//app.loader
    .add("bg", "images/bg.jpg")
    .load(setup)

function setup(loader, resources) {
    var bg = new PIXI.Sprite(resources.bg.texture)
    //bg.interactive = true
    //bg.on('pointerdown', ev => {
    //    bg.visible = false
    //})
    app.stage.addChild(bg)
}


// load the texture we need
app.loader.add('bunny', 'images/bunny.png').load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    const bunny = new PIXI.Sprite(resources.bunny.texture);
    bunny.interactive = true
    bunny.on('pointerdown', ev => {
        bunny.visible = false
    })

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny);

    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
    });
});
var bg = PIXI.Sprite.from('images/bg.jpg');
bg.interactive = true
bg.on('pointerdown', ev => {
    bg.visible = false
})
app.stage.addChild(bg)


const container = new PIXI.Container();

app.stage.addChild(container);

// Create a new texture
const texture = PIXI.Texture.from('images/bunny.png');
// Create a 5x5 grid of bunnies
for (let i = 0; i < 25; i++) {
    const bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    container.addChild(bunny);
}

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;
});
*/
/*
app.loader.add('atlas', 'basic/atlas.json');
app.loader.load(function(loader, resources) {
	var tilemap = new PIXI.tilemap.CompositeRectTileLayer(0, [resources['atlas_image'].texture]);
    var size = 32;
    // bah, im too lazy, i just want to specify filenames from atlas
    for (var i=0;i<7;i++)
        for (var j=0;j<7;j++) {
            tilemap.addFrame("grass.png", i*size, j*size);
            if (i%2==1 && j%2==1)
                tilemap.addFrame("tough.png", i*size, j*size);
        }

    // if you are lawful citizen, please use textures from the loader
    var textures = resources.atlas.textures;
    tilemap.addFrame(textures["brick.png"], 2*size, 2*size);
    tilemap.addFrame(textures["brick_wall.png"], 2*size, 3*size);

    app.render(tilemap);
});
*/

const frag = `
      precision mediump float;
      uniform sampler2D map, tiles;
      uniform vec2 mapSize, tileSize;
      varying vec2 uv;
      void main() {
        vec2 tileCoord = floor(255.0 * texture2D(map, floor(uv) / mapSize).ra);
        gl_FragColor = texture2D(tiles, (tileCoord + fract(uv)) / tileSize);
      }`

const vert = `
      precision mediump float;
      attribute vec2 position;
      uniform vec4 view;
      varying vec2 uv;
      void main() {
        uv = mix(view.xw, view.zy, 0.5 * (1.0 + position));
        gl_Position = vec4(position, 1, 1);
      }`

const parseMap = (map) =>
{
    var data = [];
    let count = 0;

    for (var i = 0; i < map.length; i++)
    {
        for (var j = 0; j < map[i].length; j++)
        {
            data[count++] = map[i][j][0];
            data[count++] = 0
            data[count++] = 0;
            data[count++] = map[i][j][1];
        }
    }

    return new Uint8Array( data )
}

const jsonPath = 'images/map.json'//'http://192.168.99.100:8089/images/map.json'//'https://regl-project.github.io/regl/www/gallery/assets/map.json'
const tilePath = 'images/tiles.png'//'https://regl-project.github.io/regl/www/gallery/assets/tiles.png'

const loader = new PIXI.Loader()
.add([jsonPath, tilePath])
.load((out)=>{


    const mapData = out.resources[jsonPath].data;
    const mapWidth = mapData[0].length;
    const mapHeight =  mapData.length;

    const map = PIXI.BaseTexture.fromBuffer(  parseMap(mapData) , mapWidth, mapHeight );

    const tiles = PIXI.Texture.from(tilePath);

    tiles.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    tiles.baseTexture.mipmap = false;

    // make a shader..
    const shader = PIXI.Shader.from(vert, frag, {
        map,
        tiles,
        tileSize: [16.0, 16.0],
        mapSize: [16.0, 16.0],
        view:[0,0,0,0]
    })

    // make a geometry..
    const geometry = new PIXI.Geometry()
    .addAttribute('position', [ -1, -1, 1, -1, -1, 1, 1, 1, -1, 1, 1, -1 ]);

    const tileMesh = new PIXI.Mesh(geometry, shader);

    // done.. add it to stage!
    app.stage.addChild(tileMesh);

    // add some movement..
    let x = 0;
    let y = 0;

    app.stage.interactive = true;

    app.stage.mousemove = e => {
        x = e.data.global.x * 0.5;
        y = e.data.global.y * 0.6;
    }

    // update tick..
    app.ticker.add(()=>{

        const boxX = mapWidth * x / app.screen.width
        const boxY = mapHeight * y / app.screen.height
        const boxH = 10
        const boxW = app.screen.width / app.screen.height * boxH

        shader.uniforms.view = [boxX - 0.5 * boxW,
                                boxY - 0.5 * boxH,
                                boxX + 0.5 * boxW,
                                boxY + 0.5 * boxH]

    })

    app.renderer.resize(window.innerWidth, window.innerHeight);
});

// resize with logo..
//window.addEventListener('resize', ()=>{

  //  app.renderer.resize(window.innerWidth, window.innerHeight);
//});

//document.body.appendChild(app.renderer.view);
//document.body.style.margin = 0;

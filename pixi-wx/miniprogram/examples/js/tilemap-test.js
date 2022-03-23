app.loader
.add('atlas', 'basic/atlas.json')
.load(function(loader, resources) {
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
    app.stage.addChild(tilemap)
//    app.renderer.render(tilemap);
    tilemap.interactive = true
    tilemap.hitArea = new PIXI.Rectangle(0, 0, 7*32, 7*32)
    tilemap.touchstart = function(event) {
        log("touchstart")
    }
    let spr = new PIXI.Sprite(resources['atlas_image'].texture)
    //app.stage.addChild(spr)
    spr.interactive = true
    spr.touchstart = function(event) {
        log("touchstart spr")
    }
    log(spr.getBounds())
    log(tilemap.getBounds())
});
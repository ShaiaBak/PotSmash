Preload = {
	preload: function() {

		//load game assets
		this.load.tilemap('level1', 'assets/tileset/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level2-1', 'assets/tileset/level2-1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level2-2', 'assets/tileset/level2-2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles-lvl-1', 'assets/img/tiles-lvl1-32x32.png');
		this.load.image('gameTiles-lvl-2_1', 'assets/img/tiles-lvl2-1-32x32.png');
		this.load.image('gameTiles-lvl-2_2', 'assets/img/tiles-lvl2-2-32x32.png');
		// this.load.image('gameTilesTemp', 'assets/img/tileset-placeholder2.png');
		// this.load.image('testpot', 'assets/img/1_barrel-32x32.png');
		this.load.image('invisibleBlock', 'assets/img/trans-1x1.png');
		this.load.image('compass', 'assets/img/compass_rose.png');
		this.load.image('touch_segment', 'assets/img/touch_segment.png');
		this.load.image('touch', 'assets/img/touch.png');
		this.load.image('mega_grid', 'assets/img/sprites/mega-placeholder.png', 32, 32);

		// spritesheets
		this.load.spritesheet('item', 'assets/img/sprites/mega-placeholder.png',  32, 32);
		this.load.spritesheet('player', 'assets/img/sprites/char_0_spritesheet_v2.png',  64, 64);
		this.load.spritesheet('potSprite_1', 'assets/img/sprites/1_barrel_breaking_sprite-32x32.png', 32, 32);
		this.load.spritesheet('chestSprite', 'assets/img/sprites/2_2_chest_open.png', 128, 192);

		// audio
		game.load.audio('sfx_pot1', [ 'assets/audio/soundFX/sfx_potsounds_01.mp3', 
			'assets/audio/soundFX/sfx_potsounds_01.ogg' ]);
		game.load.audio('sfx_obj1', [ 'assets/audio/soundFX/sfx_objectsounds_01.mp3', 
			'assets/audio/soundFX/sfx_objectsounds_01.ogg' ]);
	},
	create: function() {
		this.state.start('StartMenu');
	}
};
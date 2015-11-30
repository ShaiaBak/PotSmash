Preload = {
	preload: function() {

		//load game assets
		this.load.tilemap('level1', 'assets/tileset/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles', 'assets/img/tiles-lvl1-32x32.png');
		// this.load.image('gameTilesTemp', 'assets/img/tileset-placeholder2.png');
		this.load.spritesheet('item', 'assets/img/player.png',  64, 64);
		this.load.spritesheet('player', 'assets/img/char_spritesheet_walk-v01.png',  64, 64);
		this.load.spritesheet('potSprite_1', 'assets/img/barrel_breaking_sprite-32x32.png', 32, 32);
		// this.load.image('testpot', 'assets/img/1_barrel-32x32.png');
		this.load.image('compass', 'assets/img/compass_rose.png');
		this.load.image('touch_segment', 'assets/img/touch_segment.png');
		this.load.image('touch', 'assets/img/touch.png');
		this.load.image('mega_grid', 'assets/img/player.png', 32, 32);
	},
	create: function() {
		this.state.start('StartMenu');
	}
};
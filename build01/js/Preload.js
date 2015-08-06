Preload = {
	preload: function() {

		//load game assets
		this.load.tilemap('level1', 'assets/tileset/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles', 'assets/img/tileset-placeholder2.png');
		this.load.spritesheet('player', 'assets/img/mega-player.png',  30, 30);
		this.load.image('testpot', 'assets/img/barrel64x64.png');
		this.load.image('compass', 'assets/img/compass_rose.png');
		this.load.image('touch_segment', 'assets/img/touch_segment.png');
		this.load.image('touch', 'assets/img/touch.png');

	},
	create: function() {
		this.state.start('StartMenu');
	}
};
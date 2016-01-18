Preload = {
	preload: function() {

		this.lanternLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 30, 'lanternLogo');
		this.lanternLogo.anchor.setTo(0.5);

		// this.preloadBar = this.add.sprite(this.game.world.centerX - 55, this.game.world.centerY + 42, 'loadBar');
		// this.load.setPreloadSprite(this.preloadBar);

		this.preloadBar = this.add.sprite(this.game.world.centerX - 70, this.game.world.centerY + 42, 'loadBar');
		this.load.setPreloadSprite(this.preloadBar);

		//start screen assets
		game.load.image('startBG-placeholder', 'assets/img/startMenu/screen.png');
		game.load.image('startBG', 'assets/img/startMenu/background.png');
		game.load.image('startOverlay', 'assets/img/startMenu/overlay.png');
		game.load.image('startUnderlay', 'assets/img/startMenu/underlay.png');
		game.load.image('titleLogo', 'assets/img/startMenu/startscreen_title.png');

		this.load.spritesheet('playerStartMenu', 'assets/img/sprites/player/characterstart2.png',  136, 136);
		this.load.spritesheet('startPot1', 'assets/img/startMenu/pots/start-pot1.png',  256, 256);
		this.load.spritesheet('startPot2', 'assets/img/startMenu/pots/start-pot2.png',  256, 256);
		this.load.spritesheet('startPot3', 'assets/img/startMenu/pots/start-pot3.png',  256, 256);
		this.load.spritesheet('startPot4', 'assets/img/startMenu/pots/start-pot4.png',  256, 256);
		this.load.spritesheet('startPot5', 'assets/img/startMenu/pots/start-pot5.png',  256, 256);
		this.load.spritesheet('startPot6', 'assets/img/startMenu/pots/start-pot6.png',  256, 256);
		this.load.spritesheet('startPot7', 'assets/img/startMenu/pots/start-pot7.png',  256, 256);
		this.load.spritesheet('startPot8', 'assets/img/startMenu/pots/start-pot8.png',  256, 256);

		// credit scene assets
		game.load.image('creditsBG', 'assets/img/startMenu/evening.png');
		this.load.spritesheet('characterEnd', 'assets/img/sprites/player/characterEnd.png',  136, 136);
		this.load.spritesheet('characterEnd2', 'assets/img/sprites/player/characterEnd2.png',  94, 128);

		// map screen
		game.load.image('map', 'assets/img/mapScreen/map.png');
		game.load.image('bgMap', 'assets/img/mapScreen/mapbg.png');
		game.load.image('house1', 'assets/img/mapScreen/house1.png');
		game.load.image('house2', 'assets/img/mapScreen/house2.png');
		game.load.image('house3', 'assets/img/mapScreen/house3.png');

		//load game assets
		this.load.tilemap('level1', 'assets/tileset/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level2-1', 'assets/tileset/level2-1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level2-2', 'assets/tileset/level2-2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level3-1', 'assets/tileset/level3-1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level3-2', 'assets/tileset/level3-2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level3-3', 'assets/tileset/level3-3.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level3-1-end', 'assets/tileset/level3-1-end.json', null, Phaser.Tilemap.TILED_JSON);

		this.load.image('gameTiles-lvl-1', 'assets/img/tiles-lvl1-32x32.png');
		this.load.image('gameTiles-lvl-2_1', 'assets/img/tiles-lvl2-1-32x32.png');
		this.load.image('gameTiles-lvl-2_2', 'assets/img/tiles-lvl2-2-32x32.png');
		this.load.image('gameTiles-lvl-3_1', 'assets/img/tiles-lvl3-1-32x32.png');
		this.load.image('gameTiles-lvl-3_2', 'assets/img/tiles-lvl3-2-32x32.png');
		this.load.image('gameTiles-lvl-3_3', 'assets/img/tiles-lvl3-3-32x32.png');
		this.load.image('invisibleBlock', 'assets/img/trans-1x1.png');
		this.load.image('compass', 'assets/img/compass_rose.png');
		this.load.image('touch_segment', 'assets/img/touch_segment.png');
		this.load.image('touch', 'assets/img/touch.png');
		this.load.image('mega_grid', 'assets/img/sprites/mega-placeholder.png', 32, 32);
		this.load.spritesheet('gems', 'assets/img/sprites/items/gems.png', 32, 32);
		this.load.spritesheet('item-boot', 'assets/img/sprites/items/boot.png',  32, 32);
		this.load.spritesheet('pizza', 'assets/img/sprites/items/pizza.png',  64, 64);

		// spritesheets
		this.load.spritesheet('player', 'assets/img/sprites/player/char_0_spritesheet_v4.png',  64, 64);
		this.load.spritesheet('npc', 'assets/img/sprites/player/char_1_spritesheet.png',  64, 64);
		this.load.spritesheet('chestSprite', 'assets/img/sprites/terrain/2_2_chest_open.png', 128, 192);
		this.load.spritesheet('shake-statue', 'assets/img/sprites/3_1_statue_shake.png', 64, 192);

		this.load.spritesheet('potSprite_1', 'assets/img/sprites/pots/1_barrel_breaking_sprite-32x32.png', 32, 32);
		this.load.spritesheet('potSprite_2-1a', 'assets/img/sprites/pots/2_1a_pots_breaking-32x32.png', 32, 32);
		this.load.spritesheet('potSprite_2-1b', 'assets/img/sprites/pots/2_1b_pots_breaking-32x32.png', 32, 32);
		this.load.spritesheet('potSprite_2-2', 'assets/img/sprites/pots/2_2_pots_breaking32x32.png', 32, 32);
		this.load.spritesheet('potSprite_3-1', 'assets/img/sprites/pots/3_pots_breaking2-32x32.png', 32, 32);
		this.load.spritesheet('potSprite_3-2', 'assets/img/sprites/pots/3_pots_breaking3-32x32.png', 32, 32);
		this.load.spritesheet('potSprite_3-3-heavy', 'assets/img/sprites/pots/3_pots_heavy-32x32.png', 32, 32);

		// audio
		game.load.audio('sfx_pot1', [ 'assets/audio/soundFX/sfx_potsounds_01.mp3', 
			'assets/audio/soundFX/sfx_potsounds_01.ogg' ]);
		game.load.audio('sfx_obj1', [ 'assets/audio/soundFX/sfx_objectsounds_01.mp3', 
			'assets/audio/soundFX/sfx_objectsounds_01.ogg' ]);
		game.load.audio('music1', [ 'assets/audio/music/music1-1.mp3', 
			'assets/audio/music/music1-1.ogg' ]);
		game.load.audio('musicIntro', [ 'assets/audio/music/intro-music-v1.mp3']);
	},
	create: function() {
		this.state.start('StartMenu');
	}
};
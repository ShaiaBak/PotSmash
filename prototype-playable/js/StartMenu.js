var menuText;
var keySpace;
var player;
var title;
var panComplete = false;
var titleComplete = false;
var screenFlash;
var flashed = false;
var startPotGroup;

var StartMenu = {
	create: function() {
		game.stage.backgroundColor = '#000';

		bgLayer1 = game.add.image(this.game.world.centerX, this.game.world.height + 250, 'startBG');
		bgLayer1.anchor.set(0.5, 1);
		bgLayer1.smoothed = false;

		bgLayer2 = game.add.image(this.game.world.centerX, this.game.world.height + 150, 'startUnderlay');
		bgLayer2.anchor.set(0.5, 1);
		bgLayer2.smoothed = false;

		bgLayer3 = game.add.image(this.game.world.centerX, this.game.world.height, 'startOverlay');
		bgLayer3.anchor.set(0.5, 1);
		bgLayer3.smoothed = false;

		title = game.add.sprite(0, 0, 'titleLogo');
		title.alpha = 0;

		startPot1 = bgLayer3.addChild(game.make.sprite(90, -530, 'startPot1', 5));
		startPot2 = bgLayer3.addChild(game.make.sprite(140, -460, 'startPot2', 5));
		startPot3 = bgLayer3.addChild(game.make.sprite(130, -400, 'startPot3', 5));
		startPot4 = bgLayer3.addChild(game.make.sprite(140, -520, 'startPot4', 5));

		player = bgLayer3.addChild(game.make.sprite(70, -500, 'playerStartMenu', 5));

		startPot5 = bgLayer3.addChild(game.make.sprite(20, -450, 'startPot5', 5));
		startPot6 = bgLayer3.addChild(game.make.sprite(0, -400, 'startPot6', 5));
		startPot7 = bgLayer3.addChild(game.make.sprite(100, -390, 'startPot7', 5));
		startPot8 = bgLayer3.addChild(game.make.sprite(40, -380, 'startPot8', 5));

		startPot1.alpha = 0;
		startPot2.alpha = 0;
		startPot3.alpha = 0;
		startPot4.alpha = 0;
		startPot5.alpha = 0;
		startPot6.alpha = 0;
		startPot7.alpha = 0;
		startPot8.alpha = 0;

		startPot1.scale.set(0.5);
		startPot2.scale.set(0.5);
		startPot3.scale.set(0.5);
		startPot4.scale.set(0.5);
		startPot5.scale.set(0.5);
		startPot6.scale.set(0.5);
		startPot7.scale.set(0.5);
		startPot8.scale.set(0.5);
		// console.log(player.x + player.y);

		screenFlash = game.add.graphics(0, 0);
		screenFlash.beginFill(0xFFFFFF, 1);
		screenFlash.drawRect(0, 0, this.game.width, this.game.height);
		screenFlash.alpha = 0;
		screenFlash.endFill();

		// player = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playerStartMenu', 5);
		player.smoothed = false;
		player.animations.add('windIdle', [0,1,2,3], 8, true);
		game.world.bringToTop(player);

		var menuStyle = {font: "16px Courier", fill: "#ffffff" };
		var subStyle = {font: "12px Courier", fill: "#ffffff" };

		menuText = this.game.add.text(0, 0, startInstruct, menuStyle);
		menuText.alpha = 0;
		// menuText.anchor.set(0.5);
		// subText = this.game.add.text(0, 0, "Start", subStyle);
		// subText.anchor.set(0.5);

		keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
		key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
		key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
		key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
		key8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
		key9 = game.input.keyboard.addKey(Phaser.Keyboard.NINE);

		introMusic = game.add.audio('musicIntro');
		introMusic.onDecoded.add(function() {
			introMusic.play();
		});
	},

	update: function() {

		// subText.x = Math.floor(Math.floor(game.world.width/2));
		// subText.y = Math.floor(Math.floor(game.world.height/2+20));
		introMusic.onDecoded.add(function() {
			// key1.onDown.add(function(key) {
			// 	introMusic.stop();
			// 	game.state.start('Credits',true,false);
			// });

			// key2.onDown.add(function(key) {
			// 	introMusic.stop();
			// 	game.state.start('Level2-1',true,false);
			// });

			// key3.onDown.add(function(key) {
			// 	introMusic.stop();
			// 	game.state.start('Level2-2',true,false);
			// });
			// key4.onDown.add(function(key) {
			// 	introMusic.stop();
			// 	game.state.start('Level3-1',true,false);
			// });
			// key5.onDown.add(function(key) {
			// 	introMusic.stop();
			// 	game.state.start('Level3-2',true,false);
			// });
			// key6.onDown.add(function(key) {
			// 	introMusic.stop();
			// 	game.state.start('Level3-3',true,false);
			// });
			// key7.onDown.add(function(key) {
			// 	introMusic.stop();
			// 	game.state.start('Level3-End',true,false);
			// });

			// key8.onDown.add(function(key) {
			// 	introMusic.stop();
			// 	game.state.start('Level2Start',true,false);
			// });
			// key9.onDown.add(function(key) {
			// 	introMusic.stop();
			// 	game.state.start('Level3Start',true,false);
			// });
		});


		player.animations.play('windIdle');

		// game.time.events.add(2250, function(){
		// introMusic.onDecoded.add(function() {

		game.time.events.add(2250, function(){
			if(bgLayer3.y < 620) {
				bgLayer1.y += 0.1;
				bgLayer2.y += 0.25;
				bgLayer3.y += 0.5;
			}
		});

		introMusic.onDecoded.add(function() {
			keySpace.onDown.add(function(key) {
				if(panComplete == false ) {
					bgLayer1.y = 640;
					bgLayer2.y = 610;
					bgLayer3.y = 620;
					startPot1.alpha = 1;
					startPot2.alpha = 1;
					startPot3.alpha = 1;
					startPot4.alpha = 1;
					startPot5.alpha = 1;
					startPot6.alpha = 1;
					startPot7.alpha = 1;
					startPot8.alpha = 1;
					titleComplete = true;
					title.alpha = 1;
					menuText.alpha = 1;
				} else if(panComplete == true && titleComplete == true) {
					introMusic.stop();
					game.state.start('Level1');
				}
			}, this);
		});

		if(bgLayer3.y >= 620) {
			panComplete = true;
		}

		menuText.x = Math.floor(Math.floor(game.world.width/4));
		menuText.y = Math.floor(Math.floor(game.world.height - 120));

		if(panComplete == true && titleComplete == false) {
			game.time.events.add(500, function(){
				if(flashed == false) {
					screenFlash.alpha = 1;
					title.alpha = 1;
					menuText.alpha = 1;
					flashed = true;
				}
			});
			if(flashed == true) {
				startPot1.alpha = 1;
				startPot2.alpha = 1;
				startPot3.alpha = 1;
				startPot4.alpha = 1;
				startPot5.alpha = 1;
				startPot6.alpha = 1;
				startPot7.alpha = 1;
				startPot8.alpha = 1;
				game.add.tween(screenFlash).to( { alpha: 0 }, 150, "Linear", true);
				titleComplete = true;
			}
		}

		introMusic.volume = 0.3;

	},

	textFlash: function() {
		// if(menuText.alpha == 1) {
		// 	menuText.alpha = 0;
		// } else if(menuText.alpha == 0) {
		// 	menuText.alpha = 1;
		// }
	},

	render: function() {
		// game.debug.geom(screenFlash,'#ffffff');
	}
}
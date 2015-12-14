var menuText;
var keySpace;
var player;
var title;
var titleComplete = false;
var screenFlash;
var flashed = false;

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

		title = game.add.sprite(40, -25, 'titleLogo');
		title.alpha = 0;

		startPot = bgLayer3.addChild(game.make.sprite(120, -500, 'startHoneyPot', 5));
		startPot.scale.setTo(0.5, 0.5);
		startPot.alpha = 0;
		startPot.smoothed = false;
		player = bgLayer3.addChild(game.make.sprite(70, -500, 'playerStartMenu', 5));
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

    	// bgLayer1.x += bgLayer1.width;
    	// bgLayer1.y = bgLayer1.height/2;

		var menuStyle = {font: "16px Courier", fill: "#ffffff" };
		var subStyle = {font: "12px Courier", fill: "#ffffff" };

		menuText = this.game.add.text(0, 0, "Tap or press SPACE", menuStyle);
		subText = this.game.add.text(0, 0, "Start", subStyle);
		subText.anchor.set(0.5);
		menuText.anchor.set(0.5);

		keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
		key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
		key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
		key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
		key8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);

		// console.log(bgLayer1.y);
		// console.log(this.game.world.height);
	},

	update: function() {
		menuText.x = Math.floor(Math.floor(game.world.width/2));
		menuText.y = Math.floor(Math.floor(game.world.height/2));

		subText.x = Math.floor(Math.floor(game.world.width/2));
		subText.y = Math.floor(Math.floor(game.world.height/2+20));

		if(key1.isDown) {
			this.state.start('Level1',true,false);
		}

		if(key2.isDown) {
			this.state.start('Level2-1',true,false);
		}

		if(key3.isDown) {
			this.state.start('Level2-2',true,false);
		}
		if(key4.isDown) {
			this.state.start('Level3-1',true,false);
		}
		if(key5.isDown) {
			this.state.start('Level3-2',true,false);
		}
		if(key6.isDown) {
			this.state.start('Level3-3',true,false);
		}

		player.animations.play('windIdle');

		game.time.events.add(1000, function(){
			if(bgLayer3.y < 600) {
				bgLayer1.y += 0.1;
				bgLayer2.y += 0.25;
				bgLayer3.y += 0.5;
			} else {
				titleComplete = true;
			}
		});

		// if(keySpace.isDown) {
		// 	this.state.start('Level1');
		// }

		if(keySpace.isDown && titleComplete == false ) {
			bgLayer1.y = 640;
			bgLayer2.y = 610;
			bgLayer3.y = 640;
			if(keySpace.isUp) {
				titleComplete = true;
			}
		} else if(keySpace.isDown && titleComplete == true) {
			this.state.start('Level1');
		}

		// console.log(titleComplete);

		if(titleComplete == true) {
			game.time.events.add(1000, function(){
				if(flashed == false) {
					screenFlash.alpha = 1;
					title.alpha = 1;
					console.log('titleComplete');
					// s = this.game.add.tween(screenFlash)
					// s.to({ alpha: 0 }, 600, null)
					// s.start();
					// game.time.events.add(100, function(){
					// 	game.add.tween(screenFlash).to( { alpha: 0 }, 2000, "Linear", true);
					// });
					flashed = true;
				}
			});
			if(flashed == true) {
				startPot.alpha = 1;
				game.add.tween(screenFlash).to( { alpha: 0 }, 150, "Linear", true); 
			}
		}
  
	},

	render: function() {
		// game.debug.geom(screenFlash,'#ffffff');
	}
}
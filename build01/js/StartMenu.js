var menuText;
var keySpace;
var player;

var StartMenu = {
	create: function() {
		game.stage.backgroundColor = '#000';

		bgLayer1 = game.add.image(this.game.world.centerX, this.game.world.height, 'startBG');
		bgLayer1.anchor.set(0.5, 1);
		bgLayer1.smoothed = false;

		bgLayer2 = game.add.image(this.game.world.centerX, this.game.world.height, 'startUnderlay');
		bgLayer2.anchor.set(0.5, 1);
		bgLayer2.smoothed = false;

		bgLayer3 = game.add.image(this.game.world.centerX, this.game.world.height, 'startOverlay');
		bgLayer3.anchor.set(0.5, 1);
		bgLayer3.smoothed = false;

		player = bgLayer3.addChild(game.make.sprite(70, -325, 'playerStartMenu', 5));
		console.log(player.x + player.y)

		// player = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playerStartMenu', 5);
		player.smoothed = false;
		player.animations.add('windIdle', [0,1,2,3], 8, true);
		game.world.bringToTop(player)

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
		console.log(this.game.world.height);
	},

	update: function() {
		menuText.x = Math.floor(Math.floor(game.world.width/2));
		menuText.y = Math.floor(Math.floor(game.world.height/2));

		subText.x = Math.floor(Math.floor(game.world.width/2));
		subText.y = Math.floor(Math.floor(game.world.height/2+20));

		if(keySpace.isDown) {
			this.state.start('Level1');
		}

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
			if(bgLayer3.y < 478) {
				bgLayer1.y += 0.25;
				bgLayer2.y += 0.5;
				bgLayer3.y += 1;
			}
		});

		// console.log(bgLayer1.y);
	}
}
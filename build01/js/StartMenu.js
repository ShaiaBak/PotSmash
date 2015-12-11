var menuText;
var keySpace;
var StartMenu = {
	create: function() {
		game.stage.backgroundColor = '#000';

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
	},

	update: function() {
		menuText.x = Math.floor(game.world.width/2);
		menuText.y = Math.floor(game.world.height/2);

		subText.x = Math.floor(game.world.width/2);
		subText.y = Math.floor(game.world.height/2+20);

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
	}
}
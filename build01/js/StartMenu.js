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
	},

	update: function() {
		menuText.x = Math.floor(game.world.width/2);
		menuText.y = Math.floor(game.world.height/2);

		subText.x = Math.floor(game.world.width/2);
		subText.y = Math.floor(game.world.height/2+20);

		if(keySpace.isDown) {
			this.state.start('Game');
		}
	}
}
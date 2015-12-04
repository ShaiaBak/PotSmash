var levelTitle;
var keySpace;

var Level2Start = {
	create: function() {
		game.world.width = 320;
		game.world.height = 320;

		game.stage.backgroundColor = '#000';

		var menuStyle = {font: "16px Courier", fill: "#ffffff" };
		var subStyle = {font: "12px Courier", fill: "#ffffff" };

		levelTitle = this.game.add.text(0, 0, "Congrats! You beat level 1", menuStyle);
		levelSub = this.game.add.text(0, 0, "Press space to go to level 2", subStyle);
		levelSub.anchor.set(0.5);
		levelTitle.anchor.set(0.5);

		keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},

	update: function() {
		levelTitle.x = Math.floor(game.world.width/2);
		levelTitle.y = Math.floor(game.world.height/2);

		levelSub.x = Math.floor(game.world.width/2);
		levelSub.y = Math.floor(game.world.height/2+20);


		if(keySpace.isDown) {
			// this.state.start('Level2-1', true, false);
			this.state.start('Level2-1', true, false);
		}
	}
}
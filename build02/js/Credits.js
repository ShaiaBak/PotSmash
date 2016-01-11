var creditsText;
var logol
var textOverlay;
var playerEnd1;
var playerEnd2;

var Credits = {
	create: function() {
		game.stage.backgroundColor = '#000';
		creditsLayer1 = game.add.image(this.game.world.centerX, 620, 'creditsBG');
		creditsLayer1.anchor.set(0.5, 1);
		creditsLayer1.smoothed = false;

		playerEnd1 = game.add.sprite(300,100,'characterEnd');
		playerEnd1.animations.add('playerEnd1Idle', [0,1,2,3], 8, true);
		game.world.bringToTop(playerEnd1);
		playerEnd2 = game.add.sprite(250,50,'characterEnd2');
		playerEnd2.animations.add('playerEnd2Idle', [0,1,2,3], 8, true);
		game.world.bringToTop(playerEnd2);

		var creditsStyle = {font: "16px Courier", fill: "#000000", align: "center" };

		creditsContent = ["Credits\n\n\n\n\n\nArt\nNAMES...\nNAMES...\nNAMES...\n\n\n\n\n\nProgramming\nNAMES...\nNAMES...\n\n\n\n\n\nMusic\nNAMES...\nNAMES...\nNAMES...\n\n\n\n\n\n\nThank You for playing!"]

		creditsText = game.add.text(0,game.world.height, creditsContent, creditsStyle);
		creditsText.anchor.set(0.5,0);

		creditsText.x = Math.floor(Math.floor(game.world.width/2));
		// creditsText.y = Math.floor(Math.floor(game.world.height/2));
	
		logo = game.add.image(game.world.centerX, game.world.height, "lanternLogo");
		logo.anchor.set(0.5,0);








	},

	update: function() {
		//Values may change due to fonts and content
		playerEnd1.animations.play('playerEnd1Idle');
		playerEnd2.animations.play('playerEnd2Idle');
		if (creditsText.y > -creditsText.height + 125) {
			creditsText.y -= 1.0;
			if (creditsText.y < -425){
				logo.y -= 1.0;
			}
		}

	}
}
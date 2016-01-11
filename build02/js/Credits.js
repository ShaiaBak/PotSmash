var creditsText;
var logol
var textOverlay;

var Credits = {
	create: function() {
		game.stage.backgroundColor = '#000';
		var creditsStyle = {font: "16px Courier", fill: "#ffffff", align: "center" };

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
		if (creditsText.y > -creditsText.height + 125) {
			creditsText.y -= 1.0;
			if (creditsText.y < -425){
				logo.y -= 1.0;
			}
		}

	}
}
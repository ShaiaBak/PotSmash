var creditsText;
var logol
var textOverlay;
var playerEnd1;
var playerEnd2;

var Credits = {
	create: function() {
		game.stage.backgroundColor = '#000';
		creditsLayer1 = game.add.image(0, -90, 'creditsBG');
		creditsLayer1.smoothed = false;

		playerEnd1 = game.add.sprite(280,100,'characterEnd');
		playerEnd1.animations.add('playerEnd1Idle', [0,1,2,3], 8, true);
		game.world.bringToTop(playerEnd1);
		playerEnd2 = game.add.sprite(325,210,'characterEnd2');
		playerEnd2.animations.add('playerEnd2Idle', [0,1,2,3], 8, true);
		game.world.bringToTop(playerEnd2);

		var creditsStyle = {font: "16px Courier", fill: "#000000", align: "center" };

		creditsContent = ["Credits\n\n\n\n\n\nART\nChloe Ezra\nVivian Huang\n\n\n\n\n\nPROGRAMMING\nHowie Chan\nShaia Bak\nTyler Pham\n\n\n\n\n\nMUSIC & SOUND\nShaia Bak\n\n\n\n\n\n\nThank You for playing!"]

		creditsText = game.add.text(0,game.world.height, creditsContent, creditsStyle);

		creditsText.x = Math.floor(Math.floor(50));
	
		logo = game.add.image(50, 330, "lanternLogo");
		// logo.anchor.set(0.5,0);
	},

	update: function() {
		//Values may change due to fonts and content
		playerEnd1.animations.play('playerEnd1Idle');
		playerEnd2.animations.play('playerEnd2Idle');
		if (creditsText.y > -creditsText.height + 100) {
			creditsText.y -= 0.85;
			// creditsText.y -= 5;
			if (creditsText.y < -425){
				logo.y -= 0.85;
				// logo.y -= 5;
			}
		}

	}
}
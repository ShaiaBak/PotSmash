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

		// ====== CREATE OVERLAYS =======
		beginOverlay = game.add.graphics(0, 0);
		beginOverlay.beginFill(0x000000, 1);
		beginOverlay.fixedToCamera = true;
		beginOverlay.drawRect(0, 0, this.game.width, this.game.height);
		beginOverlay.alpha = 1;
		beginOverlay.endFill();

		textOverlay = game.add.graphics(0, 0);
		textOverlay.beginFill(0x000000, 1);
		textOverlay.fixedToCamera = true;
		textOverlay.drawRect(0, 0, this.game.width, this.game.height);
		textOverlay.alpha = 0;
		textOverlay.endFill();

		// ======= CREATE CREDIT TEXT =======
		var creditsStyle = {font: "16px Courier", fill: "#FFFFFF", align: "center" };
		creditsContent = ["SMASH QUEST\n\n\n\n\n\nART\nChloe Ezra\nVivian Huang\n\n\n\n\n\nPROGRAMMING\nHowie Chan\nShaia Bak\nTyler Pham\n\n\n\n\n\nMUSIC & SOUND\nShaia Bak\n\n\n\n\n\n\nThank You for playing!"]
		creditsText = game.add.text(0,game.world.height + 400, creditsContent, creditsStyle);
		creditsText.x = Math.floor(Math.floor(50));

		//LOGO
	
		logo = game.add.image(50, 330, "lanternLogo");
		// logo.anchor.set(0.5,0);

		outroMusic = game.add.audio('musicOutro');
		outroMusic.onDecoded.add(function() {
			game.time.events.add(500, function(){
				outroMusic.play();
			});
		});
	},

	update: function() {
		game.add.tween(beginOverlay).to( { alpha: 0 }, 250, "Linear", true);

		game.time.events.add(4500, function(){
			game.add.tween(textOverlay).to( { alpha: 0.5 }, 500, "Linear", true);
		}, this);

		//Values may change due to fonts and content
		playerEnd1.animations.play('playerEnd1Idle');
		playerEnd2.animations.play('playerEnd2Idle');
		if (creditsText.y > -creditsText.height + 100) {
			creditsText.y -= 0.85;
			// creditsText.y -= 5;
			if (creditsText.y < -400){
				logo.y -= 0.85;
				// logo.y -= 5;
			}
		}

	}
}
var creditsText;

var Credits = {
	create: function() {
		var creditsStyle = {font: "16px Courier", fill: "#ffffff"};
		creditsContent = ["Credits", 
						"Art",
						"NAMES",
						"NAMES",
						"NAMES",
						"Programming",
						"NAMES",
						"NAMES",
						"Music",
						"NAMES",
						"NAMES",
						"NAMES",]

		// creditsText = game.add.text(0,0, "Credits", creditsStyle);
		creditsText.anchor.set(0.5);
		creditsText.x = Math.floor(Math.floor(game.world.width/2));
		

	},

	update: function() {
		game.time.events.add(2250, function(){
			if ()
		})


	}
}
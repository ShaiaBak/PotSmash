var creditTitle;

var Credits = {
	create: function() {
		var creditsStyle = {font: "16px Courier", fill: "#ffffff"};
		creditTitle = game.add.text(0,0, "Credits", creditsStyle);
		creditTitle.anchor.set(0.5);
		creditTitle.x = Math.floor(Math.floor(game.world.width/2));
	},

	update: function() {
		game.time.events.add(2250, function(){
			if ()
		})


	}
}
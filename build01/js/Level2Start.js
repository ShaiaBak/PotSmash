var levelTitle;
var keySpace;
var mapBg;
var player;
var playerSpeed = 100;
var dir = "DOWN";

var Level2Start = {
	create: function() {
		game.world.width = 320;
		game.world.height = 320;

		// game.stage.backgroundColor = '#000';

		mapBg = game.add.image(0, 0, 'map');
		mapBg.scale.setTo(1.25, 1.25);

		// player

		player = game.add.sprite(game.world.centerX - 100, game.world.centerY + 50, 'player');
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;

		player.anchor.setTo(.5,.5);
		// player.scale.setTo(0.5, 0.5);

		// animations
		// animations.add(variable, whats frames-starting from zero, FPS, loop[t/f])
		player.animations.add('walkDown', [0, 1 ,2 ,3], 8 /*fps */, true);
		player.animations.add('walkUp', [16, 17, 18, 19], 8 /*fps */, true);
		player.animations.add('walkLeft', [24, 25, 26, 27], 8 /*fps */, true);
		player.animations.add('walkRight', [8 , 9, 10, 11], 8 /*fps */, true);

		//diagonal animation
		player.animations.add('walkUpRight', [12 , 13, 14, 15], 8 /*fps */, true);
		player.animations.add('walkDownRight', [4 , 5, 6, 7], 8 /*fps */, true);
		player.animations.add('walkUpLeft', [20, 21, 22, 23], 8 /*fps */, true);
		player.animations.add('walkDownLeft', [28, 29, 30, 31], 8 /*fps */, true);

		//idle animation
		player.animations.add('idleDown', [0], 8 /*fps */, true);
		player.animations.add('idleUp', [16], 8 /*fps */, true);
		player.animations.add('idleLeft', [25], 8 /*fps */, true);
		player.animations.add('idleRight', [8], 8 /*fps */, true);

		// diagonal animation
		player.animations.add('idleUpRight', [14], 8 /*fps */, true);
		player.animations.add('idleDownRight', [6], 8 /*fps */, true);
		player.animations.add('idleUpLeft', [21], 8 /*fps */, true);
		player.animations.add('idleDownLeft', [29], 8 /*fps */, true);

		// ========= CAMERA STUFF =========

		// set bounds to world for camera and player
		game.world.setBounds(0, 0, 600, 480);

		// camera follows player
		// follow types: FOLLOW_LOCKON, FOLLOW_PLATFORMER, FOLLOW_TOPDOWN, FOLLOW_LOCKON_TIGHT
		this.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT); 

		var menuStyle = {font: "16px Courier", fill: "#ffffff" };
		var subStyle = {font: "12px Courier", fill: "#ffffff" };

		levelTitle = game.add.text(0, 0, "Congrats! You beat level 1", menuStyle);
		levelSub = game.add.text(0, 0, "Press space to go to level 2", subStyle);
		levelSub.anchor.set(0.5);
		levelTitle.anchor.set(0.5);

		//move player with ARROW keys
		this.cursors = this.game.input.keyboard.createCursorKeys();

		keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.restart();
	},

	restart: function() {
		playerSpeed = 100;
		dir = "RIGHT";
	},

	update: function() {
		levelTitle.x = Math.floor(game.world.width/2);
		levelTitle.y = Math.floor(game.world.height/2);

		levelSub.x = Math.floor(game.world.width/2);
		levelSub.y = Math.floor(game.world.height/2+20);

		this.checkMovement();
		this.handleDirection();


		if(keySpace.isDown) {
			// this.state.start('Level2-1', true, false);
			this.state.start('Level2-1', true, false);
		}

		if(player.x >= 300) {
			this.state.start('Level2-1', true, false);
		}

		// console.log(player.x);
	},

	checkMovement: function() {
		//Player is not moving when nothing is pressed
		// player.body.velocity.y = 0;
		// player.body.velocity.x = 0;

		// check to see if all win conditions are true
		// make player exit level without player control
		// if(exitBool == true && keysDisabled == true && enterNextLevel == true) {
		// 	player.body.velocity.y += playerSpeed;
		// 	player.body.collideWorldBounds = false;
		// }
		game.time.events.add(500, function(){
			player.body.velocity.x = playerSpeed;
			player.body.collideWorldBounds = false;
		}, this);
		
		//Checks arrow keys
		if(this.cursors.up.isDown) {
			player.body.velocity.y -= playerSpeed;
		}
		else if(this.cursors.down.isDown) {
			player.body.velocity.y += playerSpeed;
		}
		if(this.cursors.left.isDown) {
			player.body.velocity.x -= playerSpeed;
		}
		else if(this.cursors.right.isDown) {
			player.body.velocity.x += playerSpeed;
		}
	
		// if player is going diagonally, go 0.75 the speed in both directions
		// reason is that player goes too fast when moving diagonally
		// @TODO: change for touch controls
		if(player.body.velocity.y >= 51 && player.body.velocity.x >= 51 ||
			player.body.velocity.y <= -51 && player.body.velocity.x <= -51 ||
			player.body.velocity.y >= 51 && player.body.velocity.x <= -51 ||
			player.body.velocity.y <= -51 && player.body.velocity.x >= 51) {
			player.body.velocity.y = player.body.velocity.y*0.75;
			player.body.velocity.x = player.body.velocity.x*0.75;
		}
	},

	handleDirection: function() {
		console.log(player.body.velocity.x);
		//cardinal directions handling
		// all grab pot rect are offset because it registers top left first. needed to offset.
		if (player.body.velocity.y < 0 && player.body.velocity.x == 0) {
			dir = "UP";			
			this.handleWalkAnim();
		} else if (player.body.velocity.y > 0 && player.body.velocity.x == 0) {
			dir = "DOWN";			
			this.handleWalkAnim();
		} else if (player.body.velocity.x < 0 && player.body.velocity.y == 0) {
			dir = "LEFT";			
			this.handleWalkAnim();
		} else if (player.body.velocity.x > 0 && player.body.velocity.y == 0) {
			dir = "RIGHT";			
			this.handleWalkAnim();
		}
		// diagonal movements
		else if(player.body.velocity.y < 0 && player.body.velocity.x < 0) {
			dir = "UPLEFT";
			this.handleWalkAnim();
			// set grab pot detectotion to off screen to disable it while walking diagonal
			
		} else if(player.body.velocity.y < 0 && player.body.velocity.x > 0) {
			dir = "UPRIGHT";
			this.handleWalkAnim();
			
		} else if(player.body.velocity.y > 0 && player.body.velocity.x < 0) {
			dir = "DOWNLEFT";
			this.handleWalkAnim();
			
		} else if(player.body.velocity.y > 0 && player.body.velocity.x > 0) {
			dir = "DOWNRIGHT";
			this.handleWalkAnim();
			
		}
		
		//idle animation
		if (player.body.velocity.y == 0 && player.body.velocity.x == 0) {
			if(dir == "DOWN") {
				player.play('idleDown');
			} else if(dir == "UP") {
				player.play('idleUp');
			} else if(dir == "LEFT") {
				player.play('idleLeft');
			} else if(dir == "RIGHT") {
				player.play('idleRight');
			}
			// diagonal idle
			else if(dir == "UPLEFT") {
				player.play('idleUpLeft');
			} else if(dir == "DOWNLEFT") {
				player.play('idleDownLeft');
			} else if(dir == "UPRIGHT") {
				player.play('idleUpRight');
			} else if(dir == "DOWNRIGHT") {
				player.play('idleDownRight');
			} else {
				player.play('idleUp');
			}
		}
	},

	handleWalkAnim: function() {
		if (dir == "UP") {
			player.play('walkUp');
		} else if (dir == "DOWN") {
			player.play('walkDown');
		} else if (dir == "LEFT") {
			player.play('walkLeft');
		} else if (dir == "RIGHT") {
			player.play('walkRight');
		} 
		// diagonal movements
		else if(dir == "UPLEFT") {
			player.play('walkUpLeft');
		} else if(dir == "UPRIGHT") {
			player.play('walkUpRight');
		} else if(dir == "DOWNLEFT") {
			player.play('walkDownLeft');
		} else if(dir == "DOWNRIGHT") {
			player.play('walkDownRight');
		}
	}
}
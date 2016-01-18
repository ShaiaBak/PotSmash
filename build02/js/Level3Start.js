var levelTitle;
var keySpace;
var mapBg;
var player;
var playerSpeed = 100;
var dir = "DOWN";
var menuStyle;
var keysDisabled = true;

// text variables
var ranText = 0;
var textOverlay;
var textActive = false;
var lvlText;
var line = [];
var letterIndex = 0;
var wordIndex = 0;
var letterDelay = 30;
var lineIndex = 0;
var wordDelay = 400;
var lineDelay = 200;
var textComplete = false;
var content;

var Level3Start = {
	create: function() {
		game.world.width = 320;
		game.world.height = 320;

		// game.stage.backgroundColor = '#000';

		// map = game.add.image(0, 0, 'map');
		// map.scale.setTo(1.25, 1.25);

		mapBg = game.add.image(0, 0, 'bgMap');
		mapBg.scale.setTo(1.25, 1.25);

		house1 = game.add.image(game.world.centerX + 80, game.world.centerY + 60, 'house1');
		house1.scale.setTo(1.25, 1.25);
		house1.anchor.setTo(0.5, 0.5);

		house2 = game.add.image(game.world.centerX + 80, game.world.centerY + 60, 'house2');
		house2.scale.setTo(1.25, 1.25);
		house2.anchor.setTo(0.5, 0.5);

		house3 = game.add.image(game.world.centerX + 80, game.world.centerY + 60, 'house3');
		house3.scale.setTo(1.25, 1.25);
		house3.anchor.setTo(0.5, 0.5);
		
		// player
		player = game.add.sprite(game.world.centerX + 120, game.world.centerY + 40, 'player');
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

		menuStyle = {font: "16px Courier", fill: "#ffffff" };
		subStyle = {font: "12px Courier", fill: "#ffffff" };


		// ====== CREATE TEXT =======
		textOverlay = game.add.graphics(0, 0);
		textOverlay.beginFill(0x000000, 1);
		textOverlay.fixedToCamera = true;
		textOverlay.drawRect(0, 0, this.game.width, this.game.height);
		textOverlay.alpha = 0;
		textOverlay.endFill();

		// levelTitle = game.add.text(0, 0, "Congrats! You beat level 1", menuStyle);
		// levelSub = game.add.text(0, 0, "Press space to go to level 2", subStyle);
		// levelSub.anchor.set(0.5);
		// levelTitle.anchor.set(0.5);

		//move player with ARROW keys
		this.cursors = this.game.input.keyboard.createCursorKeys();

		keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		keySpace.onDown.add(function() {
			if(textComplete == true && textActive) {
				lvl3Start();
				this.resetText();
			}
		}, this);

		game.world.bringToTop(textOverlay);

		this.restart();
	},

	restart: function() {
		playerSpeed = 100;
		dir = "DOWN";
		keysDisabled = true;

		ranText = 0;
		textActive = false;
		line = [];
		letterIndex = 0;
		wordIndex = 0;
		lineIndex = 0;
		letterDelay = 30;
		wordDelay = 400;
		lineDelay = 200;
		textComplete = false;
	},

	update: function() {
		this.checkMovement();
		this.handleDirection();
		this.autoWalk();

		if(player.x >= 550 && ranText == 0) {
			lvl2Content = ["You beat level 2!",
					" Good job.",
					" Press Space."]
			content = lvl2Content;
			this.textFunc();
		}

		if(!music.isPlaying){
			music.play('',0);
		}

		game.add.tween(music).to({volume:0.4}, 500).start();
		// music.volume = 0.4;
	},

	autoWalk: function() {
		game.time.events.add(500, function(){
			if(player.y <= 270 && player.x < 400) {
				player.body.velocity.y = playerSpeed;
				// 	player.body.collideWorldBounds = false;
				
			} else if(player.y > 270 &&  player.x <= 550) {
				player.body.velocity.y = 0;
				player.body.velocity.x = playerSpeed;
			} else if(player.y > 250 && player.x >= 550) {
				dir = "UP";
				player.body.velocity.x = 0;
				player.body.velocity.y = -playerSpeed;
			}
		}, this);
	},

	checkMovement: function() {
		
		//Checks arrow keys
		// check to see if keys are disabled
		if(keysDisabled == false) {
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
	},

	textFunc: function() {
		if(textActive == false) {
			lvlText = game.add.text(300, 200, '', {font: "16px Courier", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
			lvlText.fixedToCamera = true;
			lvlText.cameraOffset.setTo(game.world.width/3/2 - 25, 80);
			game.world.bringToTop(textOverlay);
			game.world.bringToTop(lvlText);

			textActive = true;
			game.add.tween(textOverlay).to( { alpha: 1 }, 250, "Linear", true);
			game.time.events.add(500, function(){
				this.textAnim();
			}, this);
			ranText = 1;
		}
	},

	resetText: function() {
		if(textActive == true) {
			textActive = false;
			lvlText.destroy();
			lineIndex = 0;
			game.add.tween(textOverlay).to( { alpha: 0 }, 150, "Linear", true);
		}
	},

	textAnim: function() {
		//text complete
		if (lineIndex === content.length) {
			textComplete = true;
			return;
		}

		line = content[lineIndex].split('');

		letterIndex = 0;

		game.time.events.repeat(letterDelay, line.length, this.nextLetter, this);

		lineIndex++;
	},

	nextLetter: function() {
		// console.log(line[letterIndex]);
		lvlText.text = lvlText.text.concat(line[letterIndex] + '');

		letterIndex++;

		if(letterIndex === line.length) {
			lvlText.text = lvlText.text.concat("\n");

			game.time.events.add(lineDelay, this.textAnim, this);
		}
	},

	wordAnim: function() {
		// for animating text word by word
		if (lineIndex === content.length) {
			return;
		}

		line = content[lineIndex].split(' ');

		wordIndex = 0;

		game.time.events.repeat(wordDelay, line.length, this.nextWord, this);

		lineIndex++;
	},

	nextWord: function() {
		// console.log(line[wordIndex]);
		lvlText.text = lvlText.text.concat(line[wordIndex] + ' ');

		wordIndex++;

		if(wordIndex === line.length) {
			lvlText.text = lvlText.text.concat("\n");

			game.time.events.add(lineDelay, this.textAnim, this);
		}
	}
}

function lvl3Start() {
	game.state.start('Level3-1', true, false);
};
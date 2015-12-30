var _TILESIZE = 32;

var map;
var bgLayer;
var blockedLayer;
var triggerLayer;
var levelExitLayer;
var objectLayer;
var dir = "RIGHT";
var currDir = dir;
var playerSpeed = 75; //100 is a arbitrary default value
var walkFPS = 12;
var potGroup; //group with all the pots
var throwGroup; //group with all the thrown pots
var grabbedPot;
var grabPotRect; //the rectangle area the player can grab pots
var exitBool = 0; // if 0, exit doesn't work
var exitNum = 1;
var potSoundBool = 0;
var keysDisabled = true;
var itemVal = 0;
var objectiveVal = 1;
var showDebug = false;
var enterNextLevel = false;
var spaceDisabled = false;

var enableCollision = true;

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

var step1 = false;
var step2 = false;
var step3 = false;
var step4 = false;
var step5 = false;
var step6 = false;
var walk1 = false;
var walk2 = false;
var camPanComp = false;

var npcStep1 = false;
var npcStep2 = false;
var NPCdir;

var barSprite1;
var barSprite2;

// item picked up bool; may have to change if multiple items
var objectiveComplete = 0;

var pushTimer = 0;
var triggerTimer = 0;

//******GRID SETUP******//
var board = new Array();
board[0]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[1]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[2]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[3]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[4]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[5]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[6]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[7]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[8]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[9]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[10] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[11] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[12] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[13] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[14] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var gridCheck;

//Rows and columns of the grid
var c=0;
var r=0;

var playerGridVal = 9;
var potGridVal = 1;
var wallGridVal = 2;
var transWallGridVal = 3;

var triggerGridVal = 7;
var exitGridVal = 8;
//******GRID SETUP END******//

var Level3End = {
	create: function() {
		this.map = this.game.add.tilemap('level3-1-end');

		//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
		this.map.addTilesetImage('tiles-lvl3-1-32x32', 'gameTiles-lvl-3_1');
		// this.map.addTilesetImage('tileset-placeholder2', 'gameTilesTemp');

		this.bgLayer = this.map.createLayer('backgroundLayer');
		this.blockedLayer = this.map.createLayer('blockedLayer');
		this.detailLayer1 = this.map.createLayer('detailLayer1');
		this.detailLayer3 = this.map.createLayer('detailLayer3_overChar');
		this.transBlockedLayer = this.map.createLayer('transBlockedLayer');
		// this.triggerLayer = this.map.createLayer('triggerLayer');
		this.levelExitLayer = this.map.createLayer('levelExitLayer');
		// this.transBlockedLayer.alpha = 0;
		// this .visible and .renderable instead of alpha to put less strain on sytem when it comes to layers
		this.transBlockedLayer.visible = false;
		this.transBlockedLayer.renderable = false;
		this.blockedLayer.renderable = false;
		this.levelExitLayer.visible = false;
		this.levelExitLayer.renderable = false;

		//collision
		this.map.setCollisionBetween(1, 1896, true, 'blockedLayer');
		this.map.setCollisionBetween(1, 1896, true, 'transBlockedLayer');

		this.map.setCollisionBetween(1, 1896, true, 'triggerLayer');
		this.map.setCollisionBetween(1, 1896, true, 'levelExitLayer');

		// enables other physics stuff
		// game.physics.startSystem(Phaser.Physics.P2JS);

		// resize world so that dimensions match the map
		// doesnt work.. must figure out
		// this.bgLayer.resizeWorld();

		//Touch control enable
		this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
		this.game.touchControl.inputEnable();


		key2 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		key2.onDown.add(function () {
			// r++;
			for(var r = 0; r < 15; r++){
				console.log(r + " " + board[r]);
			// return true;
			}
		}, this);

		// =========== CREATE NPC ===========
		var result = this.findObjectsByType('npcStart1', this.map, 'objectsLayer');
		npc = this.game.add.sprite(result[0].x, result[0].y, 'npc');
		game.physics.arcade.enable(npc);
		npc.body.collideWorldBounds = true;

		// npc.anchor.setTo(.5,.5);
		npc.scale.setTo(0.5, 0.5);

		// npc animations
		npc.animations.add('walkNPCDown', [1 ,2 ,3, 4], 8 /*fps */, true);
		npc.animations.add('walkNPCUp', [17, 18, 19, 20], 8 /*fps */, true);
		npc.animations.add('walkNPCLeft', [25, 26, 27, 28], 8 /*fps */, true);
		npc.animations.add('walkNPCRight', [9, 10, 11, 12], 8 /*fps */, true);

		//diagonal animation
		npc.animations.add('walkNPCUpRight', [13, 14, 15, 16], 8 /*fps */, true);
		npc.animations.add('walkNPCDownRight', [5, 6, 7, 8], 8 /*fps */, true);
		npc.animations.add('walkNPCUpLeft', [21, 22, 23, 24], 8 /*fps */, true);
		npc.animations.add('walkNPCDownLeft', [29, 30, 31, 32], 8 /*fps */, true);

		npc.animations.add('idleNPCDown', [0], 2 /*fps */, true);
		npc.animations.add('idleNPCRight', [9], 2 /*fps */, true);
		npc.animations.add('idleNPCUp', [19], 2 /*fps */, true);
		npc.animations.add('idleNPCLeft', [26], 2 /*fps */, true);


		// =========== CREATE PLAYER ===========
		// var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
		var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');

		this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
		this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		
		// anchor point for player sprite
		this.player.anchor.setTo(.5,.5);
		this.player.scale.setTo(0.5, 0.5);

		// specific to level 2-2
		this.player.x += this.player.width/2;
		this.player.y += this.player.height/2;

 		this.player.body.setSize(40, 40, 0, 5);

 		//create pot grab area to check the area right in front of the player for pot grabbing
		grabPotRect = new Phaser.Rectangle(0, 0, 10, 10);

		// animations
		// animations.add(variable, whats frames-starting from zero, FPS, loop[t/f])
		this.player.animations.add('walkDown', [0, 1 ,2 ,3], 8 /*fps */, true);
		this.player.animations.add('walkUp', [16, 17, 18, 19], 8 /*fps */, true);
		this.player.animations.add('walkLeft', [24, 25, 26, 27], 8 /*fps */, true);
		this.player.animations.add('walkRight', [8 , 9, 10, 11], 8 /*fps */, true);

		//diagonal animation
		this.player.animations.add('walkUpRight', [12 , 13, 14, 15], 8 /*fps */, true);
		this.player.animations.add('walkDownRight', [4 , 5, 6, 7], 8 /*fps */, true);
		this.player.animations.add('walkUpLeft', [20, 21, 22, 23], 8 /*fps */, true);
		this.player.animations.add('walkDownLeft', [28, 29, 30, 31], 8 /*fps */, true);

		//idle animation
		this.player.animations.add('idleDown', [96, 97], 2 /*fps */, true);
		this.player.animations.add('idleRight', [100, 101], 2 /*fps */, true);
		this.player.animations.add('idleUp', [104, 105], 2 /*fps */, true);
		this.player.animations.add('idleLeft', [108, ,109], 2 /*fps */, true);

		// diagonal animation
		this.player.animations.add('idleDownRight', [98, 99], 2 /*fps */, true);
		this.player.animations.add('idleUpRight', [102, 103], 2 /*fps */, true);
		this.player.animations.add('idleUpLeft', [106, 107], 2 /*fps */, true);
		this.player.animations.add('idleDownLeft', [110, 111], 2 /*fps */, true);

		// ========= CREATE POT STUFF =========

		potGroup = game.add.group();
		potGroup.enableBody = true;
		potGroup.physicsBodyType = Phaser.Physics.ARCADE;

		// ============ NEW WAY ================
		this.map.createFromObjects('objectsLayer', 37, 'potSprite_3-1', 0, true, false, potGroup);

		this.game.physics.arcade.enable(potGroup);

		// set all children within potGroup to...
		potGroup.forEach(function(pot) {
			pot.body.immovable = true;
			// pot.scale.setTo(.5, .5);
			game.physics.arcade.enable(pot);
			pot.anchor.setTo(.5,.5);

			// recalculate pot position based on the .5 anchor position
			pot.x = pot.x + pot.width/2;
			pot.y = pot.y + pot.height/2;

			pot.body.collideWorldBounds = true;
		}, this);

		potGroup.callAll('animations.add', 'animations', 'potIdle', [0], 10, true);
		potGroup.callAll('animations.add', 'animations', 'potBreakAnim', [0, 1, 2, 3, 4], 10, false);

		potGroup.callAll('animations.play', 'animations', 'potIdle');

		// ========= CAMERA STUFF =========

		// set bounds to world for camera and player
		// @TODO: dynamically get bounds from map size
		game.world.setBounds(0, 0, 448, 480);

		// camera follows player
		// follow types:
		// FOLLOW_LOCKON, FOLLOW_PLATFORMER, FOLLOW_TOPDOWN, FOLLOW_LOCKON_TIGHT
		this.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

		// console.log();

		//move player with ARROW keys
		this.cursors = this.game.input.keyboard.createCursorKeys();

		//enable space bar
		keySPACE = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//spacebar picks / throws the pot
		keySPACE.onDown.add(function () {
			if(keysDisabled && textComplete == true && textActive) {
				this.resetText();
			}
		}, this);


		key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		key3.onDown.add(function () {
			for(var r = 0; r < 15; r++){
				console.log(r + " " + board[r]);
			}
		}, this);

		key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		key1.onDown.add(function() {
			// toggle debug state on key press
			showDebug = (showDebug) ? false : true;
			if (!showDebug) {
				game.debug.reset();
			}
		}, this);

		key0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
		key0.onDown.add(function() {
			game.state.restart();
		}, this);

		// print blank board
		// printBoard(board,14,15);
		
		gridCheck = game.add.sprite(0, 0, 'mega_grid');
		game.physics.enable(gridCheck, Phaser.Physics.ARCADE);
		gridCheck.body.setSize(32, 32, 0, 0);
		gridCheck.tint = 0xff0000;
		this.map.setTileIndexCallback(1,this.testCallback,gridCheck);

		// ====== CREATE TEXT OVERLAY =======
		textOverlay = game.add.graphics(0, 0);
		textOverlay.beginFill(0x000000, 1);
		textOverlay.fixedToCamera = true;
		textOverlay.drawRect(0, 0, this.game.width, this.game.height);
		textOverlay.alpha = 0;
		textOverlay.endFill();

		// ========== AUDIO =========
		// pot audio
		sfxPot1 = game.add.audio('sfx_pot1'); // enable audio
		sfxPot1.allowMultiple = false;
		sfxObj1 = game.add.audio('sfx_obj1');
		
		sfxPot1.addMarker('throwSFX', 0, 0.25);
		sfxPot1.addMarker('potBreakSFX', 2, 0.5);
		sfxPot1.addMarker('potPushSFX', 6, 0.5);

		sfxObj1.addMarker('moneySFX', 0, 0.5);

		// so the player is ontop of all other items
		game.world.moveUp(this.player);

		// so detail layer 4 is overtop of player
		game.world.bringToTop(this.detailLayer3);

		// ========== CREATE 16:9 BARS ==========
		var bar1 = game.add.graphics(0, 0);
		bar1.beginFill(0x111111);
		bar1.drawRect(0, 0, game.world.width, 70);
		bar1.boundsPadding = 0;

		var bar2 = game.add.graphics(0, 0);
		bar2.beginFill(0x111111);
		bar2.drawRect(0, game.height - 70, game.world.width, 70);
		bar2.boundsPadding = 0;

		barSprite1 = game.add.sprite(0, -70, bar1.generateTexture());
		barSprite1.fixedToCamera = true;
		this.game.physics.arcade.enable(barSprite1);
		bar1.destroy();

		barSprite2 = game.add.sprite(0, game.height, bar2.generateTexture());
		barSprite2.fixedToCamera = true;
		bar2.destroy();

		console.log();

		this.restart();
	},

	restart: function() {
		_TILESIZE = 32;
		dir = "RIGHT";
		currDir = dir;
		playerSpeed = 75; //100 is a arbitrary default value
		walkFPS = 12;
		grabPotRect; //the rectangle area the player can grab pots
		exitBool = 0; // if 0, exit doesn't work
		potSoundBool = 0;
		keysDisabled = true;
		itemVal = 0;
		objectiveVal = 1;
		showDebug = false;
		enterNextLevel = false;
		enableCollision = true;
		spaceDisabled = false;

		// item picked up bool; may have to change if multiple items
		objectiveComplete = 0;

		pushTimer = 0;
		triggerTimer = 0;

		//Rows and columns of the grid
		c=0;
		r=0;

		playerGridVal = 9;
		potGridVal = 1;
		wallGridVal = 2;
		transWallGridVal = 3;

		triggerGridVal = 7;
		exitGridVal = 8;

		// text variables
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
		// collision update
		// player collision (no pot)
		this.game.physics.arcade.collide(this.player, this.blockedLayer);
		this.game.physics.arcade.collide(this.player, this.transBlockedLayer);

		this.game.physics.arcade.collide(npc, this.transBlockedLayer);

		// pot collision
		this.game.physics.arcade.collide(throwGroup, this.blockedLayer, this.handlePotBreak, null, this);
		this.game.physics.arcade.collide(throwGroup, this.transBlockedLayer, this.handlePotBreak, function() {
			if (enableCollision) {
				return true;
			}
			return false;
		});
		this.game.physics.arcade.collide(throwGroup, potGroup, this.handlePotBreak, function() {
			if (enableCollision) {
				return true;
			}
			return false;
		});

		this.checkMovement();
		this.handleDirection();

		// console.log(walk1)

		if(walk1 == false) {
			game.time.events.add(1500, function(){
				this.autoWalk();
			}, this);
		}

		if(walk1 == true) {
			this.autoWalk2();
		}

		if(walk2 == true) {
			this.cameraPan();
		}

		if(camPanComp == true) {
			content = ["mmph.. mphh........"]
			this.textFunc();
		}

		// anytime a directional key is let go, reset potTimer
		this.game.input.keyboard.onUpCallback = function(e) {
			// console.log(e.keyCode);
			if(e.keyCode == 38 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40 ) {
				pushTimer = 0;
			}
		}

		// game.add.tween(music).to({volume:0}, 500).start();
		// if(music.volume == 0) {
		// 	music.stop();
		// }
		// audio volume - cannot be set inside create function
		sfxPot1.volume = 0.2;
		sfxObj1.volume = 0.1;

		if(barSprite1.cameraOffset.y < 0) {
			barSprite1.cameraOffset.y += 1;
		}

		if(barSprite2.cameraOffset.y > game.height - 70) {
			barSprite2.cameraOffset.y -= 1;
		}

		// console.log('pushTimer: ' + pushTimer)
	},

	enableKeys: function() {
		this.player.body.immovable = false;
		this.player.body.moves = true;
		keysDisabled = false;
	},

	autoWalk: function() {
		var playerWidth = this.player.width/2;

		if(step1 == false && this.player.x <= _TILESIZE * 6 - playerWidth) {
				this.player.body.velocity.x = playerSpeed;
		} else {
			step1 = true;
		}

		if(step1 == true && step2 == false && this.player.y <= _TILESIZE * 7 - playerWidth) {
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = playerSpeed;
		} else if (step1 == true) {
			step2 = true;
		}

		if(step2 == true && step3 == false && this.player.x <= _TILESIZE * 7 - playerWidth) {
			this.player.body.velocity.x = playerSpeed;
			this.player.body.velocity.y = 0;
		} else if (step2 == true) {
			step3 = true;
			this.player.body.velocity.x = 0;
		}

		if(step3 == true && step4 == false && this.player.y <= _TILESIZE * 9 - playerWidth - 3) {
			this.player.body.velocity.y = playerSpeed;
			this.player.body.velocity.x = 0;
		} else if (step3 == true && step4 == false) {
			step4 = true;
			this.player.body.velocity.y = 0;
			dir = 'LEFT';
			walk1 = true;
			step4 = true;
		}
	},

	autoWalk2: function() {
		var playerWidth = this.player.width/2;
		game.time.events.add(1500, function(){
			game.camera.follow(null);
			walk2 = true;
			this.player.body.velocity.y = playerSpeed;
			this.player.body.velocity.x = 0;

			// console.log(npc.x + 'tile: ' + _TILESIZE*6);
			// console.log(npcStep1);
			console.log(npcStep1)
			if(npcStep1 == false && npc.x <= _TILESIZE * 6-1){
				npc.body.velocity.x = playerSpeed;
			} else{
				npcStep1 = true;
			} 
			if(npcStep1 == true && npcStep2 == false) {
				npc.body.velocity.x = 0;
				npc.body.velocity.y = playerSpeed;
			}


		}, this);

		// if(npcStep1)
		// if(step1 == false && this.player.x <= _TILESIZE * 6 - playerWidth) {
		// 		this.player.body.velocity.x = playerSpeed;
		// } else {
		// 	step1 = true;
		// }
	},

	cameraPan: function() {
		game.world.setBounds(0, 0, 1000, 480);
		game.time.events.add(2000, function(){
			if(game.camera.x < 64) {
				game.camera.x += 1;
			} else {
				camPanComp = true;
			}
		});
	},

	//find objects in a Tiled layer that containt a property called "type" equal to a certain value
	findObjectsByType: function(type, map, layer) {
		var result = new Array();
		map.objects[layer].forEach(function(element){
			if(element.properties.type === type) {
				//Phaser uses top left, Tiled bottom left so we have to adjust the y position
				//also keep in mind that the cup images are a bit smaller than the tile which is 16x16
				//so they might not be placed in the exact pixel position as in Tiled
				element.y -= map.tileHeight;
				result.push(element);
			}
		});
		return result;
	},
	
	checkMovement: function() {

		// check to see if all win conditions are true
		// make player exit level without player control
		if(exitBool == 1 && keysDisabled == true && enterNextLevel == true) {
			if(exitNum == 1) {
				this.player.body.velocity.x += playerSpeed;
			} else if(exitNum == 2) {
				this.player.body.velocity.x -= playerSpeed;
			}
			this.player.body.collideWorldBounds = false;
			game.add.tween(this.player).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 1000, true);
		}

		// check to see if keys are disabled
		if(keysDisabled == false) {
			//Checks arrow keys
			if(this.cursors.up.isDown) {
				this.player.body.velocity.y -= playerSpeed;
			}
			else if(this.cursors.down.isDown) {
				this.player.body.velocity.y += playerSpeed;
			}
			if(this.cursors.left.isDown) {
				this.player.body.velocity.x -= playerSpeed;
			}
			else if(this.cursors.right.isDown) {
				this.player.body.velocity.x += playerSpeed;
			}
		
			// if player is going diagonally, go 0.75 the speed in both directions
			// reason is that player goes too fast when moving diagonally
			// @TODO: change for touch controls
			if(this.player.body.velocity.y >= 51 && this.player.body.velocity.x >= 51 ||
			this.player.body.velocity.y <= -51 && this.player.body.velocity.x <= -51 ||
			this.player.body.velocity.y >= 51 && this.player.body.velocity.x <= -51 ||
			this.player.body.velocity.y <= -51 && this.player.body.velocity.x >= 51) {
				this.player.body.velocity.y = this.player.body.velocity.y*0.75;
				this.player.body.velocity.x = this.player.body.velocity.x*0.75;
			}
		}
	},

	handleDirection: function() {
		//cardinal directions handling
		if (this.player.body.velocity.y < 0 && this.player.body.velocity.x == 0) {
			dir = "UP";
			grabPotRect.x = this.player.x + 7;
			grabPotRect.y = this.player.y - this.player.height + 15;
			this.handleWalkAnim();
		} else if (this.player.body.velocity.y > 0 && this.player.body.velocity.x == 0) {
			dir = "DOWN";
			grabPotRect.x = this.player.x + 7;
			// JANKY
			grabPotRect.y = this.player.y + this.player.height - 5;
			this.handleWalkAnim();
		} else if (this.player.body.velocity.x < 0 && this.player.body.velocity.y == 0) {
			dir = "LEFT";
			grabPotRect.x = this.player.x - this.player.width + 10;
			grabPotRect.y = this.player.y - this.player.height*.5 + 21;
			this.handleWalkAnim();
		} else if (this.player.body.velocity.x > 0 && this.player.body.velocity.y == 0) {
			dir = "RIGHT";
			grabPotRect.x = this.player.x + 20;
			grabPotRect.y = this.player.y - this.player.height*.5 + 21;
			this.handleWalkAnim();
		}
		// diagonal movements
		else if(this.player.body.velocity.y < 0 && this.player.body.velocity.x < 0) {
			dir = "UPLEFT";
			this.handleWalkAnim();
			// set grab pot detectotion to off screen to disable it while walking diagonal
			grabPotRect.x = game.world.height;
			grabPotRect.y = game.world.width;
		} else if(this.player.body.velocity.y < 0 && this.player.body.velocity.x > 0) {
			dir = "UPRIGHT";
			this.handleWalkAnim();
			grabPotRect.x = game.world.height;
			grabPotRect.y = game.world.width;
		} else if(this.player.body.velocity.y > 0 && this.player.body.velocity.x < 0) {
			dir = "DOWNLEFT";
			this.handleWalkAnim();
			grabPotRect.x = game.world.height;
			grabPotRect.y = game.world.width;
		} else if(this.player.body.velocity.y > 0 && this.player.body.velocity.x > 0) {
			dir = "DOWNRIGHT";
			this.handleWalkAnim();
			grabPotRect.x = game.world.height;
			grabPotRect.y = game.world.width;
		}

		if (npc.body.velocity.y < 0 && npc.body.velocity.x == 0) {
			NPCdir = "UP";
			this.handleWalkAnim();
		} else if (npc.body.velocity.y > 0 && npc.body.velocity.x == 0) {
			NPCdir = "DOWN";
			this.handleWalkAnim();
		} else if (npc.body.velocity.x < 0 && npc.body.velocity.y == 0) {
			NPCdir = "LEFT";
			this.handleWalkAnim();
		} else if (npc.body.velocity.x > 0 && npc.body.velocity.y == 0) {
			NPCdir = "RIGHT";
			this.handleWalkAnim();
		}
		// diagonal movements
		else if(npc.body.velocity.y < 0 && npc.body.velocity.x < 0) {
			NPCdir = "UPLEFT";
			this.handleWalkAnim();
		} else if(npc.body.velocity.y < 0 && npc.body.velocity.x > 0) {
			NPCdir = "UPRIGHT";
			this.handleWalkAnim();
		} else if(npc.body.velocity.y > 0 && npc.body.velocity.x < 0) {
			NPCdir = "DOWNLEFT";
			this.handleWalkAnim();
		} else if(npc.body.velocity.y > 0 && npc.body.velocity.x > 0) {
			NPCdir = "DOWNRIGHT";
			this.handleWalkAnim();
		}
		
		//idle animation
		if (this.player.body.velocity.y == 0 && this.player.body.velocity.x == 0) {
			if (grabbedPot == null) {
				if(dir == "DOWN") {
					this.player.play('idleDown');
				} else if(dir == "UP") {
					this.player.play('idleUp');
				} else if(dir == "LEFT") {
					this.player.play('idleLeft');
				} else if(dir == "RIGHT") {
					this.player.play('idleRight');
				}
				// diagonal idle
				else if(dir == "UPLEFT") {
					this.player.play('idleUpLeft');
				} else if(dir == "DOWNLEFT") {
					this.player.play('idleDownLeft');
				} else if(dir == "UPRIGHT") {
					this.player.play('idleUpRight');
				} else if(dir == "DOWNRIGHT") {
					this.player.play('idleDownRight');
				} else {
					this.player.play('idleUp');
				}
			} else if (grabbedPot != null) {
				if(dir == "DOWN") {
					this.player.play('pickDown');
				} else if(dir == "UP") {
					this.player.play('pickUp');
				} else if(dir == "LEFT") {
					this.player.play('pickLeft');
				} else if(dir == "RIGHT") {
					this.player.play('pickRight');
				}
				// diagonal idle
				else if(dir == "UPLEFT") {
					this.player.play('idleUpLeft');
				} else if(dir == "DOWNLEFT") {
					this.player.play('idleDownLeft');
				} else if(dir == "UPRIGHT") {
					this.player.play('idleUpRight');
				} else if(dir == "DOWNRIGHT") {
					this.player.play('idleDownRight');
				} else {
					this.player.play('idleUp');
				}
			}
		}
	},

	handleWalkAnim: function() {
		if (dir == "UP") {
			this.player.play('walkUp');
		} else if (dir == "DOWN") {
			this.player.play('walkDown');
		} else if (dir == "LEFT") {
			this.player.play('walkLeft');
		} else if (dir == "RIGHT") {
			this.player.play('walkRight');
		} 
		// diagonal movements
		else if(dir == "UPLEFT") {
			this.player.play('walkUpLeft');
		} else if(dir == "UPRIGHT") {
			this.player.play('walkUpRight');
		} else if(dir == "DOWNLEFT") {
			this.player.play('walkDownLeft');
		} else if(dir == "DOWNRIGHT") {
			this.player.play('walkDownRight');
		}

		if (NPCdir == "UP") {
			npc.play('walkNPCUp');
		} else if (NPCdir == "DOWN") {
			npc.play('walkNPCDown');
		} else if (NPCdir == "LEFT") {
			npc.play('walkNPCLeft');
		} else if (NPCdir == "RIGHT") {
			npc.play('walkNPCRight');
		} 
		// diagonal movements
		else if(NPCdir == "UPLEFT") {
			npc.play('walkNPCUpLeft');
		} else if(NPCdir == "UPRIGHT") {
			npc.play('walkNPCUpRight');
		} else if(NPCdir == "DOWNLEFT") {
			npc.play('walkNPCDownLeft');
		} else if(NPCdir == "DOWNRIGHT") {
			npc.play('walkNPCDownRight');
		}
	},

	textFunc: function() {
		if(textActive == false) {
			keysDisabled = true;
			// ====== CREATE TEXT =======
			lvlText = game.add.text(0, 0, '', {font: "16px Courier", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle" });
			lvlText.fixedToCamera = true;
			lvlText.cameraOffset.setTo(game.world.width/3/2 - 25, 100);

			game.world.bringToTop(textOverlay);
			game.world.bringToTop(lvlText);

			textActive = true;
			game.add.tween(textOverlay).to( { alpha: 0.8 }, 250, "Linear", true);
			game.time.events.add(400, function(){
				this.textAnim();
			}, this);
			ranText = 1;
		}
	},

	resetText: function() {
		if(textActive == true) {
			textActive = false;
			textComplete = false;
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

	levelTrigger: function(player, exit) {
		// if not holding a pot, allow player to finish level
		if (grabbedPot == null) {
			enterNextLevel = true;
			keysDisabled = true;
			// make player move autpmatically through door
			game.world.bringToTop(textOverlay);
			game.add.tween(textOverlay).to( { alpha: 1 }, 250, "Linear", true);

			// reenable keys JUST before next level
			game.time.events.add(Phaser.Timer.SECOND * 0.99, function() {
				keysDisabled = false;
			}, this);

			// next level after 1 second
			game.time.events.add(Phaser.Timer.SECOND * 1, lvl3P1End, this);

		} else { // if holding a pot, throw it, recurse function
			this.levelTrigger();
		}
	},

	render: function() {

		if(showDebug) {
			game.debug.body(gridCheck);

			// see pickup hitbox for player and pot
			game.debug.geom(grabPotRect,'#0fffff');
		
			// show collision body for player
			game.debug.body(this.player);

			// show collision body for pots
			potGroup.forEachAlive(function(potDebug) {
				game.debug.body(potDebug);
			}, this);

			// show collision body for thrown pot
			throwGroup.forEachAlive(function(throwDebug) {
				game.debug.body(throwDebug);
			}, this);
		}
	}

};


function printBoard (array,x,y) {

	for (var r = 0; r < y; r++){ 
		console.log(array[c]);
	}
	return array;
};


function lvl3P1End() {
	if(exitNum == 1) {
		game.state.start('Level3-2',true,false);
	} else if(exitNum == 2) {
		game.state.start('Level3-3',true,false);
	}
};
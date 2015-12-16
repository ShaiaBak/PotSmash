var _TILESIZE = 32;

var map;
var bgLayer;
var blockedLayer;
var triggerLayer;
var levelExitLayer;
var objectLayer;
var dir = "DOWN";
var playerSpeed = 100; //100 is a arbitrary default value
var potGroup; //group with all the pots
var throwGroup; //group with all the thrown pots
var grabbedPot;
var grabPotRect; //the rectangle area the player can grab pots
var exitBool = 0; // if 0, exit doesn't work
var potSoundBool = 0;
var keysDisabled = false;
var itemVal = 0;
var objectiveVal = 1;
var showDebug = false;
var enterNextLevel = false;
var spaceDisabled = false;

var enableCollision = true;

var sfxPot1;

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

var Level2P1 = {
	create: function() {
		this.map = this.game.add.tilemap('level2-1');

		//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
		this.map.addTilesetImage('tiles-lvl2-1-32x32', 'gameTiles-lvl-2_1');

		this.bgLayer = this.map.createLayer('backgroundLayer');
		this.blockedLayer = this.map.createLayer('blockedLayer');
		this.detailLayer1 = this.map.createLayer('detailLayer1');
		this.detailLayer2 = this.map.createLayer('detailLayer2');
		this.detailLayer3 = this.map.createLayer('detalLayer3_overChar');
		this.transBlockedLayer = this.map.createLayer('transBlockedLayer');
		this.triggerLayer = this.map.createLayer('triggerLayer');
		this.levelExitLayer = this.map.createLayer('levelExitLayer');
		// this.transBlockedLayer.alpha = 0;
		// this .visible and .renderable instead of alpha to put less strain on sytem when it comes to layers
		this.transBlockedLayer.visible = false;
		this.transBlockedLayer.renderable = false;
		this.blockedLayer.visible = false;
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

		// ========== CREATE ITEM =============
		// for multiple items
		itemGroup = game.add.group();
	   	itemGroup.enableBody = true;

		this.map.createFromObjects('objectsLayer', 133, 'mega_grid', 0, true, false, itemGroup);

		this.game.physics.arcade.enable(itemGroup);

		// only works for single item
		// var itemResult = this.findObjectsByType('item', this.map, 'objectsLayer')
		// this.item = this.game.add.sprite(itemResult[i].x, itemResult[i].y, 'item');
		// this.game.physics.arcade.enable(this.item);

		// this.item.body.immovable = true;

		// =========== CREATE PLAYER ===========
		var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
		this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
		this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		
		// anchor point for player sprite
		this.player.anchor.setTo(.5,.5);
		this.player.scale.setTo(0.5, 0.5);

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
		this.player.animations.add('idleDown', [96, 97], 3 /*fps */, true);
		this.player.animations.add('idleRight', [100, 101], 3 /*fps */, true);
		this.player.animations.add('idleUp', [104, 105], 3 /*fps */, true);
		this.player.animations.add('idleLeft', [108, ,109], 3 /*fps */, true);

		// diagonal animation
		this.player.animations.add('idleDownRight', [98, 99], 3 /*fps */, true);
		this.player.animations.add('idleUpRight', [102, 103], 3 /*fps */, true);
		this.player.animations.add('idleUpLeft', [106, 107], 3 /*fps */, true);
		this.player.animations.add('idleDownLeft', [110, 111], 3 /*fps */, true);

		// pickup idle animation
		this.player.animations.add('pickDown', [32], 8 /*fps */, true);
		this.player.animations.add('pickUp', [48], 8 /*fps */, true);
		this.player.animations.add('pickLeft', [56], 8 /*fps */, true);
		this.player.animations.add('pickRight', [40], 8 /*fps */, true);

		this.player.animations.add('pickUpRight', [44], 8 /*fps */, true);
		this.player.animations.add('pickDownRight', [36], 8 /*fps */, true);
		this.player.animations.add('pickUpLeft', [52], 8 /*fps */, true);
		this.player.animations.add('pickDownLeft', [60], 8 /*fps */, true);

		// pickup walk animation
		this.player.animations.add('pickWalkDown', [33, 34, 35, 32], 8 /*fps */, true);
		this.player.animations.add('pickWalkUp', [49, 50, 51, 48], 8 /*fps */, true);
		this.player.animations.add('pickWalkLeft', [57, 58, 59, 56], 8 /*fps */, true);
		this.player.animations.add('pickWalkRight', [41, 42, 43, 40], 8 /*fps */, true);

		this.player.animations.add('pickWalkUpRight', [45, 46, 47, 44], 8 /*fps */, true);
		this.player.animations.add('pickWalkDownRight', [37, 38, 39, 36], 8 /*fps */, true);
		this.player.animations.add('pickWalkUpLeft', [53, 54, 55, 52], 8 /*fps */, true);
		this.player.animations.add('pickWalkDownLeft', [61, 62, 63, 60], 8 /*fps */, true);

		this.player.animations.add('pushWalkDown', [64, 65, 66, 67], 8 /*fps */, true);
		this.player.animations.add('pushWalkUp', [80, 81, 82, 83], 8 /*fps */, true);
		this.player.animations.add('pushWalkLeft', [88, 89, 90, 91], 8 /*fps */, true);
		this.player.animations.add('pushWalkRight', [72, 73, 74, 75], 8 /*fps */, true);

		this.player.animations.add('pushWalkUpRight', [76, 77, 78, 79], 8 /*fps */, true);
		this.player.animations.add('pushWalkDownRight', [68, 69, 70, 71], 8 /*fps */, true);
		this.player.animations.add('pushWalkUpLeft', [84, 85, 86, 87], 8 /*fps */, true);
		this.player.animations.add('pushWalkDownLeft', [92, 93, 94, 95], 8 /*fps */, true);


		// ========= CREATE POT STUFF =========

		potGroup = game.add.group();
		potGroup.enableBody = true;
		potGroup.physicsBodyType = Phaser.Physics.ARCADE;
		// ============ NEW WAY ================
		this.map.createFromObjects('objectsLayer', 144, 'potSprite_2-1a', 0, true, false, potGroup);
		this.map.createFromObjects('objectsLayer', 145, 'potSprite_2-1b', 0, true, false, potGroup);

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
		// potGroup.callAll('animations.play', 'animations', 'potBreakAnim');

		// ============ OLD WAY =================
		// //find pot locations from tiled and create a pot
		// var potLocArr = this.findObjectsByType('pot1', this.map, 'objectsLayer');
		// //console.log(potLocArr);
		// for (i=0; i<potLocArr.length; i++){
		// 	var pot = potGroup.create(potLocArr[i].x, potLocArr[i].y, 'potSprite_1');
		// 	pot.name = 'pot' + i;
		// 	pot.body.immovable = true;
		// 	pot.scale.setTo(.5, .5);
		// 	console.log("x.pot" + i + ": " + pot.x);
		// }

		// =============== THROW POT ============
		throwGroup = game.add.group();
		throwGroup.enableBody = true;
		throwGroup.physicsBodyType = Phaser.Physics.ARCADE;

		throwGroup.forEach(function(pot) {
			pot.x = pot.x + pot.width/2;
			pot.y = pot.y + pot.height/2;

			pot.body.collideWorldBounds = true;
		});

		// ========= CAMERA STUFF =========

		// set bounds to world for camera and player
		// @TODO: dynamically get bounds from map size
		game.world.setBounds(0, 0, 448, 480);

		// camera follows player
		// follow types:
		// FOLLOW_LOCKON, FOLLOW_PLATFORMER, FOLLOW_TOPDOWN, FOLLOW_LOCKON_TIGHT
		this.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT); 

		//move player with ARROW keys
		this.cursors = this.game.input.keyboard.createCursorKeys();

		//enable space bar
		keySPACE = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//spacebar picks / throws the pot
		keySPACE.onDown.add(function () {
			if(!spaceDisabled) {
				if(grabbedPot == null){
					this.checkPickUp();
				} else {
					this.handleThrow();
				}
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
		game.world.bringToTop(this.detailLayer3);
		this.restart();
	},

	restart: function() {
		console.log('call restart');

		_TILESIZE = 32;
		dir = "DOWN";
		playerSpeed = 100; //100 is a arbitrary default value
		grabPotRect; //the rectangle area the player can grab pots
		exitBool = 0; // if 0, exit doesn't work
		potSoundBool = 0;
		keysDisabled = false;
		itemVal = 0;
		objectiveVal = 1;
		showDebug = false;
		enterNextLevel = false;
		spaceDisabled = false;

		enableCollision = true;

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
	},

	update: function() {
		// collision update
		// player collision (no pot)
		this.game.physics.arcade.collide(this.player, this.blockedLayer);
		this.game.physics.arcade.collide(this.player, this.transBlockedLayer);
		
		// pot collision
		this.game.physics.arcade.collide(this.player, potGroup, this.pushPot);
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

		//item player collision
		this.game.physics.arcade.collide(this.player, itemGroup, this.itemCollect);

		// check to see if pot is running into stuff when it shouldnt
		// this.game.physics.arcade.collide(this.player, potGroup, this.checkOverlap);
		// this.game.physics.arcade.collide(potGroup, potGroup);
		// this.game.physics.arcade.collide(this.blockedLayer, potGroup, this.checkOverlap);
		// this.game.physics.arcade.collide(this.transBlockedLayer, potGroup, this.checkOverlap);

		if (exitBool == 1) {
			this.game.physics.arcade.collide(this.player, this.levelExitLayer, this.levelTrigger, function() {
				// if you finished level and you have no pot, kill collision and pass through
				if(enterNextLevel == true && grabbedPot == null) {
					return false;
				}
				return true;
			}, this);
		} else {
			this.game.physics.arcade.collide(this.player, this.levelExitLayer);
		}

		// temp level ending condition
		if (objectiveComplete == 1) {
			exitBool = 1;
		}

		this.gridCheckFunc();
		this.checkMovement();
		this.handleDirection();

		// anytime a directional key is let go, reset potTimer
		this.game.input.keyboard.onUpCallback = function(e) {
			// console.log(e.keyCode);
			if(e.keyCode == 38 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40 ) {
				pushTimer = 0;
			}
		}

		// of holding a pot, cant push
		// @TODO: ask chloe if she wants pushing pots while holding -  DELETE IF SHE WANTS TO
		if (grabbedPot != null) {
			pushTimer = 0;
		}

		// audio volume - cannot be set inside create function
		sfxPot1.volume = 0.2;
		sfxObj1.volume = 0.1;

		// console.log('pushTimer: ' + pushTimer)
	},

	enableKeys: function() {
		this.player.body.immovable = false;
		this.player.body.moves = true;
		keysDisabled = false;
	},

	gridCheckFunc: function() {
		gridCheck.body.y = 0;
		for (c = 0; c < this.world.height/32; c++) {
			gridCheck.body.x = 0;
			for (r = 0; r < this.world.width/32; r++) {

				// gridcheck goes through the map and checks for all objects that are walls or objects
				// if a wall or object is in the way of a pot being moved, the pot does not move.
				if (this.game.physics.arcade.overlap(gridCheck, this.blockedLayer) ||
					this.game.physics.arcade.overlap(gridCheck, this.transBlockedLayer)) {
					board[c][r] = wallGridVal;

				} else if(this.game.physics.arcade.overlap(gridCheck, potGroup)) {
					board[c][r] = potGridVal;
				} else if (this.game.physics.arcade.overlap(gridCheck, this.player)) {
					board[c][r] = playerGridVal;
				} else if (this.map.getTile(r,c,this.blockedLayer) != null) {
					board[c][r] = wallGridVal;
				} else if (this.map.getTile(r,c,this.transBlockedLayer) != null) {
					board[c][r] = transWallGridVal;
				} else if(this.map.getTile(r,c,this.triggerLayer)) {
					board[c][r] = triggerGridVal;
				} else if(this.map.getTile(r,c,this.levelExitLayer)) {
					board[c][r] = exitGridVal;
				} else {
					board[c][r] = 0;
				}
				
				gridCheck.body.x +=32;
			
			}

			gridCheck.body.y += 32;
		}
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

	checkOverlap: function(obj1, obj2) {
		// first get all of the active tweens
		var tweens = game.tweens.getAll();

		// filter that down to an array of all tweens of the specified object
		var currentTweens = tweens.filter(function(tween) {
			return tween._object === obj2;
		});
	},

	itemCollect: function(player, item) {
		console.log('item picked up');
		sfxObj1.play('moneySFX');
		item.body = null;
		item.destroy();
		itemVal++;
		if(itemVal == objectiveVal) {
			objectiveComplete = 1;
		}
	},
	
	checkMovement: function() {
		//Player is not moving when nothing is pressed
		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;

		// check to see if all win conditions are true
		// make player exit level without player control
		if(exitBool == true && keysDisabled == true && enterNextLevel == true) {
			this.player.body.collideWorldBounds = false;
			this.player.body.velocity.x += playerSpeed/1.5;
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


			// Check touch controls
			if (this.game.touchControl.speed.x > 10) {
				this.player.body.velocity.x = -playerSpeed;

			} else if (this.game.touchControl.speed.x < -10) {
				this.player.body.velocity.x = playerSpeed;
			}

			if (this.game.touchControl.speed.y > 10 ) {
				this.player.body.velocity.y = -playerSpeed;

			} else if (this.game.touchControl.speed.y < -10) {
				this.player.body.velocity.y = playerSpeed;
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
		// all grab pot rect are offset because it registers top left first. needed to offset.
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
		if (grabbedPot == null) {	
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
		} else if (grabbedPot != null) {	
			if (dir == "UP") {
				this.player.play('pickWalkUp');
			} else if (dir == "DOWN") {
				this.player.play('pickWalkDown');
			} else if (dir == "LEFT") {
				this.player.play('pickWalkLeft');
			} else if (dir == "RIGHT") {
				this.player.play('pickWalkRight');
			} 
			// diagonal movements
			else if(dir == "UPLEFT") {
				this.player.play('pickWalkUpLeft');
			} else if(dir == "UPRIGHT") {
				this.player.play('pickWalkUpRight');
			} else if(dir == "DOWNLEFT") {
				this.player.play('pickWalkDownLeft');
			} else if(dir == "DOWNRIGHT") {
				this.player.play('pickWalkDownRight');
			}
		}
	},

	pushPot: function(obj1, obj2) {
		// goes through group 'potGroup' and then makes the children do something
		potGroup.forEach(function(pots) {
			pots.body.immovable = true;
			pots.body.moves = true;
		}, this);
		
		pushTimer++;
		if(pushTimer >= 50) {
			console.log('push');
			spaceDisabled = true;
			switch(dir) {
				case "UP":
				if(board[ obj2.body.y/32 - 1 ][ obj2.body.x/32 ] == 0) {
					game.add.tween(obj2).to( { y: '-'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					// printBoard(board,14,15);
					sfxPot1.play('potPushSFX');
				} else if(board[ obj2.body.y/32 - 1 ][ obj2.body.x/32 ] == triggerGridVal) {
					game.add.tween(obj2).to( { y: '-'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					// make exits work
					exitBool = 1;
				}
				break;

				case "DOWN":
				if(board[ obj2.body.y/32 + 1 ][ obj2.body.x/32 ] == 0) { 
					game.add.tween(obj2).to( { y: '+'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					sfxPot1.play('potPushSFX');
				} else if(board[ obj2.body.y/32 + 1 ][ obj2.body.x/32 ] == triggerGridVal) { 
					game.add.tween(obj2).to( { y: '+'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					// make exits work
					exitBool = 1;
				}
				break;

				case "LEFT":
				if(board[ obj2.body.y/32 ][ obj2.body.x/32 - 1 ] == 0) {
					game.add.tween(obj2).to( { x: '-'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					sfxPot1.play('potPushSFX');
				} else if(board[ obj2.body.y/32 ][ obj2.body.x/32 - 1 ] == triggerGridVal) {
					game.add.tween(obj2).to( { x: '-'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					// make exits work
					exitBool = 1;
				}
				break;

				case "RIGHT":
				if(board[ obj2.body.y/32 ][ obj2.body.x/32 + 1 ] == 0) {
					game.add.tween(obj2).to({ x: '+'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					sfxPot1.play('potPushSFX');
				} else if(board[ obj2.body.y/32 ][ obj2.body.x/32 + 1 ] == triggerGridVal) {
					game.add.tween(obj2).to({ x: '+'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					// make exits work
					exitBool = 1;
				}
				break;

			}
			game.time.events.add(225, function(){
				spaceDisabled = false;
			}, this);
			pushTimer = 0;
		}
	},
	
	//try to pick up a facing nearby pot
	checkPickUp: function() {
		var isCloseToPot = null;
		i=0;
		//go through all the pots to see if the player is facing + close to the pot
		while(i<potGroup.children.length) {
			if(Phaser.Rectangle.intersects(grabPotRect, potGroup.children[i])) {
				isCloseToPot = potGroup.children[i];
				break;
			}
			i++;
		}
		if(isCloseToPot != null && grabbedPot == null){
			// console.log('Is close to ' + isCloseToPot.name);
			this.pickUpPot(isCloseToPot);
		}
	},
	
	//pick up pot
	pickUpPot: function(pot) {
		grabbedPot = pot;
		grabbedPot.body.moves = true;
		this.player.addChild(pot);

		// bring grabbedpot to top layer, above sittign pots
		// move all other pots lower down in layers
		game.world.moveDown(grabbedPot);

		// disable move keys when picking up pot to allow for animation to finish
		this.player.body.immovable = true;
		this.player.body.moves = false;
		keysDisabled = true;
		// after set ammount of time, enable keys
		game.time.events.add(Phaser.Timer.SECOND * 0.2, this.enableKeys, this);

		//have to double size of pot when it overhead for some reason... not sure why
		grabbedPot.scale.setTo(2, 2);
		grabbedPot.x = this.player.width/16;
		grabbedPot.y = this.player.height* -1.5;
	},
	
	handleThrow: function() {
		var potThrowOriginPosX = this.player.x - (this.player.width/2 - 1);
		var potThrowOriginPosY = this.player.y - (this.player.height + 8);

		//remove grabbedPot
		this.player.children[0].destroy();
		grabbedPot = null;

		//create and move thrown pot
		pot = throwGroup.create(potThrowOriginPosX, potThrowOriginPosY, 'potSprite_2-1a');
		pot.animations.add('potBreakAnim', [1, 2, 3, 4], 8 /*fps */, false);
		pot.animations.add('potIdle', [0], 8 /*fps */, true);
		pot.animations.play('potIdle');

		// resize thrown pot collider and set it to the center
		pot.body.setSize(16, 16, 8, 8);

		// bring pot to top layer
		game.world.bringToTop(pot);

		// pot.scale.setTo(.5,.5);
		// play pot throw sound
		sfxPot1.play('throwSFX');

		switch(dir) {
			// enable collision on all directions except up and down
			case "UP":
			pot.y += 2;
			pot.body.velocity.y = -300;
			break;

			case "DOWN":
			pot.y -= 2;
			pot.body.velocity.y = 300;
			break;

			case "LEFT":
			pot.x += 1;
			enableCollision = false;
			pot.body.velocity.x = -300;
			// slight upward motion when throwing
			pot.body.velocity.y = -45;
			// arc on left and right throw
			pot.body.gravity.y = 1200;
			break;

			case "RIGHT":
			pot.x -= 1;
			enableCollision = false;
			pot.body.velocity.x = 300;
			// slight upward motion when throwing
			pot.body.velocity.y = -45;
			// arc on left and right throw
			pot.body.gravity.y = 1200;
			break;


			// diagonal throw - WORKS!
			case "UPRIGHT":
			pot.x -= 1;
			pot.y += 2;
			pot.body.velocity.y = -300*0.75;
			pot.body.velocity.x = 300*0.75;
			break;

			case "DOWNLEFT":
			pot.x += 1;
			pot.y -= 2;
			pot.body.velocity.y = 300*0.75;
			pot.body.velocity.x = -300*0.75;
			break;

			case "UPLEFT":
			pot.x += 1;
			pot.y += 2;
			pot.body.velocity.x = -300*0.75;
			pot.body.velocity.y = -300*0.75;
			break;

			case "DOWNRIGHT":
			pot.x -= 1;
			pot.y -= 2;
			pot.body.velocity.x = 300*0.75;
			pot.body.velocity.y = 300*0.75;
			break;
		}

		// after throwing, temporarily have the pot not able to collide with anything except blocked layer
		game.time.events.add(150, function(pot){
			enableCollision = true;
		}, this);

		// after some time after throwing a pot, destroy pot if it doent hit anything.
		game.time.events.add(250, function(pot){
			// define pots as the thrown pot
			pots = throwGroup;
			// cycle through the sprite group
			// there should only be the pot you threw because the only one part of throwgroup is the one that was thrown
			// all other pots that have been thrown are killed
			pots.forEach(function(pot) {
				// stop pot and then play animation
				pot.body.velocity.x = 0;
				pot.body.velocity.y = 0;
				pot.body.gravity.y = 0;
				pot.animations.play('potBreakAnim', 14, false, true);
				// only play if other pot sound didnt play
				if(potSoundBool == 0) {
					sfxPot1.play('potBreakSFX');
				}
			});
		}, this);
	},

	handlePotBreak: function(pot, wall) {
		pot.animations.play('potBreakAnim', 14, false, true);
		console.log('break');
		pot.body.velocity.x = 0;
		pot.body.velocity.y = 0;
		pot.body.gravity.y = 0;
		sfxPot1.play('potBreakSFX');
		potSoundBool = 1;
		pot.animations.killOnComplete = true;
		// stops other pot break sound from playing until this runs
		pot.events.onAnimationComplete = new Phaser.Signal();
		pot.events.onAnimationComplete.add(function() { 
			game.time.events.add(250, function(){ 
				potSoundBool = 0;
			});
		});
	},

	levelTrigger: function(player, exit) {
		// if not holding a pot, allow player to finish level
		if (grabbedPot == null) {
			enterNextLevel = true;
			keysDisabled = true;
			// make player move autpmatically through door
			this.checkMovement;

			// reenable keys JUST before next level
			game.time.events.add(Phaser.Timer.SECOND * 0.99, function() {
				keysDisabled = false;
			}, this);

			// next level after 1 second
			game.time.events.add(Phaser.Timer.SECOND * 1, lvl2P1End, this);
		} else { // if holding a pot, throw it, recurse function
			this.handleThrow();
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


function lvl2P1End() {
	game.state.start('Level2-2');
};
// full size is 480

// var game = new Phaser.Game(320, 320, Phaser.AUTO);
var game = new Phaser.Game(448, 320, Phaser.CANVAS , '', null);

game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('StartMenu', StartMenu);
game.state.add('Game', Game);

game.state.start('Boot');
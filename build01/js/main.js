var game = new Phaser.Game(320, 480, Phaser.AUTO);

game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('Game', Game);

// temp states for dev
game.state.add('tyler', tyler);
game.state.add('shaia', shaia);

game.state.start('Boot');
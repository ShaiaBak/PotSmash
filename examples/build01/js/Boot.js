//setting game configuration and loading the assets for the loading screen
var Boot = {
  create: function() {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#000';

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //screen size will be set automatically
    this.scale.setScreenSize(true);

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.state.start('Preload');
  }
};
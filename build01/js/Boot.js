//setting game configuration and loading the assets for the loading screen
var Boot = {
  preload: function() {
    this.load.image('loadBar', 'assets/img/load-bar-placeholder.png');
    this.load.image('lanternLogo', 'assets/img/LanternCubed-logo-splash.png');
  },

  create: function() {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#000';

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //screen size will be set automatically
    this.scale.setScreenSize(true); // for older phaser

    // this.scale.updateLayout(true); //for new phaser version

    //physics system
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.state.start('Preload');
  }
};
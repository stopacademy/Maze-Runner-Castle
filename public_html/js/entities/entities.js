// entities.js
game.PlayerEntity = me.Entity.extend({
   init: function(x, y, settings){
       this._super(me.Entity, 'init', [x, y, {
              image: "Runner",
              spritewidth: "794",
              spriteheight: "1123",
              width: 64,
              height: 64,
              getShape: function(){
                  return (new me.Rect(0, 0, 64, 64)).toPolygon();
              }
       }]);
       
       this.renderable.addAnimation("idle", [3]);
       //It takes picturse 8, 9, 10, 11, 12, 13 from the image file of mario and plays an 80 second mile display.
       //this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);
       
       //this.renderable.setCurrentAnimation("idle");
       
       this.body.setVelocity(5, 20);
       
       //It veiws the player even if the mario move left or right.
       me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
       
   },
    update: function(delta) {
        if(me.input.isKeyPressed("right")){
            //It uses the time and frames of the animation of the players
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            
        }else{
            this.body.vel.x = 0;
        }
        
        this.body.update(delta);
        //me.collision.check(this, true, this.collideHandler.bind(this), true);
        
       if(this.body.vel.x !== 0){
            //if(!this.renderable.isCurrentAnimation("smallWalk")) {
               // this.renderable.setCurrentAnimation("smallWalk");
                //this.renderable.setAnimationFrame();
        }
             //this.renderable.setCurrentAnimation("idle");
        }
        
        
        
        //this._super(me.Entity, "update", [delta]);
        //return true;
    //},
    
    //collideHandler: function(response) {
        
    //}
    
});

game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
    },
    
    onCollision: function(){
        //
        //
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer( this.xSpawn, this.ySpawn);
    }
    
});
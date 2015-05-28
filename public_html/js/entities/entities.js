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
                  return (new me.Rect(0, 0, 794, 1123)).toPolygon();
              }
       }]);
       
       this.body.setVelocity(5, 0);
       //me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
       
   },
    update: function(delta) {
        
        
        if(me.input.isKeyPressed("right")){
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(false);
        }else if(me.input.isKeyPressed("left")){
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(true);
        }else{
            this.body.vel.x = 0;
        }
        
        if(me.input.isKeyPressed("up")){
            if(!this.body.jumping && !this.body.falling){
                this.body.jumping = true;
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            }
        }
        }
    
    
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
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer( this.xSpawn, this.ySpawn);
    }
});
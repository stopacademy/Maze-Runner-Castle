// entities.js
game.PlayerEntity = me.Entity.extend({
   init: function(x, y, settings){
       this._super(me.Entity, 'init', [x, y, {
              image: "A Maze Runner",
              spritewidth: "128",
              spriteheight: "128",
              width: 128,
              height: 128,
              getShape: function(){
                  return (new me.Rect(0, 0, 128, 128)).toPolygon();
              }
       }]);
        
       this.body.setVelocity(5, 20);
       
       me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
       
   },
    
        moveRight: function(){
       //adds to set the position of my adding the velocity defined above in
           //setVelocity() and multiplying it by me.timer.tick.
           //me.timer.tick makes the movement look smooth
           this.body.vel.x += this.body.accel.x * me.timer.tick;
           this.facing = "right";
           this.flipX(true);
   },
   
   moveLeft: function(){
           this.facing = "left";
           this.body.vel.x -=this.body.accel.x * me.timer.tick;
           this.flipX(false);
   },
   
   jump: function(){
       this.body.jumping = true;
       this.body.vel.y -= this.body.accel.y * me.timer.tick;
   }
        
        
        
});
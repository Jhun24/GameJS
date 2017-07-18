class OverState{
  constructor(background, boss, circles, top, bottom, ground, distance){
    this.background = background;
    this.boss = boss;
    this.circles = circles;
    this.topPlayground = top;
    this.bottomPlayground = bottom;
    this.playground = ground;
    this.distance = distance;
    this.distanceNow = 0;
    this.Init();
  }
  Init(){
    this.explode = true;
    this.background.frontBackgroundSpeed = 0.5 * this.background.gameSpeed;
    this.background.middleBackgroundSpeed = 0.2 * this.background.gameSpeed;
    this.background.backgroundSpeed = 0.05 * this.background.gameSpeed;
    this.totalDis = 400;
  }
  Render(){
    var canvas = document.getElementById("canvas");
    var ctx  = canvas.getContext("2d");

    this.background.Render_back();
    this.boss.Render();
    this.background.Render_middle();
    this.background.Render_front();

    if(this.explode){
      for(var j = 0; j < this.circles.length; j++){
        var c = this.circles[j]
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI*2, false);
        ctx.fillStyle = "rgba("+c.r+", "+c.g+", "+c.b+", 0.9)";
        ctx.fill();
        c.x += c.vx * 2;
        c.y += c.vy * 2;
        c.radius -= .09;
        if(c.radius < 0 )
        {
          this.circles.splice(j, 1);
        }
        if(this.circles.length <= 0){
          this.explode = false;
        }
      }
    }
    this.bottomPlayground.Render();
    this.topPlayground.Render();
    ctx.save();
    ctx.font = '80pt league Gothic'
    if(!this.explode){
      var num = Math.floor(this.distance).toString();
      var numDigit = num.length;
      ctx.fillText(this.distanceNow.toFixed(2)+"M", (canvasWidth / 2 - 80 - (numDigit)*10) , canvasHeight / 2 - 100);
      ctx.font = '84pt league Gothic'
      ctx.fillStyle = "white"
      ctx.fillText(this.distanceNow.toFixed(2)+"M", (canvasWidth / 2 - 80 - (numDigit)*10) - 3 , canvasHeight / 2 - 100 - 5);
      // ctx.fillText(this.distanceNow.toFixed(2)+'M', canvasWidth / 2 - 70, )
      ctx.save();
      ctx.fillStyle = "white"
      ctx.fillRect(canvasWidth / 2 - 135, canvasHeight / 2 + 20, 100 * 3, 7);
      ctx.fillStyle = "gray"
      ctx.fillRect(canvasWidth / 2 - 135, canvasHeight / 2 + 20, (this.distanceNow / this.totalDis * 100) * 3, 7);

      ctx.restore();

      ctx.restore();
    }


  }
  Update(){
    this.background.Update();
    this.boss.Exit();
    this.topPlayground.Update(this.background.frontBackgroundSpeed);
    this.bottomPlayground.Update(this.background.frontBackgroundSpeed);
    if(!this.explode){
      if(this.distanceNow <= this.distance){
        this.distanceNow += 1
      }
    }

  }
  Notification(){

  }
}

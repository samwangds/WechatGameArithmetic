const space = 30 //留白
const haftSpace = space / 2
const roundRect = require('../util/roundRect')

//底部按钮
export default class BottomButton {

  constructor() {
    this.centerX = sysWidth / 2
    this.btnHeight = sysHeight / 6
    this.btnWidth = this.centerX - space - haftSpace
    this.startY = sysHeight - space - this.btnHeight
    this.btnCenterY = this.startY + this.btnHeight / 2
  }

  touchEventType(x, y) {
    if(y >= this.startY && y <= this.startY + this.btnHeight){
      if (x >= space && x <= space + this.btnWidth){
          return 1
      }

      if (x >= this.centerX + haftSpace && x <= this.centerX + haftSpace + this.btnWidth) {
        return 2
      }
    }
    return 0
  }

  render(ctx) {
    ctx.fillStyle = "#1d90fe"
    roundRect(ctx, space, this.startY, this.btnWidth, this.btnHeight, 10) 
    ctx.fillStyle = "#ff035b"
    roundRect(ctx, this.centerX + haftSpace, this.startY, this.btnWidth, this.btnHeight, 10) 
    
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "80px Arial"
    ctx.fillStyle = "white"


    ctx.fillText(
      "✓",
      space + this.btnWidth / 2,
      this.btnCenterY
    )

    ctx.fillText(
      "✕",
      this.centerX + haftSpace + this.btnWidth / 2,
      this.btnCenterY
    )
    
  }

}


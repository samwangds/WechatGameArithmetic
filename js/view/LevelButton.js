const space = 30 //留白
const haftSpace = space / 2
import VersionCompat from '../base/versionCompat'

//等级
export default class LevelButton {

  constructor() {
    let versionCompat = new VersionCompat()
    this.menuBtn = versionCompat.getMenuButtonBoundingClientRect()
    this.baseX = sysWidth - 10
    this.bastY = 60

    if (this.menuBtn) {
      this.baseX = this.menuBtn.right  
      this.bastY = this.menuBtn.bottom + this.menuBtn.height / 2
    }

  }

  touchEventType(x, y) {
    let len = 3 //估计永远不会改等级数
    // ctx.fillRect(this.baseX - (databus.levels.length - i - 1) * 40 - 40, this.bastY - 8, 40, 16)

    if (y >= this.bastY - 8 && y<=this.bastY + 8) {
      for (let i = 0; i < len; i++) {
        let ix = this.baseX - (len - i - 1) * 40 - 40
        if (x >= ix && x <= ix + 40) {
          return i
        }
      }
    }
   
    return -1
  }

  render(ctx, databus) {


    ctx.textAlign = "right"; 
    ctx.textBaseline = "middle";

    for (let i = 0; i < databus.levels.length ; i++) {
      if (i == databus.level) {
        ctx.fillStyle = "#f56947"
        ctx.font = "bold 16px Arial"
      } else {
        ctx.fillStyle = "white"
        ctx.font = "16px Arial"
      }
     
      ctx.fillText(
        databus.levels[i],
        this.baseX - (databus.levels.length - i - 1) * 40,
        this.bastY
      )

      

    }




    // ctx.fillStyle = "#1d90fe"

    // this.roundRect(ctx, space, this.startY, this.btnWidth, this.btnHeight, 10) 
    // ctx.fillStyle = "#ff035b"
    // this.roundRect(ctx, this.centerX + haftSpace, this.startY, this.btnWidth, this.btnHeight, 10) 
  


   

    // ctx.fillText(
    //   "✕",
    //   this.centerX + haftSpace + this.btnWidth / 2,
    //   this.btnCenterY
    // )
    
  }


}


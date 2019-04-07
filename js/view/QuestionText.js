import VersionCompat from '../base/versionCompat'
 
export default class QuestionText {

  constructor() {

    this.centerX = sysWidth / 2
    this.baseY = sysHeight * 2 / 5

    // https://developers.weixin.qq.com/minigame/dev/api/wx.getMenuButtonBoundingClientRect.html
      let versionCompat = new VersionCompat()
      this.menuBtn = versionCompat.getMenuButtonBoundingClientRect()
      this.tilteTextY = 30
      this.tilteTextYLine2 = this.tilteTextY + 30 
   
      if(this.menuBtn) {
        console.log(this.menuBtn)
        this.tilteTextY = this.menuBtn.top + this.menuBtn.height / 2
        this.tilteTextYLine2 = this.tilteTextY + this.menuBtn.height 
      }


  }

  render(ctx, databus) {
    let questionInfo = databus.questionInfo

    ctx.fillStyle = "#ffffff"
    ctx.font = "90px Arial"
    ctx.textAlign = "center";

    ctx.textBaseline = "bottom";
    ctx.fillText(questionInfo.a + " " +questionInfo.operator +" "+ questionInfo.b, this.centerX, this.baseY)

    ctx.textBaseline = "top";
    ctx.fillText(" = " + questionInfo.answer, this.centerX, this.baseY)


    ctx.fillStyle = "#ffffff"
    ctx.font = "24px Arial"
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    ctx.fillText("最好成绩: " + databus.highScore, 10, this.tilteTextY)
    ctx.fillText("成　　绩: " + databus.score, 10, this.tilteTextYLine2)
    
  }
 
}


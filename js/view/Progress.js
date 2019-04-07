const count = 60 * 3 //定时内的帧数 3
//进度
export default class Progress {

  constructor(ctx) {
    this.ctx = ctx
    // 1s 60 帧
    this.frame = 0
    this.percentWith = sysWidth / count
  }
 
 
  resetProgress() {
    this.frame = 0
    this.render()
  }

  increaseProgress() {
    this.frame++
    let isTimeOut = this.frame > count
    return isTimeOut
  }


  //百分比进度
  render() {  
    let ctx = this.ctx
    let progress = count - this.frame
    ctx.fillStyle = 'red'
    ctx.fillRect(0, sysHeight - 5, this.percentWith * progress, 5)
  }
 
}


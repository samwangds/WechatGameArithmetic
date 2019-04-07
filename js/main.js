import DataBus from './databus'
import QuestionText from './view/QuestionText'
import BottomButton from './view/BottomButton'
import VersionCompat from './base/versionCompat'

let ctx   = canvas.getContext('2d')
let databus = new DataBus() 
let startAnim = true

/**
 * 游戏主函数
 */
export default class Main {
  constructor() { 
    this.init()


    this.versionCompat = new VersionCompat()
    let self = this

    this.loadData()

    let submitAnswer = this.submitAnswer.bind(this)
    wx.onTouchStart(function (e) {
      // console.log(e)
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      if (databus.gameOver) {
        //判断广告等
        self.restart()
      } else {
        let type = self.bottomButton.touchEventType(x, y)
        if(type == 1) {
          submitAnswer(true)
        } else if(type == 2) {
          submitAnswer(false)
        }

      } 

    })
    // this.initHideCallBack()
     
  }

  loadData() {
    let self = this

    wx.showLoading({
      title: 'Loading'
    })
    wx.getStorage({
      key: 'highScore',
      success: function ({ data }) {
        // console.log(data)
        if (data == undefined) {
          data = 0
        }
        databus.highScore = data
      },
      fail: function () { },
      complete: function() {
        databus.isLoading = false
        wx.hideLoading()
        self.restart()
      }

    })
    // this.versionCompat.getUserCloudStorage({
    //   keyList: ['score', 'maxScore'],
    //   success: function (obj) {
    //     let data = obj.wxgame.score
    //     consoloe.log(data)
    //     if (data) {
    //       databus.highScoreNet = data
    //       if (databus.highScore < data){
    //         databus.highScore = data 
    //       }
    //     }

    //   },
    //   fail: function () { },
    //   complete: function() {
    //     databus.isLoading = false
    //     wx.hideLoading()
    //     self.restart()
    //   }
    // })




  }

 

  init() {
    let sysInfo = wx.getSystemInfoSync(), width = sysInfo.windowWidth, height = sysInfo.windowHeight;
    GameGlobal.sysWidth = width
    GameGlobal.sysHeight = height
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.height = height * window.devicePixelRatio;
    canvas.width = width * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.frame = 0 
    this.bindLoop = this.loop.bind(this)
    this.centerY = height / 2
    this.centerX = width / 2 
    this.percentWith = width / 100

    this.qeustionText = new QuestionText()
    this.bottomButton = new BottomButton()
  }
  

  restart() { 
    // 取消上一帧的动画
    startAnim = true
    databus.reset()
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(
    this.bindLoop,
      canvas
    )
  }


  // 实现游戏帧循环
  loop() {  
    if (!startAnim){
      return 
    }
    this.frame++;
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }


  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    if(databus.isLoading) {
      return
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    //背景
    ctx.fillStyle = '#c2eef0' 
    ctx.fillRect(0, 0, canvas.width, canvas.height )
  
    this.renderPercentLine()

    this.qeustionText.render(ctx, databus)
    this.bottomButton.render(ctx)
    
  }

  //百分比进度
  renderPercentLine() {

    let goLeft = Math.floor(this.frame / 100) % 2
    let percent = this.frame % 100
    // 不整除就是向左
    if (goLeft) {
      percent = 100 - percent
    }

    ctx.fillStyle = 'red'
    ctx.fillRect(0, sysHeight - 5, this.percentWith * percent, 5)
  }

  submitAnswer(answer) {
    if (answer == databus.questionInfo.rightAnswer) {
      databus.updateScore(databus.score+1)
      databus.randomQuestionInfo()
      console.log("对了，分数："+databus.score)
    } else {
      this.gameOver()
    }
  }

  gameOver() {
    startAnim = false
    databus.gameOver = true 
    let self = this
    let restart = self.restart.bind(self)
    let continueGame = self.continueGame.bind(self)
    wx.showModal({
      title: '游戏结束',
      content: '观看广告可继续答题',
      cancelText: '重新开始',
      confirmText:'继续答题',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          self.continueGame()
        } else if (res.cancel) {
          console.log('用户点击取消')
          restart()
        }
      }

    })

  }

  continueGame() {
    startAnim = true
    databus.gameOver = false 
    
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

// initHideCallBack(){
//   let self = this
//   wx.onHide(
//     function(){
//       console.log("hide------")
//       if (databus.highScore > databus.highScoreNet){
//         //上传新的分数
//         self.versionCompat.setUserCloudStorage({
//           KVDataList: [{ key: 'score', value: databus.highScore +''}],
//           success: res => {
//             databus.highScoreNet = databus.highScore
//             console.log(res);
//             // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
//             let openDataContext = wx.getOpenDataContext();
//             openDataContext.postMessage({
//               type: 'updateMaxScore',
//             });
//           },
//           fail: res => {
//             console.log(res);
//           }
//         });
//       }
//     }
//   )
// }
  
}


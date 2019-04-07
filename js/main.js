import DataBus from './databus'
import QuestionText from './view/QuestionText'
import BottomButton from './view/BottomButton'
import VersionCompat from './base/versionCompat'
import Progress from './view/Progress'
import LevelButton from './view/LevelButton'


let ctx   = canvas.getContext('2d')
let databus = new DataBus() 

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

        type = self.levelButton.touchEventType(x, y)
        if(type >= 0 && type != databus.level) {
            databus.updateLevel(type)
            self.restart()
        }
      } 

    })

    this.render()
  }

  loadData() {
    let self = this

    wx.showLoading({
      title: 'Loading'
    })
    wx.getStorage({
      key: 'highScore',
      success: function (obj) {
        let { data } = obj
        console.log(obj)
        if (data == undefined) {
          data = 0
        }
        databus.highScore = data
      },
      fail: function () { },
      complete: function() {
        databus.isLoading = false
        wx.hideLoading()
        self.start()
      }
    })

    wx.getStorage({
      key: 'level',
      success: function (obj) {
        let { data } = obj
        console.log(obj)
        if (data == undefined) {
          data = 0
        }
        databus.level = data
      },
      fail: function () { },
      complete: function () { 
        self.start()
      }
    })



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
    this.bindLoop = this.loop.bind(this)
    this.centerY = height / 2
    this.centerX = width / 2 

    this.qeustionText = new QuestionText()
    this.bottomButton = new BottomButton()
    this.progress = new Progress(ctx)
    this.levelButton = new LevelButton()

  }

  //开始，未循环
  start() {
    databus.reset()
    this.progress.resetProgress()
    this.render() 
  }

  restart() {  
    this.start() //目前重新开始无特殊逻辑
  }

  startLoop() {
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }


  // 实现游戏帧循环
  loop() {  
    if (databus.gameOver || !databus.startGame){
      return 
    }
    
    if(this.progress.increaseProgress()) {
      //timeout
      this.gameOver()
      return 
    }

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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //背景
    ctx.fillStyle = '#c2eef0' 
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    this.qeustionText.render(ctx, databus)
    this.levelButton.render(ctx, databus)
    this.bottomButton.render(ctx)
    this.progress.render()
    
  }

 

  submitAnswer(answer) {
    databus.startGame = true
    if (answer == databus.questionInfo.rightAnswer) {
      databus.updateScore(databus.score + 1 + databus.level)
      databus.randomQuestionInfo()
      this.progress.resetProgress()
      if (databus.startGame) {
        databus.startGame = true
        this.startLoop()
      }
      console.log("对了，分数："+databus.score)
    } else {
      this.gameOver()
    }
  }

  gameOver() {

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
    databus.startGame = false
    databus.gameOver = false 
    this.progress.resetProgress()
    this.render() 
     
  }
  
}


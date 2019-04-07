let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this
    this.highScore = 0 //最高分   
    this.isLoading = true
    this.reset()
    this.levels = ['普通', '困难', '地狱']
    this.level = this.levels[0]
    this.highScoreNet = 0
  }

  reset() {
    this.score      = 0
    this.gameOver = false
    this.randomQuestionInfo()
  }

  updateScore(score) {
    this.score = score
    if (score > this.highScore) {
      this.highScore = score
      wx.setStorage({ key: 'highScore', data: this.highScore})
    }
  }

  //随机生成题目
  randomQuestionInfo() {
    //Math.random();  //0.0 ~ 1.0 之间的一个伪随机数。【包含0不包含1】 //比如0.8647578968666494
    
    let questionInfo = {}
    questionInfo.a = Math.floor(Math.random() * 11 ) //下取整得到：0 - 10
    questionInfo.b = Math.floor(Math.random() * 10 + 1) // 1-10
    questionInfo.operator = "+"
    questionInfo.rightAnswer = Math.random() < 0.5  //正确答案
    questionInfo.answer = questionInfo.a + questionInfo.b
    if (!questionInfo.rightAnswer){
      //随机一个错误结果
      let newAnswer
      do {
        newAnswer = Math.floor(Math.random() * 20 + 1)
      }
      while (questionInfo.answer == newAnswer)
      questionInfo.answer = newAnswer
    }

    this.questionInfo = questionInfo
    console.log(questionInfo)

  }




  
 
}

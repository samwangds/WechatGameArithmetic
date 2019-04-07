let instance
const operators = ['+','-','x','÷']

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
    this.level = 0
    // this.highScoreNet = 0
  }

  reset() {
    this.score      = 0
    this.gameOver = false
    this.startGame = false
    this.randomQuestionInfo()
  }

  updateScore(score) {
    this.score = score
    if (score > this.highScore) {
      this.highScore = score
      wx.setStorage({ key: 'highScore', data: this.highScore})
    }
  }

  updateLevel(level){
    this.level = level 
    wx.setStorage({ key: 'level', data: this.level })
  }

  //随机生成题目
  randomQuestionInfo() {
    //Math.random();  //0.0 ~ 1.0 之间的一个伪随机数。【包含0不包含1】 //比如0.8647578968666494
    
    let questionInfo = {}
    questionInfo.a = Math.floor(Math.random() * 11 ) //下取整得到：0 - 10
    questionInfo.b = Math.floor(Math.random() * 10 + 1) // 1-10
    questionInfo.rightAnswer = Math.random() < 0.5  //正确答案

    switch (this.level) {
      case 0: //简单，纯加
        questionInfo.operator = "+"
        this.completeQuestion(questionInfo)
        break;
      case 1: //困难，加减
        questionInfo.operator = operators[Math.floor(Math.random() * 2)]
        this.completeQuestion(questionInfo)
        break;
      case 2:
        questionInfo.operator = operators[Math.floor(Math.random() * 4)]
        this.completeQuestion(questionInfo)
        break;  
    }
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

  completeQuestion(questionInfo){
    switch (questionInfo.operator) {
      case '+':
        questionInfo.answer = questionInfo.a + questionInfo.b
      break
      case '-':
        questionInfo.answer = questionInfo.a - questionInfo.b
        if (questionInfo.answer < 0){
          questionInfo.answer = -questionInfo.answer
          let tmp = questionInfo.a 
          questionInfo.a = questionInfo.b
          questionInfo.b = tmp
        }  
      break
      case 'x':
        questionInfo.answer = questionInfo.a * questionInfo.b
      break
      case '÷':
        questionInfo.answer = questionInfo.a * questionInfo.b 
        let tmp = questionInfo.a
        questionInfo.a = questionInfo.answer
        questionInfo.answer = tmp
      break
    }
  }




  
 
}

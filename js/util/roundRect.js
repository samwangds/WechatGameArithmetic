/** 
 *  
 * @param {CanvasContext} ctx canvas上下文 
 * @param {number} x 圆角矩形选区的左上角 x坐标 
 * @param {number} y 圆角矩形选区的左上角 y坐标 
 * @param {number} w 圆角矩形选区的宽度 
 * @param {number} h 圆角矩形选区的高度 
 * @param {number} r 圆角的半径 
 */
module.exports = function(ctx, x, y, w, h, r) {
  // 开始绘制 
  ctx.beginPath()
  // 因为边缘描边存在锯齿，最好指定使用 transparent 填充 
  // 这里是使用 fill 还是 stroke都可以，二选一即可 

  ctx.strokenStyle = 'transparent'
  // 左上角 
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

  // border-top 
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.lineTo(x + w, y + r)
  // 右上角 
  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

  // border-right 
  ctx.lineTo(x + w, y + h - r)
  ctx.lineTo(x + w - r, y + h)
  // 右下角 
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

  // border-bottom 
  ctx.lineTo(x + r, y + h)
  ctx.lineTo(x, y + h - r)
  // 左下角 
  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

  // border-left 
  ctx.lineTo(x, y + r)
  ctx.lineTo(x + r, y)

  // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应 
  ctx.fill()
  // ctx.stroke() 
  // ctx.closePath() 
  // 剪切 
  // ctx.clip() 
} 
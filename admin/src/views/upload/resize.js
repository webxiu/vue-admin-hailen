//通过canvas的toDataURL获取图片的base 64编码url地址
export default function resizeImage (url, width, height, callback) {
  var sourceImage = new Image()//实例化一个img标签
  //图片加载完毕执行
  sourceImage.onload = function (evt) {
    console.info('resizeImage width:' + sourceImage.width)
    console.info('resizeImage height:' + sourceImage.height)
    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    if (sourceImage.width === sourceImage.height) {//图片宽高相等
      canvas.getContext('2d').drawImage(sourceImage, 0, 0, width, height)
    } else {//图片宽高不相等取最小的
      let minVal = Math.min(sourceImage.width, sourceImage.height)
      if (sourceImage.width > sourceImage.height) {//宽大于高,从x轴中间裁剪
        canvas.getContext('2d').drawImage(sourceImage, (sourceImage.width - minVal) / 2, 0, minVal, minVal, 0, 0, width, height)
      } else {//宽小于高,从y轴中间裁剪
        canvas.getContext('2d').drawImage(sourceImage, 0, (sourceImage.height - minVal) / 2, minVal, minVal, 0, 0, width, height)
      }
    }
    callback(canvas.toDataURL())
  }

  sourceImage.src = url
}

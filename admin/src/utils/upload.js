/**
 * 文件类型转换
 * @param {File} file 文件
 * @param {string} type 文件转换类型
 */
export function fileParse(file, type = 'base64') {
  return new Promise(resolve => {
    const fileRead = new FileReader()
    if (type === 'base64') {
      fileRead.readAsDataURL(file)
    } else if (type === 'buffer') {
      fileRead.readAsArrayBuffer(file)
    }
    fileRead.onload = (ev) => {
      resolve(ev.target.result)
    }
  })
}


/**
 * 获取年月日
 * @param {Date} date 日期
 */
export function getYearMonthDay(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return {
    year, month, day
  }
}

/**
 * new 日期
 * @param {Date} date 日期
 */
export function getDate(year, month, day) {
  return new Date(year, month, day)
}

/**
 * @function getCurTimeStamp 获取当前时间戳
 * @returns {Number} 当前时间的时间戳，秒级
 */
const getCurTimeStamp = ()=>{
    return new Date().getTime()
}

module.exports = {
    getCurTimeStamp
}

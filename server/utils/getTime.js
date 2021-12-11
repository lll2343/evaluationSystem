/**
 * @function getCurTimeStamp 获取当前时间戳
 * @returns {Number} 当前时间的时间戳，秒级
 */
const getCurTimeStamp = ()=>{
    return new Date().getTime()
}

function format (shijian) {
    let date = new Date(shijian)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
}


module.exports = {
    getCurTimeStamp,
    format
}

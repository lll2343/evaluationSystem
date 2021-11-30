/**
 * @function createSixNum 产生六位的随机数字字符串
 * @returns {String} 六位随机字符串
 */
const createSixNum = () => {
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

module.exports = {
    createSixNum
}
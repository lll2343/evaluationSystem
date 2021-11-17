function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}
async function f(n, duration) {
    process.stdout.write(n + '\b')
    //   console.log(n);
    await sleep(duration);
}
const readline = require('readline-sync');

async function main(len) {
    // var len = 4
    var numGames = 3

    for (var g = 0; g < numGames; g++) {
        var duration = 1000
        var duration_sep = 200
        var record = new Array()
        var n
        for (var i = 0; i < len; i++) {
            n = Math.floor(Math.random() * 10)
            record[i] = n
            await f(' ', duration_sep)
            await f(n.toString(), duration);
        }
        process.stdout.write(' \b')
        // for (var i = 0; i < len; i++) {
        //     process.stdout.write(record[i].toString())
        // }
        // console.log('')
        var R = record
        sleep(0).then(() => {
            let answer = readline.question("Input your answer: ");
            if (answer.length != len) {
                console.log('Silly! You are even wrong with the Length of Number!')
            } else {
                // console.log('You are not fool')
                var isSame = true
                for (var i = 0; i < len; i++) {
                    if (R[i].toString() != answer[i].toString()) {
                        // console.log(R[i]+ ' and ' + answer[i])
                        isSame = false
                        break
                    }
                }
                if (isSame) {
                    len++
                    console.log('You smart ass.')
                }else{
                    console.log('You make a misatke. The answer is ' + R + ' It dosn\'t matter. Come on!')
                }
            }
            let confirm = readline.question('Press ENTER to continue...\r')
        })
    }
}

var len = 4
main(len)
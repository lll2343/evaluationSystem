let Url = [];
let questionUrl = [];
let des = ['A','B','C','D','E']

for(let i=0;i<5;i++) {
    for(let k=1;k<=12;k++){
        questionUrl.push(`Raven_${des[i]}${k}_0.jpg`);
        let tmp = []
        for(let j=1;j<=8;j++){
            tmp.push(`Raven_${des[i]}${k}_${j}.jpg`);
        }
        Url.push(tmp);
    }
}

console.log(Url)

// console.log(questionUrl)


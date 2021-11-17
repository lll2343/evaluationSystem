const { encrypt, decrypt } = require('./../utils/cryptpo');

// const hash = encrypt('12321');

// console.log(hash);
// const text = decrypt(hash);
// console.log(text)


// const hash1 = encrypt('1221');
// console.log(hash1);
// const text2 = decrypt(hash1);
// console.log(text2); 

// const hash2 = encrypt('root');
// console.log(hash2);

let text = {
    iv: 'bca02f32eb3031c9af7be45d85a2f3dd',
    content: '3b487ca0'
}

console.log(decrypt(text))

text = {
    iv: '563787a710d4764ce321ebd0eebc1e54',
    content: '66664bb9'
}

console.log(decrypt(text))

text = {
    iv: '4f5c26f49492d7a6165264c1b89e877f',
    content: '7c61'
}

console.log(decrypt(text))
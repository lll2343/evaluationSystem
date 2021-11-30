const { encrypt, decrypt } = require('./../utils/cryptpo');

const hash2 = encrypt('root');
console.log(hash2);

let text = {
    iv: '47142005d445b101db19d1db4e7d8095',
    content: '495ad4d8'
}

console.log(decrypt(text))

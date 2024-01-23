const fs = require('node:fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');
console.log(pathToFile)
const readStream = fs.createReadStream(pathToFile, { encoding: 'utf8' })
readStream.on('data', chunk => {
  console.log(chunk)
})


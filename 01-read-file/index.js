// const fs = require('node:fs');

// const path = fs.createReadStream('./01-read-file/text.txt');

// const data = [];

// path.on('data', (chunk) => {
//   data.push(chunk);
// });

// path.on('end', () => {
//   const fileContent = Buffer.concat(data).toString();
//   console.log(fileContent);
// });

// path.on('error', (err) => {
//   console.error(err);
// });
//-------------//
const fs = require('node:fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');
console.log(pathToFile)
const readStream = fs.createReadStream(pathToFile, { encoding: 'utf8' })
readStream.on('data', chunk => {
  console.log(chunk)
})
console.log(readStream)
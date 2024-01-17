//=========================================
// const fs = require('node:fs');
// const path = require('path');
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const pathToFile = path.join(__dirname, './text.txt');

// const startPrompt = () => {
//   rl.question('Enter text (or type "exit" to quit): ', (input) => {
//     if (input.toLowerCase() === 'exit') {
//       console.log('Farewell! Process terminated.');
//       rl.close();
//     } else {
//       fs.appendFile(pathToFile, input + '\n', (err) => {
//         if (err) throw err;
//         console.log('Text appended to file!');
//         startPrompt();
//       });
//     }
//   });
// };

// fs.writeFile(pathToFile, '', (err) => {
//   if (err) throw err;
//   console.log('Text file created!');
//   startPrompt();
// });

// ====================================
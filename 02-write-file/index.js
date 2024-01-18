const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, './text.txt');
const readline = require('readline');

let rl = readline.createInterface(
  process.stdin, process.stdout);
//обработчик на прерывание
  rl.on('SIGINT', () => {
    console.log('\nBye, see you next time!');
    process.exit();
  });

createTextFile()

function getPhrase() {
  rl.question('Input text or type "exit"( use Ctr + c combination) to finish ', (input) => {
    if (input === 'exit') {
      console.log('Bye, see you next time!')
      rl.close();
    } else {
      addInputInFile(input);
      console.log('Your have typed: ' + input);
      getPhrase();
    }
  });
}

function createTextFile() {
  fs.open(pathToFile, 'w', (err) => {
    if (err) throw err;
    console.log('File created');
  });
  getPhrase()
}

function addInputInFile(data) {
  fs.appendFile(pathToFile, data + '\n', (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('input was append in file')
    }
  });
}
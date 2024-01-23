const fs = require('fs/promises');
const path = require('path');

async function copyFilesToArray() {
  const dataArr = [];
  const src = path.join(__dirname, 'styles');

  try {
    const files = await fs.readdir(src);
    for (const file of files) {
      if (file.endsWith('.css') && (await fs.stat(path.join(src, file))).isFile()) {
        const filePath = path.join(src, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        dataArr.push(fileContent);
      }
    }
    console.log('All files are up-to-date!');
    return dataArr;
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

async function writeFile() {
  const data = await copyFilesToArray();
  const src = path.join(__dirname, 'project-dist/bundle.css');
  try {
    const files = await fs.writeFile(src, data);
  }
  catch (err) {
    console.error('Error copying file:', err);
  }
}

writeFile()
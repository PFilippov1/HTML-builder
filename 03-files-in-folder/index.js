

const fs = require('fs/promises');
const path = require('path');
const pathToDirectory = path.join(__dirname, 'secret-folder');
async function readDirectory() {
  try {
    const files = await fs.readdir(pathToDirectory, { withFileTypes: true });
    // console.log(files)
    for (const dirent of files) {
      if (dirent.isFile()) {
        const fileName = dirent.name;
        const cutFileName = fileName.split('.')[0]
        const fileExtension = fileName.split('.')[1];
        const fileStats = await fs.stat(path.join(pathToDirectory, fileName));
        // const fileSize = fileStats.size / 1024;
        // убираю округление, тк у ревьюверов вопросы
        const fileSize = fileStats.size;

        console.log(`${cutFileName} - ${fileExtension} - ${fileSize}`);
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

readDirectory();
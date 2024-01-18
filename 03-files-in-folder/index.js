

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
        const fileExtension = fileName.split('.')[1];
        const fileStats = await fs.stat(path.join(pathToDirectory, fileName));
        const fileSizeInKB = fileStats.size / 1024;

        console.log(`${fileName} - ${fileExtension} - ${fileSizeInKB.toFixed(3)}kb`);
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

readDirectory();
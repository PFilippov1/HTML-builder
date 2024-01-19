const fs = require('fs/promises');
const path = require('path');

createDirectory();
async function createDirectory() {
  const directoryPath = path.join(__dirname, 'files-copy');
  try {
    await fs.access(directoryPath);
    console.log('Directory already exists');
    copyFiles();
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(directoryPath, { recursive: true });
      console.log('Directory created successfully!');
      copyFiles();
    } else {
      throw error;
    }
  }
}

async function copyFiles() {
  const src = path.join(__dirname, 'files');
  const dst = path.join(__dirname, 'files-copy');
  try {
    const files = await fs.readdir(src);
    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dst, file);
      await fs.copyFile(srcPath, destPath);
      console.log(`File ${file} copied successfully`);
    }
    console.log('All files are up-to-date!')
  } catch (err) {
    console.error('Error copying files:', err);
  }
}




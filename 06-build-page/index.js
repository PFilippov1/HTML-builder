


const fs = require('fs/promises');
const path = require('path');

createDirectory();
async function createDirectory() {
  const directoryPath = path.join(__dirname, 'project-dist');
  try {
    await fs.access(directoryPath);
    console.log('Directory already exists');
    // copyFiles();
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(directoryPath, { recursive: true });
      console.log('Directory created successfully!');
      // copyFiles();
    } else {
      throw error;
    }
  }
}

async function readAndReplaceTag() {
  try {
    const pathTemplate = await path.join(__dirname, 'template.html')

  } catch (error) {
    console.log(error)
  }
}
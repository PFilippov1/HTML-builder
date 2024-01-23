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
    const srcFiles = await fs.readdir(src);
    const dstFiles = await fs.readdir(dst);
    // Удаляем лишние файлы (каждый раз при копировании)
    for (const file of dstFiles) {
      if (!srcFiles.includes(file)) {
        const filePath = path.join(dst, file);
        await fs.unlink(filePath);
        console.log(`File ${file} removed from destination folder`);
      }
    }
    for (const file of srcFiles) {
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


























// const fsPromises = require('fs/promises');
// const path = require('path');

// const prepareDirDest = async (dir) => {
//   await fsPromises.rm(dir, { recursive: true, force: true });
//   await fsPromises.mkdir(dir, { recursive: true });
// };

// const copyFiles = async (dirSrc, dirDest) => {
//   try {
//     const files = await fsPromises.readdir(dirSrc, { withFileTypes: true });
//     for (const file of files) {
//       if (file.isDirectory()) {
//         await fsPromises
//           .mkdir(path.join(dirDest, file.name), { recursive: true })
//           .then(() => {
//             copyFiles(
//               path.join(dirSrc, file.name),
//               path.join(dirDest, file.name),
//             );
//           });
//       } else {
//         await fsPromises.copyFile(
//           path.join(dirSrc, file.name),
//           path.join(dirDest, file.name),
//         );
//       }
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// const dirSrc = path.join(__dirname, 'files');
// const dirDest = path.join(__dirname, 'files-copy');

// prepareDirDest(dirDest).then(() => {
//   copyFiles(dirSrc, dirDest);
// });




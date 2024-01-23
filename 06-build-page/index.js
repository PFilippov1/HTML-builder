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
    } else {
      throw error;
    }
  }
  // создаем 2 файла: index и styles
  try {
    await fs.writeFile(path.join(__dirname, 'project-dist/index.html'), 'index.html')
    await fs.writeFile(path.join(__dirname, 'project-dist/style.css'), 'style.css')
    console.log('files has been created!');
  } catch (error) {
    console.log(error)
  }
}

async function readAndReplaceTag() {
  try {
    const pathTemplate = path.join(__dirname, 'template.html');
    // Получаем содержимое шаблона
    const dataTemplate = await fs.readFile(pathTemplate, 'utf-8');

    // Заменяем теги в шаблоне на содержимое других файлов
    let newContentTemplate = dataTemplate;

    // Замена тега {{articles}}
    try {
      const articlesContent = await fs.readFile(path.join(__dirname, 'components/articles.html'), 'utf-8');
      newContentTemplate = newContentTemplate.replace('{{articles}}', articlesContent);
    } catch (error) {
      console.error('Error reading articles.html:', error);
    }

    // Замена тега {{footer}}
    try {
      const footerContent = await fs.readFile(path.join(__dirname, 'components/footer.html'), 'utf-8');
      newContentTemplate = newContentTemplate.replace('{{footer}}', footerContent);
    } catch (error) {
      console.error('Error reading footer.html:', error);
    }

    // Замена тега {{header}}
    try {
      const headerContent = await fs.readFile(path.join(__dirname, 'components/header.html'), 'utf-8');
      newContentTemplate = newContentTemplate.replace('{{header}}', headerContent);
    } catch (error) {
      console.error('Error reading header.html:', error);
    }

    // Замена тега {{about}}
    try {
      const aboutContent = await fs.readFile(path.join(__dirname, 'components/about.html'), 'utf-8');
      newContentTemplate = newContentTemplate.replace('{{about}}', aboutContent);
    } catch (error) {
      // console.error('Error reading about.html:', error);
    }

    // Переписываем index.html с обновленным содержимым
    await fs.writeFile(path.join(__dirname, 'project-dist/index.html'), newContentTemplate);

  } catch (error) {
    console.error('Error execution:', error);
  }
}
readAndReplaceTag()

compilesStyles()
async function compilesStyles() {
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
    dataArr.forEach((data) => {
      // console.log(data);
    });
    return dataArr;
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

async function writeCssFile() {
  const data = await compilesStyles();
  const src = path.join(__dirname, 'project-dist/style.css');
  try {
    await fs.writeFile(src, data);
  }
  catch (err) {
    console.error('Error copying file:', err);
  }
  console.log('All files are up-to-date!');
}
writeCssFile()


// копируем директории, файлы и поддиректории с файлами
async function copyDirectory(source, destination) {
  try {
    const entries = await fs.readdir(source, { withFileTypes: true });
    
    for (const entry of entries) {
      const sourcePath = path.join(source, entry.name);
      const destPath = path.join(destination, entry.name);

      if (entry.isDirectory()) {
        await fs.mkdir(destPath, { recursive: true });
        await copyDirectory(sourcePath, destPath);
      } else {
        await fs.copyFile(sourcePath, destPath);
      }
    }

    console.log('Directory copied successfully!');
  } catch (err) {
    console.error(err);
  }
}

copyDirectory(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist/assets'));
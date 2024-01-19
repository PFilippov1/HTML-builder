// const { readFile } = require('fs');
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
    await fs.writeFile(path.join(__dirname, 'project-dist/styles.css'), 'styles.css')
    console.log('file has been created!');
  } catch (error) {
    console.log(error)
  }
}

async function readAndReplaceTag() {
  try {
    const pathTemplate = await path.join(__dirname, 'template.html')
    // получаем string для template
    const dataTemplate = await fs.readFile(pathTemplate, 'utf-8')
    // console.log(readTemplate)
    // получем строки для замены
    const articles = await path.join(__dirname, 'components/articles.html')
    const footer = await path.join(__dirname, 'components/footer.html')
    const header = await path.join(__dirname, 'components/header.html')
    //читаем файлы и меняем контент:
    const newContentTemplate = dataTemplate
      .replace('{{articles}}', await fs.readFile(path.join(__dirname, 'components/articles.html'), 'utf-8'))
      .replace('{{footer}}', await fs.readFile(path.join(__dirname, 'components/footer.html'), 'utf-8'))
      .replace('{{header}}', await fs.readFile(path.join(__dirname, 'components/header.html'), 'utf-8'));
    console.log(newContentTemplate)
    // переписываем index.html
    await fs.writeFile(path.join(__dirname, 'project-dist/index.html'), newContentTemplate)

  } catch (error) {
    console.log(error)
  }
}
readAndReplaceTag()
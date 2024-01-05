// Документация
// 1.В файле package.json в разделе "scripts" нужно написать "translate": "node translationsConfig.js"
// 2.Чтобы запустить переводы, введите `npm run translate Имя_файла Имя_папки`, 'имя файла и имя папки не являются обязательными' в терминале.
// 3.Применимые файлы
// - Файл html должен иметь тег html вида <html lang="en"></html>
// - Файл vue должен иметь тег html вида <template lang="html"><\template>
// 4.Для placeholders формы в конце нужно добавить ключевое слово _place, это условие для ключевых слов в админке

// const axios = require("axios");
module.exports = function () {
  const { extractTextContent } = require("./textExtractor");
  let currentFileNames = [];

  const fs = require("fs");
  const path = require("path");
  const selectedValues = require("./toCreateTranslate");
  const consoleUtils = require("./helpersTranslation/consoleUnits");
  const OUTSIDE_FILES = require("./helpersTranslation/outsideFiles");

  const fileType = selectedValues[1] || "html";
  const folderName =
    selectedValues[0] == OUTSIDE_FILES ? undefined : selectedValues[0];
  async function searchAndReplaceInFolder(folderName) {
    const scriptDirectory = __dirname;
    const targetDirectory = folderName
      ? path.join(scriptDirectory, folderName)
      : scriptDirectory;
    const files = fs.readdirSync(targetDirectory);
    if (files.length == 0) {
      consoleUtils.error("This folder is empty");
    } else {
      searchAndReplaceFiles(targetDirectory);
    }
  }
  function searchAndReplaceFiles(directory) {
    try {
      const files = fs.readdirSync(directory);
      files.forEach((file) => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory() && folderName) {
          console.log("flder", filePath);
          searchAndReplaceFiles(filePath);
        } else if (stats.isFile() && file.endsWith(`.${fileType}`)) {
          currentFileNames.push(filePath);
        }
      });
      extractTextContent(currentFileNames);
    } catch (e) {
      consoleUtils.error(`The folder named "${folderName}" was not found!`);
    }
  }

  consoleUtils.success("Starting process...");
  searchAndReplaceInFolder(folderName);
};

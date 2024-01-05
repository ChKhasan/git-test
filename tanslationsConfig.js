// Документация
// 1.В файле package.json в разделе "scripts" нужно написать "translate": "node translationsConfig.js"
// 2.Чтобы запустить переводы, введите `npm run translate Имя_файла Имя_папки`, 'имя файла и имя папки не являются обязательными' в терминале.
// 3.Применимые файлы
// - Файл html должен иметь тег html вида <html lang="en"></html>
// - Файл vue должен иметь тег html вида <template lang="html"><\template>
// 4.Для placeholders формы в конце нужно добавить ключевое слово _place, это условие для ключевых слов в админке

// const axios = require("axios");
module.exports = function () {
  const fs = require("fs");
  const path = require("path");
  const selectedValues = require("./toTranslate");
  const consoleUtils = require("./helpersTranslation/consoleUnits");
  const templates = require("./helpersTranslation/fileTemplates");
  const getTranslations = require("./helpersTranslation/translationsFile");
  const OUTSIDE_FILES = require("./helpersTranslation/outsideFiles");

  const fileType = selectedValues[1] || "html";
  const folderName =
    selectedValues[0] == OUTSIDE_FILES ? undefined : selectedValues[0];
  const fileTemplate = templates[fileType];

  async function searchAndReplaceInFolder(folderName) {
    const scriptDirectory = __dirname;
    const targetDirectory = folderName
      ? path.join(scriptDirectory, folderName)
      : scriptDirectory;
    const files = fs.readdirSync(targetDirectory);
    if (files.length == 0) {
      consoleUtils.error("This folder is empty");
    } else {
      const texts = await getTranslations();
      const sortByTextLength = Object.entries(texts).sort(
        (a, b) => b[1].length - a[1].length
      );
      consoleUtils.info("Translations list: ");
      console.table(sortByTextLength);
      const placeHolderTexts = await sortByTextLength.filter((elem) =>
        elem[0].includes("_place")
      );
      consoleUtils.info("Placeholder text list: ");

      console.table(placeHolderTexts);

      const simpleTexts = await sortByTextLength.filter(
        (elem) => !elem[0].includes("_place")
      );
      consoleUtils.info("Text list: ");

      console.table(simpleTexts);

      placeHolderTexts.forEach((item, index) => {
        let searchText = `placeholder="${item[1]}"`;
        let replaceText = `:placeholder="$store.state.translations['${item[0]}']"`;
        searchAndReplaceFiles(
          targetDirectory,
          searchText,
          replaceText,
          index,
          true
        );
      });
      simpleTexts.forEach((item, index) => {
        let replaceText = `{{$store.state.translations['${item[0]}']}}`;
        searchAndReplaceFiles(
          targetDirectory,
          item[1],
          replaceText,
          index,
          false
        );
      });
    }
  }
  function searchAndReplaceFiles(
    directory,
    searchText,
    replaceText,
    textIndex,
    isPlace
  ) {
    try {
      const files = fs.readdirSync(directory);
      files.forEach(async (file) => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory() && folderName) {
          consoleUtils.info(
            `${
              isPlace ? "[Placeholder]: " : ""
            }Searching for text ${textIndex} in folder named ${file}...`
          );
          searchAndReplaceFiles(filePath, searchText, replaceText, 2);
        } else if (stats.isFile() && file.endsWith(`.${fileType}`)) {
          consoleUtils.info(
            `${
              isPlace ? "[Placeholder]: " : ""
            }Searching for text ${textIndex} in file named ${file}...`
          );
          let content = fs.readFileSync(filePath, "utf-8");
          const updatedContent = replaceTextInVueTemplate(
            content,
            searchText,
            replaceText
          );
          if (updatedContent !== content) {
            consoleUtils.success(
              `Replaced text ${textIndex} in file: ${filePath}`
            );
          }

          fs.writeFileSync(filePath, updatedContent, "utf-8");
        }
      });
    } catch (e) {
      consoleUtils.error(`The folder named "${folderName}" was not found!`);
    }
  }
  function replaceTextInVueTemplate(content, searchText, replaceText) {
    const regex = fileTemplate;
    const matches = content.match(regex);

    if (matches) {
      const templateContent = matches[1];
      const updatedTemplateContent = templateContent.replace(
        new RegExp(searchText, "g"),
        replaceText
      );
      const updatedContent = content.replace(
        templateContent,
        updatedTemplateContent
      );
      return updatedContent;
    }

    return content;
  }
  consoleUtils.success("Starting process...");
  searchAndReplaceInFolder(folderName);
};

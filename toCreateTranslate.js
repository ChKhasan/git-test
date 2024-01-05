const readline = require("readline");
const folderNames = require("./helpersTranslation/folderNames.js");
const fileTypes = require("./helpersTranslation/fileTypes.js");
const consoleUtils = require("./helpersTranslation/consoleUnits");
const OUTSIDE_FILES = require("./helpersTranslation/outsideFiles");
let selectedFolderIndex = 0;
let selectedFileTypeIndex = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const displayOptions = () => {
  console.clear();
  consoleUtils.info("Choose a folder:");
  folderNames.forEach((category, index) => {
    category == OUTSIDE_FILES
      ? consoleUtils.warning(
          index === selectedFolderIndex
            ? `${index}. ${category}`
            : `${index}. ${category}`
        )
      : console.log(
          index === selectedFolderIndex
            ? `${index}. ${category}`
            : `${index}. ${category}`
        );
  });
  consoleUtils.info("Choose a file type:");
  fileTypes.forEach((option, index) => {
    console.log(
      index === selectedFileTypeIndex
        ? `${index}. ${option}`
        : `${index}. ${option}`
    );
  });

  // console.log("\nSelected file type: ", fileTypes[selectedFileTypeIndex]);
};

displayOptions();

const selectIndices = () => {
  rl.question("Enter the index for the folder: ", (folderIndex) => {
    selectedFolderIndex = parseInt(folderIndex, 10) || 0;

    rl.question("Enter the index for the file type: ", (fileIndex) => {
      selectedFileTypeIndex = parseInt(fileIndex, 10) || 0;

      console.log(
        "\nYou selected: Folder: ",
        folderNames[selectedFolderIndex],
        ", FileType: ",
        fileTypes[selectedFileTypeIndex]
      );
      module.exports = [
        folderNames[selectedFolderIndex],

        fileTypes[selectedFileTypeIndex],
      ];
      const otherFileFunction = require("./createTranslateConfig.js");
      otherFileFunction();
      rl.close();
    });
  });
};

selectIndices();

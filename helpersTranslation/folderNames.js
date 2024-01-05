const fs = require("fs");
const path = require("path");

const folderPath = path.resolve(__dirname, "..");
const OUTSIDE_FILES = require("./outsideFiles");
const folderNames = fs.readdirSync(folderPath).filter((file) => {
  const filePath = path.join(folderPath, file);
  const THIS_FOLDER = "helpersTranslation";
  if (fs.statSync(filePath).isDirectory() && file != THIS_FOLDER) {
    return file;
  }
});
const folderNamesWith = [...folderNames, OUTSIDE_FILES];
module.exports = folderNamesWith;

const axios = require("axios");
const path = require("path");
const fs = require("fs").promises;

module.exports = async function () {
  const jsonFilePath = path.resolve(__dirname, "../translateFile.json");

  // Check if the JSON file exists and is not empty
  let existingData = {};
  try {
    const existingJson = await fs.readFile(jsonFilePath, "utf8");

    if (existingJson.trim() !== "") {
      existingData = JSON.parse(existingJson);
    }
  } catch (readError) {
    // Ignore read errors, assume the file doesn't exist yet
  }

  // const data = await axios.get("https://admin.justlink.uz/api/translations");
  return { ...existingData };
};

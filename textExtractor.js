const fs = require("fs").promises;
const path = require("path");
const consoleUtils = require("./helpersTranslation/consoleUnits");

async function extractTextContent(filePaths) {
  try {
    const jsonFilePath = path.resolve(__dirname, "translateFile.json");

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

    for (const filePath of filePaths) {
      const fileContent = await fs.readFile(filePath, "utf8");
      const templateMatch = fileContent.match(
        /<template lang="html">([\s\S]*?)<\/template>/
      );

      const templateContent = templateMatch ? templateMatch[1].trim() : "";
      const textContent = templateContent
        .replace(/<[^>]+>|{{[^}]+}}/g, "")
        .trim();
        console.log("templateContent",templateContent);
        console.log("templateMatch",templateMatch);
        console.log("textContent",textContent);
      const textArray = textContent.split(/\r?\n/);
      const trimmedTextArray = textArray.map((line) =>
        line.replace(/^\s+/, "")
      );
      const relativePath = path.relative(__dirname, filePath);
      const result = {
        fileName: relativePath.replace(/\//g, "."), // Replace slashes with dots
        lines: trimmedTextArray.filter((elem) => elem != ""),
      };

      // Update existingData with new content
      const fileName = result.fileName.split("\\").at(-1).replace(".vue", "");
      result.lines.forEach((elem, index) => {
        existingData[`${fileName}.${index}`] = elem;
      });
    }

    // Write the updated data back to the JSON file
    console.table(existingData);
    await fs.writeFile(jsonFilePath, JSON.stringify(existingData, null, 2), {
      encoding: "utf8",
      flag: "w",
    });

    consoleUtils.success(
      "Files successfully processed. JSON file updated:",
      jsonFilePath
    );

    return existingData; // Return the updated JSON file object
  } catch (error) {
    consoleUtils.error("Error reading/writing files:", error.message);
    return null;
  }
}

module.exports = { extractTextContent };

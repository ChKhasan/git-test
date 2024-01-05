module.exports = {
  success(message) {
    console.log("\x1b[32m%s\x1b[0m", `✔ ${message}`);
  },

  error(message) {
    console.error("\x1b[31m%s\x1b[0m", `✖ ${message}`);
  },

  warning(message) {
    console.warn("\x1b[33m%s\x1b[0m", `⚠ ${message}`);
  },

  info(message) {
    console.log("\x1b[34m%s\x1b[0m", `ℹ ${message}`);
  },
};

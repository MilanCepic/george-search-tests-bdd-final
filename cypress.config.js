const { defineConfig } = require("cypress");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on("file:preprocessor", async (file) => {
        const outputPath = path.join(file.outputPath, "out.js");

        await esbuild.build({
          entryPoints: [file.filePath],
          bundle: true,
          outfile: outputPath,
          format: "iife",
          platform: "browser",
          target: "es2020",
          plugins: [createEsbuildPlugin(config)],
          write: true,
          globalName: "cypress",
        });

        return outputPath;
      });

      return config;
    },
    specPattern: "cypress/features/**/*.feature",
    supportFile: "cypress/support/e2e.js",
  },
  viewportWidth: 1280,
  viewportHeight: 720,
});

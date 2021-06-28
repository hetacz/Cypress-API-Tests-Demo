/// <reference types="cypress" />

const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)

  if(!fs.existsSync(pathToConfigFile)){
    return {};
  }

  return fs.readJson(pathToConfigFile)
}

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  const file = config.env.configFile

  return getConfigurationByFile(file)
}

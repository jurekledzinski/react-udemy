const { merge } = require("webpack-merge");

const commonConfiguration = require("./webpack/common");
//commonConfiguration wspólna konfiguracja na wstepie

module.exports = (_env, { mode }) => {
  const properlyConfig = require(`./webpack/${mode}`);
  const mergedConfig = merge(commonConfiguration, properlyConfig);
  return mergedConfig;
};

//properlyConfig to wybierze nam odpowiednia wersje przekazna przez mode

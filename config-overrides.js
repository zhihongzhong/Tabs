const createRewireLess = require('./configs/less-config');
const createRewireSass = require('./configs/sass-config');
module.exports = function override(config,env){
  config = createRewireLess()(config,env);
  config = createRewireSass()(config,env);
  return config;
}
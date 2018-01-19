const path = require('path');
const {getLoader, loaderNameMatches} = require('react-app-rewired');

function createRewireLless(lessLoaderOptions = {}){
  return function(config,env){
    const lessExtension = /\.less?$/;

    const fileLoader = getLoader(config.module.rules,
    (rule)=>loaderNameMatches(rule,'file-loader'));

    fileLoader.exclude.push(lessExtension);

    const cssLoader = getLoader(config.module.rules,
      (rule)=>String(rule.test)===String(/\.css$/));
    
    let lessRules;
    if(env==='production'){
      lessRules = {
        test:lessExtension,
        loader:[
          ...cssLoader.loader,
          {loader:'less-loader',options:lessLoaderOptions}
        ]
      };
    }else{
      lessRules = {
        test:lessExtension,
        use: [
          ...cssLoader.use,
          {loader:'less-loader',options:lessLoaderOptions}
        ]
      };
    }
    
    const oneOfRule =  config.module.rules.find((rule)=>rule.oneOf!==undefined);
    if(oneOfRule){
      oneOfRule.oneOf.unshift(lessRules);
    }else{
      config.module.rules.push(lessExtension);
    }
    return config;
  };
}

module.exports = createRewireLless;
 
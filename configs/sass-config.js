const path = require('path');
const {getLoader, loaderNameMatches} = require('react-app-rewired');

function createRewireSass(sassRewireOptions = {}){
  return function(config,env){
    const sassExtension = /\.scss?$/;

    const fileLoader = getLoader(config.module.rules,
    (rule)=>loaderNameMatches(rule,'file-loader'));

    fileLoader.exclude.push(sassExtension);

    const cssLoader = getLoader(config.module.rules,
      (rule)=>String(rule.test)===String(/\.css$/));
    
      let sassRules;
      
      if(env === 'production'){
        // production environment 
        // use 'loader'
        sassRules = {
          test: sassExtension,
          loader:[
            ...cssLoader.loader,
            {loader:'sass-loader',options:sassRewireOptions}
          ]
        };
      }else{
        sassRules = {
          test: sassExtension,
          use:[
            ...cssLoader.use,
            {loader:'sass-loader',options:sassRewireOptions}
          ]
        };
      }

      let oneOfRule = config.module.rules.find((rule)=>rule.oneOf!==undefined);
      if(oneOfRule){
        oneOfRule.oneOf.unshift(sassRules);
      }else{
        config.module.rules.push(sassRules);
      }
      return config;
  };
}  

module.exports = createRewireSass;
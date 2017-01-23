var testsContext = require.context('./src/client/modules/calculations', true, /.spec\.js$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./src/client/modules/calculations', true, /^((?!__spec__).)*.js$/);
srcContext.keys().forEach(srcContext);

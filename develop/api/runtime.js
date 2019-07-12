const CodotypeRuntime = require('@codotype/runtime');

// // // //

// Instantiates Codotype runtime
const runtime = new CodotypeRuntime();

// Registers local generators for development
// runtime.registerGenerator({ relative_path: '../generator-mount' });

// Registers packaged generators for production deployment
runtime.registerGenerator({ relative_path: '../../../../generators/codotype-hackathon-starter' });
// runtime.registerGenerator({ relative_path: './node_modules/@codotype/codotype-hackathon-starter' });

// // // //

module.exports = runtime

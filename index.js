import fs from 'fs';
import path from 'path';

function getPackageJSONFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(JSON.parse(data));
    });
  });
}

class PackageJsonPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const ref = {
      context: compiler.options.context,
      output: compiler.options.output.path,
      written: compiler.options.written,
      filename: compiler.options.output.filename,
    };

    const destPackageFile = path.resolve(ref.output, 'package.json');

    compiler.plugin('emit', (compilation, callback) => {
      getPackageJSONFile(path.resolve(ref.context, 'package.json'))
        .then(options => {
          const obj = {
            name: options.name,
            version: options.version,
            author: options.author,
            main: ref.filename,
            repository: options.repository,
            licence: options.licence
          };

          const formattedOutput = `${JSON.stringify(obj, null, 2)}\n`;

          compilation.assets['package.json'] = {
            source: () => formattedOutput,
            size: () => formattedOutput.length,
          };

          callback();
        })
        .catch(err => {
          compilation.errors.push(err);
        });
    });
  }
}

export default PackageJsonPlugin;
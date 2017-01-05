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
    // console.log(compiler);
    const ref = {
      context: compiler.options.context,
      output: compiler.options.output.path,
      written: compiler.options.written,
      filename: compiler.options.output.filename
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

          if (!fs.existsSync(ref.output)){
            fs.mkdirSync(ref.output);
          }

          fs.writeFile(destPackageFile, `${JSON.stringify(obj, null, 2)}\n`, () => {
              callback();
          });
        })
        .catch(err => {
          console.error(err);
        });
    });
  }
}

export default PackageJsonPlugin;
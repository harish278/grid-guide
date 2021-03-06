import Config from '../../config';
import { writeFile } from 'fs';
import { join } from 'path';

const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const includePaths = require('rollup-plugin-includepaths');
const rollup = require('rollup');

const config = {
  entry: join(Config.TMP_DIR, Config.BOOTSTRAP_FACTORY_PROD_MODULE),
  sourceMap: true,
  treeshake: true,
  moduleName: 'main',
  onwarn: function (message: any) {
      // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
      // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
      if (/The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten./.test(message)) {
          return;
      }
    //   console.error(message);
  },
  plugins: [
    includePaths({
      include: {},
      paths: [join(Config.TMP_DIR, 'app')],
      external: [],
      extensions: ['.js', '.json', '.html', '.ts']
    }),
    nodeResolve({
      jsnext: true, main: true, module: true
    }),
    commonjs({ //See project.config.ts to extend
      include: Config.ROLLUP_INCLUDE_DIR,
      namedExports: Config.getRollupNamedExports()
    })
  ]
};


export = (done: any) => {
  rollup.rollup(config)
    .then((bundle: any) => {
      const result = bundle.generate({
        format: 'iife'
      });
      const path = join(Config.TMP_DIR, 'bundle.js');
      writeFile(path, result.code, (error: any) => {
        if (error) {
          console.error(error);
          process.exit(0);
        }
        done();
      });
    })
    .catch((error: any) => {
      console.error(error);
      process.exit(0);
    });
};

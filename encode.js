const Encoder = require('./src/encoder/index')
const yaml = require('yaml');
const fs = require('fs-extra');
const config = yaml.parse(fs.readFileSync(`${__dirname}/config.yml`, 'utf-8'));

Encoder.run(config.patchKey);
const PatchServer = require('./src/server/index');
const yaml = require('yaml');
const fs = require('fs-extra');
const config = yaml.parse(fs.readFileSync(`${__dirname}/config.yml`, 'utf-8'));

(new PatchServer(config.patchKey, config.port)).start();
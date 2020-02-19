const express = require('express');
const app = express();
const fs = require('fs-extra');
const yaml = require('yaml');

const patchList = yaml.parse(fs.readFileSync(`${__dirname}/patchList.yml`, 'utf-8'));

module.exports = class {
  constructor(patchKey, port) {
    this.patchKey = patchKey;
    this.port = port;

    this.start();
  }

  start() {
    app.get('/patches/:file', (req, res) => {
      if (!req.params.file.endsWith('.npatch'))
        return res.sendStatus(404);
          
      if (!fs.existsSync(`${__dirname}/patches/${req.params.file}`))
        return res.sendStatus(404);
    
      return res.send(fs.readFileSync(`${__dirname}/patches/${req.params.file}`, 'utf-8'));
    });

    app.get('/patchList', (req, res) => {
      return res.send(patchList);
    });
    
    app.listen(this.port);
  }
}
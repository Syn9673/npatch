const fs = require('fs-extra');
const yaml = require('yaml');
const aes256 = require('aes256');

const data = yaml.parse(fs.readFileSync(`${__dirname}/data.yml`, 'utf-8'));

module.exports = {
  run: function(patchKey) {
    /*
      this is where the encrypted data that we will put throught the output file.
      we will add the data to it later
    */
    const patchObject = {};

    for (let patch of data.patches) {
      for (let patchName of Object.keys(patch)) {
        patchObject[patchName] = [];

        for (let files of patch[patchName]) {
          if (!fs.existsSync(`${__dirname}/content/${files}`) ||
          fs.statSync(`${__dirname}/content/${files}`).isDirectory())
            continue;

          const fileData = fs.readFileSync(`${__dirname}/content/${files}`);
          patchObject[patchName].push({ fileName: files, fileData: fileData.toJSON() });
        }
      }
    }
    
    for (let patch of Object.keys(patchObject)) {
      fs.outputFileSync(`${__dirname}/output/${patch}.npatch`,
      aes256.encrypt(patchKey, JSON.stringify(patchObject[patch])))
    }
  }
};
const axios = require('axios');
const fs = require('fs-extra');
const aes256 = require('aes256');
const config = require('./config');

let fileData;

try {
  fileData = require(`${process.cwd()}/${config.patchNumFileName}`);
} catch(err) {
  fs.writeFileSync(`${config.patchNumFileName}.js`, 'module.exports = { patchNum: 0 };');
};

if (!fileData)
  fileData = { patchNum: 0 };

(async() => {
  let patchList = (await axios({
    method: 'get',
    baseURL: `http://${config.host}:${config.port}/patchList`
  })).data;

  patchList = patchList.slice(fileData.patchNum);

  if (patchList.length < 1)
    return console.log('No new updates');

  for (let i = 0; i < patchList.slice(fileData.patchNum).length; i++) {
    console.log(`Fetching patch ${patchList[i]}.npatch ...`);

    const patches = JSON.parse(aes256.decrypt(config.patchKey, (await axios({
      method: 'get',
      baseURL: `http://${config.host}:${config.port}/patches/${patchList[i]}.npatch`
    })).data));

    console.log(`Patching ${patchList[i]}.npatch ...`);

    for (let patch of patches) {
      fs.outputFileSync(`${patch.fileName}`, Buffer.from(patch.fileData));
    }
    
    console.log(`Done patching ${patchList[i]}.npatch\n`)
    
    if (i === patchList.length - 1) {
      fileData.patchNum = patchList.length;

      console.log('\nPatch process done.');
      fs.writeFileSync(`${process.cwd()}/${config.patchNumFileName}.js`, `module.exports = { patchNum: ${fileData.patchNum} };`);
    }      
  }
})()

process.stdin.resume();

process.on('error', () => {
  process.stdin.resume();
});
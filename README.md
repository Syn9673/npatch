## npatch
npatch, a patcher for ragnarok online made with nodejs.

### Installation
- Download the repository as zip.  
- Extract that zip file.  
- Make sure you have nodejs and a text editor for .js files.  
- Open up cmd and go to the main directory of the project.  
- Run `npm install` to install dependencies.  
- Run `npm install pkg -g` so you can create the .exe client (cmd only) for the patcher.

#### Patch Server
This is required so that the patcher can download the files from the web.  
- Edit config.yml on the main directory, and change the patchKey to the desired patch key you want and the port you want.  
- Run `node patchServer` on your cmd  

**DO NOT CLOSE THE PATCH SERVER OR YOU WON'T BE ABLE TO DOWNLOAD THE PATCH FILES**

#### Encoder
- Go to the `/src/encoder` folder and place all your files that you want to patch inside the `content` folder.  
- Once done, open up `data.yml` and change the `PatchFileName` to the desired file name of the patch that you want.  
- Then, add the file names that you would want to be included in that patch. For example,  
```yml
patches:
  # this would be the name of the output file
  - PatchFileName1:
    # an array of the files to add to the patch
    - FileToPatch1.txt
    - FileToPatch2.txt

  # Second patch
  - Patch2:
    # an array of files to add to this patch
    - File1.txt
    - File2.lua

```  
- You could add any kind of file that you want on the array.  
- After doing all that, go back to the main directory and run `node encode`.  
- Once that is done, go to the `src/encoder/output` folder and place all the `.npatch` files to the `src/server/patches` folder.  
- Open up `patchList.yml` file inside the `src/server` folder and add the names of the patch files. Example  
```yml
- PatchFileName1
- Patch2
```
- After that, close the patch server and open it up again for the new patch file changes.

#### Client
- Make sure you have `pkg` installed, if not simply run `npm install -g pkg` on cmd.  
- Open up `config.js` and place the patchKey and port of the one that you placed on the `config.yml` file on the main directory.  
- The host is the ip of where the patch server is being run on.  
- After all that, go back to `src/client` folder and run `pkg index.js --target=all --output=patcher.exe`

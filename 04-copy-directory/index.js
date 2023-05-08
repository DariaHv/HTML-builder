const fs = require('fs')
const path = require ("path");
const fsPromises = fs.promises;
const copyFile=fsPromises.copyFile;
fs.mkdir(path.join(__dirname, 'files-copy'), {
    recursive: true,
}, (err) => {
    if (err) {
        
      return console.error(err);
    }
    console.log('Directory created successfully!');
});

fsPromises.readdir(path.join(__dirname,"files"))
.then(files => {
    for(let file of files) {
        const filePath = path.join (__dirname, 'files', file);
        
        copyFile(filePath, path.join (__dirname, 'files-copy',file));
        console.log(file);
    }
});
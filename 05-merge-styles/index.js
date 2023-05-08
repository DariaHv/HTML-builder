const fs = require('fs')
const path = require ("path");
const fsPromises = fs.promises;
const stylesPath = path.join(__dirname, "styles");
const bundlePath = path.join(__dirname, "project-dist/bundle.css");
const output = fs.createWriteStream(bundlePath)
fsPromises
.readdir(stylesPath)
.then(files => {
    for (let file of files) {
        let filePath = path.join(stylesPath, file);
        let fileName = path.basename(filePath);
        let fileExt = path.extname(filePath);
        if(fileExt===".css") {
            const input = fs.createReadStream(path.join(stylesPath, fileName));
            input.on("data", data => {
                output.write(data.toString()+ "\n");
            });
        }
    };
});
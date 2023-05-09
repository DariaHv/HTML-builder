const fs = require('fs')
const path = require ("path");
const fsPromises = fs.promises;
const stylesPath = path.join(__dirname, "styles");
const newIndexPath = path.join(__dirname, "project-dist/index.html");
const bundlePath = path.join(__dirname, "project-dist/style.css");
const assetsPath = path.join(__dirname, "assets");
const newAssetsPath = path.join(__dirname, "project-dist/assets");
const distPath = path.join(__dirname, 'project-dist');
const componentPath = path.join (__dirname, "components");

createDir(distPath);
function createDir (path){
fs.mkdir(path, {
    recursive: true,
}, (err) => {
    if (err) {
        
      return console.error(err);
    }
    console.log("Directory" +path+ "created successfully!");
});
}

const output = fs.createWriteStream(bundlePath)
fsPromises.readdir(stylesPath)
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




copyDir(assetsPath, newAssetsPath);

function copyDir(path1, path2){
  const copyFile=fsPromises.copyFile;
  createDir(path2);
  fsPromises.readdir(path1, {withFileTypes:true})
  .then(items => {
    for(let item of items) {
        const itemPath = path.join (path1, item.name);
        const newItemPath = path.join (path2, item.name)
        if(item.isDirectory()){
            copyDir(itemPath, newItemPath)
         }
        else{
        copyFile(itemPath, newItemPath);
        }
    }
  });
}

var stream = new fs.ReadStream(path.join(__dirname,"template.html"),{encoding:"utf-8"});
stream.on('readable', function(){
    var data = stream.read();
    if(data != null){
    let text = data.toString();
    fsPromises.readdir(componentPath).then(files => {
        for (let file of files) {
            let filePath = path.join(componentPath, file);
            let fileName = path.basename(filePath);
            let fileExt = path.extname(filePath);
            let fn =fileName.replace(fileExt,"");
            console.log(fn);
            if(fileExt===".html") {
                const input = fs.createReadStream(path.join(componentPath, fileName));
                input.on("data", data => {
                    text = text.replace("{{"+
                    fn+"}}", data.toString());
                    const writeableStream = fs.createWriteStream(newIndexPath);
                    writeableStream.write(text);
                });
            }
        };
    });
}
})
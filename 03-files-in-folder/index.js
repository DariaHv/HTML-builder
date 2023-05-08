const fs = require("fs");
const path = require ("path");
const dirPath = path.join(__dirname,"secret-folder");
const fsPromices =  fs.promises;
fs.promises.readdir(dirPath, {withFileTypes:true})
.then (items => {
  for (let item of items) {
    if(!item.isDirectory()){
      let filePath = path.join(__dirname, "secret-folder",item.name);
      let fileName =  path.basename(filePath);
      const fileExt = path.extname(filePath);
      fsPromices. stat(filePath)
      .then(stats =>{
        console.log(`${fileName.replace(fileExt,'')}-${fileExt.replace('.','')}-${Number(stats.size/2000).toFixed(3)}kb`);
      }
        )
    }
}
}
  )

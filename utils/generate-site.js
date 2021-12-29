const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve,reject) => {
        fs.writeFile('./dist/index.html',fileContent, err => {
            // if there is an error, reject Promise and send the error to the catch() method
            if (err) {
                reject(err)
                // return out of the function to make sure the Promise doesn't accidentally execute the resolve() function as well 
                return;
            }
            resolve({
                ok:true,
                message: "File Created!"
            });
        });
    });
};

const copyFile = () =>{
    return new Promise((resolve,reject) =>{
        fs.copyFile('./src/style.css','./dist/style.css',err =>{
            if (err) {
                reject(err)
                return;
            }
            resolve({
                ok:true,
                message: "File was copied"
            });
        });
    });
};

module.exports = {
    writeFile: writeFile,
    copyFile: copyFile,
};
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = [], folder = '') => {
    return new Promise((resolve, reject)=>{
        const { file } = files

        const nameSplitted = file.name.split('.')
        const extension = nameSplitted[nameSplitted.length-1]
    
        const newName = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/',folder, newName)
    
        if(!validExtensions.includes(extension)){
            return reject(`Invalid extension: ${extension}`)
        }
    
        file.mv(uploadPath, function(err) {
            if (err) {
                reject(err)
            }
    
            resolve(newName)
        });
    });
}

module.exports = {uploadFile}
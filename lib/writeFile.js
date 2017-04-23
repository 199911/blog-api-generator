/*
    Write file even parent does not exists
    http://stackoverflow.com/questions/16316330/how-to-write-file-if-parent-folder-doesnt-exist
 */
const mkdirp = require('mkdirp');
const fs = require('fs');
const getDirName = require('path').dirname;
const writeFile = (path, content, cb) => {
    mkdirp(getDirName(path), (err) => {
        if (err) return cb(err);
        fs.writeFile(path, content, cb);
    });
}

module.exports = writeFile;

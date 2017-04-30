const _ = require('lodash');

/*
Input:
    Post objects
Output:
    Post objects with post id and slug
 */

const appendPostData = (post) => {
    const path = require('path');
    const getFileName = (filePath) => {
        const ext = path.extname(filePath);
        return path.basename(filePath, ext);
    }
    post.slug = _.chain(getFileName(post.filePath))
        .lowerCase()
        .words()
        .join('-')
        .value();
    return post;
}

module.exports = appendPostData;

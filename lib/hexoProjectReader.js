/*
Input:
    Hexo-like post content
Output:
    Object with yaml front matter and `__content` is post content in HTML
 */
const hexoPost2json = (fileContent) => {
    const yaml = require('yaml-front-matter');
    const showdown  = require('showdown');
    let post = yaml.loadFront(fileContent);
    const converter = new showdown.Converter();
    post.__content = converter.makeHtml(post.__content);
    return post;
};

/*
Input:
    Path of a directory which contains markdown files
Output:
    Return parse file content in the directory with some file stats:
 */
const extractHexoPosts = (src) => {
    const md2json = require('fcms-md2json');
    const path = require('path');
    const fs = require('fs');
    const glob = require('glob');
    return glob.sync(src + '/**/*.md')
        .map((path) => {
        const fileContent = fs.readFileSync(path, 'utf8');
        let post = md2json(fileContent);
        // Use file creation time if missing date metadata
        if (!post.date) {
            const stat = fs.lstatSync(path);
            post.date = stat.birthtime;
        }
        return post;
    });
};

/*
Input:
    Path of the hexo project directory
Output:
    {
        "drafts": [post objects...],
        "posts": [post objects...]
    }
 */
const hexoProjectReader = (src) => {
    const glob = require('glob');
    const draftsPath = glob.sync(src + '/**/_drafts')[0];
    const postsPath = glob.sync(src + '/**/_posts')[0];
    return {
        'drafts': extractHexoPosts(draftsPath),
        'posts': extractHexoPosts(postsPath)
    };
}

module.exports = hexoProjectReader;

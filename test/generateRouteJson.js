const _ = require('lodash');
const hexoProjectReader = require('../lib/hexoProjectReader');
const appendPostData = require('../lib/appendPostData');
const generateRouteJson = require('../lib/generateRouteJson');

const projectData = hexoProjectReader('../fixture');
const blogData = {
    'drafts': _.map(projectData['drafts'], appendPostData),
    'posts': _.map(projectData['posts'], appendPostData)
};

const json = generateRouteJson(blogData.posts, {
    blogName: 'Test Blog',
    blogRoot: ''
})
console.log(json);

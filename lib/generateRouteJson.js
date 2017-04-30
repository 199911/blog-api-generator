const _ = require('lodash');

// Route JSON files
// blog root
// post root
const generateRouteJson = (posts, option) => {
    let routes = [{
        'title': option.blogName,
        'permalink': option.blogRoot,
    }];
    // TODO: mark permalink as an config function
    _.each(posts, (post) => {
        routes.push({
            'title': post['title'],
            'permalink': `/${post['slug']}`
        });
    });
    return routes
}

module.exports = generateRouteJson;

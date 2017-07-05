var _ = require('lodash');
var request = require('request-promise-native');

/**
@name Article
@interface
@prop {string[]} address
@prop {string} body - Content of article
@prop {string} cover - Generally first element of Article.images
@prop {string[]} images - Contain URL format in the array.
@prop {string} published - ISO8601 format
@prop {string} title
@prop {string} url
*/

/**
Get posts of blogger by bloggerId

link: https://developers.google.com/apis-explorer/?hl=en_US#p/blogger/v3/blogger.posts.list?blogId=7165299480265810458&fetchBodies=false&fetchImages=false&maxResults=500&status=live&_h=1&
*/
function getPostsList(bloggerId, qs = {}, opts = {}) {

  qs = _.defaults({}, qs, {
    key: null,
    maxResults: 20,
    status: 'live',
    fetchBodies: true,
    fetchImages: false,
    pageToken: undefined,
  })

  return request({
    json: true,
    method: 'GET',
    url: `https://www.googleapis.com/blogger/v3/blogs/${bloggerId}/posts`,
    qs,
  })
  .then(async (result) => {

    for (let item of result.items) {
      if (item.location && item.location.name) {
        item.address = item.location.name
      }
    }

    let items = _.map(result.items, (item) => {
      return {
        address: item.address,
        body: item.content,
        cover: _.get(item, 'images[0].url', ''),
        published: item.published,
        images: _.pluck(item.images, 'url'),
        title: item.title,
        url: item.url,
      }
    })

    if (result.nextPageToken) {
      items.nextPageToken = result.nextPageToken
    }

    return items
  })
}

/**
Get detail of blogger by blogspot url
@param qs {object} Url query string params
@param qs.key {string} API key
@return {Promise(object)} Try https://developers.google.com/apis-explorer/?hl=en_US#p/blogger/v3/blogger.blogs.getByUrl?url=http%253A%252F%252Fhappycloud2013.blogspot.tw%252F&_h=6&
*/
function getByUrl(qs = {}) {
  qs = _.defaults({}, qs, {
    key: null,
  })
  return request({
    json: true,
    method: 'GET',
    url: `https://www.googleapis.com/blogger/v3/blogs/byurl`,
    qs,
  })
}

/**
@name findAll
@param {object} options
@param {boolean} [options.fetchAll=false] - If you want to retrieve all the articles form google.
@param {string} options.url - Url of Blogspot.
@param {string} options.key - Server-side API access token from Google Blogger API.
@returns {Article[]}
*/
function findAll(opts = {}) {
  console.log(opts);
  opts = _.defaultsDeep({}, opts, {
    fetchAll: false,
    key: null,
    url: null,
  })
  return getByUrl({ url: opts.url, key: opts.key }).then(rsp => getPostsList(rsp.id, {key: opts.key}));
}

module.exports = {
  findAll: findAll
}

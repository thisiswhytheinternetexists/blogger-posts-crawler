# Blogspot post retriever

## Usage

```sh
npm google-blogger-posts-getter --save
```

## API

#### .findAll()

```
@name findAll
@param {object} options
@param {boolean} [options.fetchAll=false] - If you want to retrieve all the articles form google.
@param {string} options.url - Url of Blogspot.
@param {string} options.key - Server-side API access token from Google Blogger API.
@returns {Article[]}
```

###### Example

```js
var blogger = require('google-blogger-posts-getter');

crawler.findAll({
  url: 'http://thisiswhytheinternetexists.blogspot.com/',
  fetchAll: false,
  key: 'YOUR_API_KEY',
}).then(function(articles) {
	console.log(articles)  // {Article[]}
})
```

## Interfaces

#### Article

```
@name Article
@interface
@prop {string[]} address
@prop {string} body - Content of article
@prop {string} cover - Generally first element of Article.images
@prop {string[]} images - Contain URL format in the array.
@prop {string} published - ISO8601 format
@prop {string} title
@prop {string} url
```

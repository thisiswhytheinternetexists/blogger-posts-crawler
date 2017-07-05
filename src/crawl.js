var crawler = require('./index')
 
crawler.findAll({
  url: 'http://thisiswhytheinternetexists.blogspot.com/',
  fetchAll: false,
  key: 'AIzaSyDLrvDF4wvSs_gqB944Wh2jatQez6uv7XI',
}).then(function(articles) {
	console.log(articles)
})
 


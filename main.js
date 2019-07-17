var http = require('http');
var fs = require('fs');
var url= require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData=url.parse(_url,true).query;
    var title= queryData.id;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname + url);
    fs.readFile(`data/${queryData.id}`,'utf8',function(err,data){
      var description=data;
      var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      response.end(template);
    });
    //response.end(fs.readFileSync(__dirname + url));
});
app.listen(3000);


/*
const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
*/

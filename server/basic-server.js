/* Import node's http module: */
var http = require("http");
var fs = require('fs'); 
var handleRequest = require('./request-handler.js');
var url = require('url'),
    path = require('path'); 

var express = require('express');
var app = express();

app.use('/', express.static('./client'), handleRequest.requestHandler); 

// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = "127.0.0.1";

app.listen(port);
// var index = fs.readFileSync('../client/index.html'); 
// debugger; 
// console.log(index); 
// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
// var server = http.createServer(handleRequest.requestHandler);
// console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);

// http.createServer(function(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end(index); 
// }).listen(port, ip);  


// var mimeTypes = {
//     "html": "text/html",
//     "jpeg": "image/jpeg",
//     "jpg": "image/jpeg",
//     "png": "image/png",
//     "js": "text/javascript",
//     "css": "text/css"};

// http.createServer(function(req, res) {
//     var uri = url.parse(req.url).pathname;
//     var filename = path.join(process.cwd(), uri);
//     path.exists(filename, function(exists) {
//         if(!exists) {
//             console.log("not exists: " + filename);
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.write('404 Not Found\n');
//             res.end();
//         }
//         var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
//         res.writeHead(200, mimeType);

//         var fileStream = fs.createReadStream(filename);
//         fileStream.pipe(res);

//     }); //end path.exists
// }).listen(1337);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.


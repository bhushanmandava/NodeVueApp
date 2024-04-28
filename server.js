const http = require('http');
const fs = require('fs');
const path = require('path');

// Read the JSON data from the file
const watchData = JSON.parse(fs.readFileSync('db.json', 'utf8'));

http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  } else if (req.url.match("\.js$")) {
    fs.readFile(path.join(__dirname, 'public', req.url), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(content);
    });
  } else if (req.url.match("\.css$")) {
    fs.readFile(path.join(__dirname, 'public', req.url), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(content);
    });
  } else if (req.url === '/about') {
    fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  } else if (req.url === '/watches') { // New endpoint for watches
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(watchData.watches));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
}).listen(5959, () => console.log('Server running on port 5959'));
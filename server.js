const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');

const server = http.createServer(function (req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    })
  } else if (page == '/flip') {
    console.log(params.q)
    //get a random number
    const flipCoin = Math.floor(Math.random() * 2);
    // give a side the value of zero = heads
    if ((flipCoin === 0 && params.q === 'heads') || (flipCoin === 1 && params.q === 'tails')) {
      res.write('Winner')
    } else {
      res.write('Loser')
    }
    res.end();

  } else if (page == '/css/flip.css') {
    fs.readFile('css/flip.css', function (err, data) {
      res.writeHead(200,{'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') { // <-- url path need / to start
    fs.readFile('js/main.js', function (err, data) { //<--- file path no /
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  }
});

server.listen(7000);
// does not have to be 8000 but must be between 1-65535

const express = require('express');
const http = require('http');
const app = express();

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.get('/greet', (req, res) => {
  res.end('<h1>Hello everyone<h1>');
});

app.use((req, res, next) => {
  const [port, host] = process.argv.slice(2);
  const options = {
    port,
    host,
    path: req.url,
    method: req.method,
    body: req.body,
  };

  const request = http.request(options, (response, err) => {
    let text = '';
    response.setEncoding('utf8');
    response.on('data', (data) => {
      text += data;
    });
    response.on('end', () => {
      res.statusCode = response.statusCode;
      res.end(text);
    });
  });
  request.end();
});

module.exports = { app };

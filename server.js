const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!');
});

//sample call: http://localhost:3000/api/stocks?symbol=MS
app.get('/api/stocks', (req, res) => {
  http.get('http://data.benzinga.com/rest/richquoteDelayed?symbols=' + req.query.symbol, (resp) => {
    let body = '';
    resp.on('data', (chunk) => {
      body += chunk;
    });
    resp.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
    });
  }).on('error', (e) => {
    console.log('Got error: ' + e.message);
  });

});

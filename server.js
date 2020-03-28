// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

var bodyParser = require('body-parser');
app.use(bodyParser.json());


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


var api = '/api/whoami';
app.get(api,function (req,res,next){
  //  console.log(100);
  let language = req.header('Accept-language')   //req.acceptsLanguages();
  let software = req.get('User-Agent');
  let ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //req.header('ipaddress'); req.ip

   res.json({
     'ipaddress' : ipaddress,
     'languages' : language,
     "software" : software
   })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

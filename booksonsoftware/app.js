
/**
 * Module dependencies.
 */

var express = require('express'),
        upload = require('jquery-file-upload-middleware');
var routes = require('./routes');
var user = require('./routes/user');
var fs = require("fs");
var crypto = require('crypto');
var flash = require('express-flash');
var tls = require('tls');
var https = require('https');
var http = require("http");
var path = require('path');
var querystring = require('querystring');
var Hogan = require("hogan.js");
var login_url = "https://okta.com/app/template_saml_2_0/exk13xxxxxxxo/sso/saml";

var app = express();

var https_options = {
    key: fs.readFileSync('booksonsoftware-private-key.pem','utf8'),
    cert: fs.readFileSync('booksonsoftware-cacert.pem', 'utf8')
};

// all environments
app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 8448);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.set('key', fs.readFileSync('booksonsoftware-private-key.pem', 'utf8'));
app.set('cert', fs.readFileSync('booksonsoftware-cacert.pem', 'utf8'));
app.set('ciphers', [
        "ECDHE-RSA-AES128-SHA256",
        "DHE-RSA-AES128-SHA256",
        "AES128-GCM-SHA256",
        "RC4",
        "HIGH",
        "!MD5",
        "!aNULL"
    ].join(':'));
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('public/images', express.static(path.join(__dirname, 'public/images')));
app.use('public/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('public/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
require('dotenv').config({ path: './.env' });

app.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);


if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function secure(req,res,next){
  if (!req.url.endsWith('/')) {
    req.url =  req.url + '/';
  }
  res.redirect('/algorithms/');
      if(req.session.currentUser){
        next();
      }
    }

app.all('/', secure);
upload.configure({
        uploadDir: __dirname + '/public/uploads',
        uploadUrl: '/uploads',
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });

app.get('/.well-known/pki-validation/godaddy.html', function (req, res) {
   res.render('certificate', {}, function(err, html) {
       res.send(html);
   });
});

app.get('/algorithms', function( req, res ){
  if (!req.url.endsWith('/')) {
    res.redirect(req.url + '/');
  }
  var clusters = {};
  var i = 0;
  var email = (req.session.currentUser) ? req.session.currentUser.email : "";
  if (!email)
     email = 'rajamani@my.com';
      res.render('algorithms', clusters, function(err, html) {
      res.send(html);
     });
});

app.get('/modernization', function( req, res ){
  if (!req.url.endsWith('/')) {
    res.redirect(req.url + '/');
  }
  var clusters = {};
  var i = 0;
  var email = (req.session.currentUser) ? req.session.currentUser.email : "";
  if (!email)
     email = 'rajamani@my.com';
      res.render('modernization', clusters, function(err, html) {
      res.send(html);
     });
});


app.get('/author', function( req, res ){
  if (!req.url.endsWith('/')) {
    res.redirect(req.url + '/');
  }
  var clusters = {};
  var i = 0;
  var email = (req.session.currentUser) ? req.session.currentUser.email : "";
  if (!email)
     email = 'rajamani@my.com';
      res.render('author', clusters, function(err, html) {
      res.send(html);
     });
});

app.get('/meditation', function( req, res ){
  if (!req.url.endsWith('/')) {
    res.redirect(req.url + '/');
  }
  var clusters = {};
  var i = 0;
  var email = (req.session.currentUser) ? req.session.currentUser.email : "";
  if (!email)
     email = 'rajamani@my.com';
      res.render('meditation', clusters, function(err, html) {
      res.send(html);
     });
});

app.get('/books', function( req, res ){
  if (!req.url.endsWith('/')) {
    res.redirect(req.url + '/');
  }
  var clusters = {};
  var i = 0;
  var email = (req.session.currentUser) ? req.session.currentUser.email : "";
  if (!email)
     email = 'rajamani@my.com';
      res.render('books', clusters, function(err, html) {
      res.send(html);
     });
});

app.use(express.bodyParser());
var httpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var httpsServer = https.createServer(https_options, app).listen(8443, function(){
  console.log('Express server listening on port 8443 ');
});

app.get('/text/', function(req, res){
    cluster = {};
     res.render('summarize', cluster, function(err, html) {
      var template = Hogan.compile(html);
      var h = template.render({'msg':'none'});
        console.log('h='+h);
        res.setHeader('Content-Type', 'text/html');
        res.send(h);
     });
});

app.post('/add/', function(req, res){
           cluster = {};
           cluster.text = req.body.text;
  var email = (req.session.currentUser) ? req.session.currentUser.email : "";
  if (!email)
     email = 'rajamani@my.com';
  //var post_data = JSON.stringify(cluster);
  var post_data = 'ratio='+encodeURIComponent(req.body.ratio)+'&text='+encodeURIComponent(req.body.text);
  try {
  console.log('post_data='+post_data);
  console.log('ratio='+req.body.ratio);
  var options = {
    host: '0.0.0.0',
    port: 8888,
    path: '/metric/v1/add',
    method: 'POST',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': post_data.length,
      }
  };
  var httpreq = http.request(options, function (response) {
        console.log('post_data='+post_data);
      clustersJson = '';
      response.on('data', function (chunk) {
          console.log('Response: ' + chunk);
          clustersJson += chunk;
          console.log('response_received='+clustersJson);
      });

    response.on('end', function() {
      summary = "No Summary";
      clusters = { "summary": summary };
      try{
      clusters = JSON.parse(clustersJson);
      summary = clusters["summary"];
      console.log('summary='+summary);
      if (!summary)
          clusters["summary"] = "";
      clustersJson = JSON.stringify(clusters);
      }catch(e)
      {
          console.log(e);
      }
      res.setHeader('Content-Type', 'application/json');
      console.log('sending_json='+clustersJson);
      res.send(clustersJson);
     });
     response.on('error', function(e) {
      console.log('API call failed: '+e);
      post_data = '';
     });
  });
  httpreq.on('error', function(e) {
     console.log(e);
  });
  httpreq.write(post_data);
  httpreq.end();
  } catch (err) {
    console.log(`Summarizer api not available.`);
    return res.sendStatus(400);
  }
});

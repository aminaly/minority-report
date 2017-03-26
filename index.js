var express = require('express');
//var indico = require('indico.io');
var pg = require('pg');
var app = express();

//indico.apiKey =  '40bbea36abfef1d67b3a7befb0bf6c7c';
var response = function(res) { console.log(res); };
var logError = function(err) { console.log(err); };

// operating as if first user is logged in
var userid = 1;

// local port
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// index node
app.get('/', function(request, response) {
    console.log("Signup print");
    response.render('pages/user-signup');
});

app.listen(app.get('port'), function() {
});

// db page. Get's data from test table
app.get('/db', function (request, response) {

    var userquery = 'SELECT * FROM users JOIN domain ON users.id = domain.user WHERE users.id = ' + userid;

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(userquery, function(err, result) {
            console.log("result.rows: " + result.rows)
            done();
            if(err)
            {console.error(err); response.sent("Error " + err); }
            else
            { 
              $.post(
                'https://apiv2.indico.io/relevance/batch',
                JSON.stringify({
                'api_key': "40bbea36abfef1d67b3a7befb0bf6c7c",
                'data': result.rows['domain'],
                'queries': ["Media"]
                })).then(function(res) { console.log("res: " + res) });
              response.render('pages/db', {results: res} ); 
            }
        });
    });
});

// portal page. Get's data from test table
app.get('/portal', function (request, response) {

    var userquery = 'SELECT * FROM users WHERE users.id = ' + userid;

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(userquery, function(err, result) {
            done();
            if(err)
            {console.error(err); response.sent("Error " + err); }
            else
            { response.render('pages/portal', {results: result.rows} ); }
        });
    });
});

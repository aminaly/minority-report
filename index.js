var express = require('express');
//var indico = require('indico.io');
var pg = require('pg');
var app = express();

var settings = {'api_key' : "40bbea36abfef1d67b3a7befb0bf6c7c"};
var response = function(res) { console.log(res); }
var logError = function(err) { console.log(err); }

// local port
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// index node
app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// db page. Get's data from test table
app.get('/db', function (request, response) {

    var connectionString = process.env.DATABASE_URL
        || "postgres://localhost:5432/cs3200";


    pg.connect(connectionString, function(err, client, done) {
        client.query('SELECT * FROM users', function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.render('pages/db', {results: result.rows} ); }
        });
    });
});

// indico.sentiment(['indico is so easy to use!', 'Still really easy, yiss'], settings)
// .then(response)
//.catch(logError);

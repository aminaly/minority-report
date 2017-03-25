var express = require('express');
//var indico = require('indico.io');
var pg = require('pg');
var app = express();

//indico.apiKey =  '40bbea36abfef1d67b3a7befb0bf6c7c';
var response = function(res) { console.log(res); }
var logError = function(err) { console.log(err); }

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
  response.render('pages/user-signup');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// db page. Get's data from test table
app.get('/db', function (request, response) {

    var userquery = 'SELECT * FROM users JOIN domain ON users.id = domain.user WHERE users.id = ' + userid;
    var companyquery = 'SELECT id, domain FROM companies';

    var userResult = pgquery(userquery);
    var companyResult = pgquery(companyquery);
    print(userResult);
    response.render('pages/recs', {userDom: userResult, companyDom : companyResult});
});

// call query
function pgquery(querystring) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(querystring, function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { return(result.rows); }
        });
    });
}
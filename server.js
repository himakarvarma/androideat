var express = require('express'),
  app = express(),
  connection = require('express-myconnection'),
  mysql = require('mysql'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3001;

app.use(

	connection(mysql,{
		host: 'localhost',
		user: 'root',
		password: 'root',
		database:'androideat'
		},'request')
	);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/route.js');
routes(app);


app.listen(port);

console.log('test RESTful API server started on: ' + port);


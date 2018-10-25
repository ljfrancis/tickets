//server.js

// Documents/BU_classes/CS602_Server_Side/term_project

const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')


const app = express();

app.engine('handlebars', 
	handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Routing 
const routes = require('./routes/index.js');
app.use('/', routes);

app.use((req, res) => {
	res.status(404);
	res.render('404');
})

app.listen(3000, () => {
	console.log('Connected to http://localhost:3000')
});


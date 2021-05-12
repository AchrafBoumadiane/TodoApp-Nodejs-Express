var express       = require("express");
var session       = require('cookie-session');
var bodyParser    = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended : false});

var app = express();


app.use(session({ secret : 'todotopsecret' }))


.use( (req, res, next) => {
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* Show Tasks and form */
.get('/todo', (req, res) => {
    res.render('todo.ejs', { todolist : req.session.todolist });
})

/* Add item to Todolist */
.post('/todo/add/', urlencodedParser, (req, res) => {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Delete item from Todolist  */
.get('/todo/delete/:id', (req, res) => {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})


.use(  (req, res, next) => {
    res.setHeader('content-type', 'text/plain');
    res.status(404).send('page not found!');
})


.listen(8080);
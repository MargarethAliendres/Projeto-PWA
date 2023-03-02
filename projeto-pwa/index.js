

const express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/page2', function(req, res){
    res.render("../views/page2");
});

app.get('/', function(req, res){
    res.render("../views/index");
});

app.get('/offlinePage', function(req, res){
    res.render("../views/offlinePage");
});

app.listen(2000, function(){
    console.log('Executando na porta 3000');   //essa é a porta que depois de execurtar no terminal node index //

});
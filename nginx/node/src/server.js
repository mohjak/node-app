'use strict';

const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let ejs = require('ejs');
let pg = require('pg');

let votes = {
  sandwiches: 0,
  tacos: 0
};

let urlencodedParser = bodyParser.urlencoded({ extended: false})

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.get('/', function (req, res) {
  res.render('pages/index', {
    votes: votes
  });
});
app.post('/vote', urlencodedParser, function (req, res) {
  let vote = req.body.yourVote;
  if(vote === 'sandwiches') {
    votes.sandwiches = votes.sandwiches + 1;
  } else if (vote === 'tacos') {
    votes.tacos = votes.tacos + 1;
  } else {
    console.log('Somthing went wrong: ' + vote);
  }
  res.redirect('/');
});
const PORT = 8888;
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

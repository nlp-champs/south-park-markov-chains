var http = require('http');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var fs = require('fs');
var rita = require('rita');

// bodyParser to get posts from $.ajax
app.use(bodyParser.json());

// Serve static assets
app.use(express.static('./dist'));

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// on the POST of the /generate_sentance, generate a sentance!!!!
app.post('/generate_sentence', function (req, res) {
  var iMarkov = parseInt(req.body.markov); // markov chain length
  var sSeason = req.body.season; // desired season
  var sCharacter = req.body.character; // desired character
  var sFileName = './data/processed/s' + sSeason + '_' + sCharacter + '.txt'
  var inputText;
  try {
    inputText = fs.readFileSync(sFileName, 'utf8');
  } catch (err) {
    var response = {
        status: 200,
        sentence: '',
        bNotFound: true
    };
    res.send(JSON.stringify(response));
    return;
  }
  var markov = new rita.RiMarkov(iMarkov);
  markov.loadText(inputText);
  var sentences = markov.generateSentences(1);
  var response = {
      status: 200,
      sentence: sentences[0],
      bNotFound: false
  };
  res.send(JSON.stringify(response));
});

server = http.createServer(app);

// listening ports
server.listen(9001);

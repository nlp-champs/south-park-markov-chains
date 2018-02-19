var fs = require('fs');
var rita = require('rita');

var markov = new rita.RiMarkov(3);
var inputText = fs.readFileSync('./data/processed/s20_cartman.txt', 'utf8'); // corpora
markov.loadText(inputText); // load corpora
var sentences = markov.generateSentences(1);
console.log(sentences[0]);

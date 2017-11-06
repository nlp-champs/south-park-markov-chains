require('normalize.css/normalize.css');
require('styles/App.css');

// react and other 3rd party
import React from 'react';
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

// images
let berries = require('../images/berries.jpg');
let cartman = require('../images/cartman.jpg');
let stan = require('../images/stan.jpg');
let kyle = require('../images/kyle.jpg');
let kenny = require('../images/kenny.jpg');

// bootstrap stuff (note: imports have to be in this exact order!)
import jquery from 'jquery';
window.jQuery = jquery;
window.Popper = require('popper.js');
window.Tether = require('tether');
require('bootstrap');

var $ = require("jquery");

var oImageRefs = {
  'berries': berries,
  'cartman': cartman,
  'stan': stan,
  'kyle': kyle,
  'kenny': kenny
}
var oMarkovOptions = [
  { value: '2', label: '2 - not very legible but creative' },
  { value: '3', label: '3 - pretty legible but not as creative' },
  { value: '4', label: '4 - very legible and not very creative' },
  { value: '5', label: '5 - nearly exact copy of character\'s lines' }
];
var oCharacterOptions = [
  { value: 'berries', label: 'Memberberries' },
  { value: 'cartman', label: 'Cartman' },
  { value: 'stan', label: 'Stan' },
  { value: 'kyle', label: 'Kyle' },
  { value: 'kenny', label: 'Kenny' }
];
var oSeasonOptions = [
  { value: '20', label: 'Season 20' },
  { value: '19', label: 'Season 19' },
  { value: '18', label: 'Season 18' },
  { value: '17', label: 'Season 17' },
  { value: '16', label: 'Season 16' }
];

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      season: "20",
      seasonDisplay: "Season 20",
      character: "berries",
      characterDisplay: "Memberberries",
      characterImage: berries,
      markov: '2',
      sentence: "...",
      year: new Date().getFullYear()
    }
    this.onChangeCharacter = this.onChangeCharacter.bind(this);
    this.onChangeSeason = this.onChangeSeason.bind(this);
    this.onChangeMarkov = this.onChangeMarkov.bind(this);
    this.onClickGenerateSentence = this.onClickGenerateSentence.bind(this);
  }
  onChangeSeason(oSelected) {
    this.setState({season: oSelected.value, seasonDisplay: oSelected.label});
  }
  onChangeCharacter(oSelected) {
    console.log(oSelected);
    var oImage = oImageRefs[oSelected.value];
    this.setState({character: oSelected.value, characterDisplay: oSelected.label, characterImage: oImage});
  }
  onChangeMarkov(oSelected) {
    this.setState({markov: oSelected.value});
  }
  onClickGenerateSentence() {
    // post to server
    var that = this;
    var data = JSON.stringify({
      markov: this.state.markov,
      season: this.state.season,
      character: this.state.character
    });
     $.ajax({
        url: '/generate_sentence',
        type: 'POST',
        dataType: 'json',
        data: data,
        contentType: 'application/json',
        cache: false,
        timeout: 5000,
        success: function(oData) {
          //var sPreparedSentence = {<span className="quote">"</span>{oData.sentence}<span className="quote">"</span>};
          that.setState({sentence: oData.sentence});
          //notify.show('Thank you!', 'custom', 5000, notifyColor); // keep thank you forever
        },
        error: function() {
          //notify.show('Sorry, there was an error submitting your email. Care to try again?', 'custom', 5000, notifyColor); // prompt the user for a proper email
        }
      });
  }
  render() {
    return (
      <div>
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <span className="navbar-brand js-scroll-trigger">Southpark Markov Chains</span>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fa fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#createASentence">Create a sentence!</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#whoDunIt">Who dun' it?!?!</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Header */}
        <header className="masthead">
          <div className="container">
            <div className="intro-text">
              <span className="name">Southpark Markov Chains</span>
              <hr className="star-light" />
              <span className="skills">Quick bites (bytes?) of hilarity from neat NLP processes.<br/>Scroll to check it out.</span>
            </div>
          </div>
        </header>
        {/* About Section */}
        <section className="contact" id="createASentence">
          <div className="container">
            <img className="mx-auto d-block" width="175rem" src={this.state.characterImage} alt/>
            <h5 className="text-center">You've currently selected:</h5>
            <h2 className="text-center">{this.state.characterDisplay}<br/>({this.state.seasonDisplay})</h2>
              <div className="row">
                <div className="col-lg-6 mx-auto">
                <p>Season (more seasons coming very soon!)</p>
                </div>
              </div>
            <div className="row">
                <div className="col-lg-6 mx-auto">
                  <Select
                    value={this.state.season}
                    options={oSeasonOptions}
                    onChange={this.onChangeSeason}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mx-auto">
                <p>Character</p>
                </div>
              </div>
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <Select
                  value={this.state.character}
                  options={oCharacterOptions}
                  onChange={this.onChangeCharacter}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 mx-auto">
              <p>Markov chain length</p>
              </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mx-auto">
                  <Select
                    value={this.state.markov}
                    options={oMarkovOptions}
                    onChange={this.onChangeMarkov}
                  />
                </div>
              </div>
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="dropdown">
                  <button className="btn btn-primary btn-lg mx-auto" type="button" onClick={this.onClickGenerateSentence}>
                    GENERATE!
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <p className="text-center">Go ahead - select a season, a character, then click GENERATE!</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <h1 className="text-center"><span style={{color:'blue'}}>"</span>{this.state.sentence}<span style={{color:'blue'}}>"</span></h1>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="whoDunIt">
          <div className="container">
            <h2 className="text-center">Who dun' it?!?!</h2>
            <hr className="star-primary" />
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <p>Why, NLP Champs my dear person! Who are the NLP Champ? NLP Champs are a bunch of bloggers who insist on making natural language processing (NLP) avaliable to all, from the champiest of champs, to the noobiest of noobs. You can start anywhere, just dive in! Don't know what NLP is? Don't want to be a champ? Don't care? It doesn't matter! Check out our user friendly site <a href="http://nlp-champs.com">here</a>. (We made a <a href="http://npl-champs.com/blog2">blog post</a> about how we built this very site!)</p>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="text-center">
          <div className="footer-above">
            <div className="container">
              <div className="row">
                <div className="footer-col col-md-8 mx-auto">
                  <h3>About NLP Champs</h3>
                  <p>NLP Champs is a community focused on developing and sharing natural language processing techniques. Check us out!<br/><a href="https://nlp-champs.com">nlp-champs.com</a></p>
                </div>
                <div className="footer-col col-md-8 mx-auto">
                  <h3>Credits and Thanks</h3>
                  <ul>
                    <li>Neat Cartman favicon from <a href="http://www.favicon.cc/?action=icon&file_id=255991">lordeblader at favicon.cc</a></li>
                    <li><a href="https://github.com/dhowe/RiTaJS">RiTaJS Library</a></li>
                    <li><a href="https://github.com/react-webpack-generators/generator-react-webpack">Yeoman React-Webpack Generator</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-below">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  Copyright © NLP-Champs {this.state.year}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

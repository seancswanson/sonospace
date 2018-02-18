import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PlaybackFooter from './widgets/playbackFooter.js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(props){
    super(props)
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Please select a song.',
        image: ''
      }
    }
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  componentDidMount = () => {
  this.getNowPlaying()
  }

  getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

getNowPlaying() {
  spotifyWebApi.getMyCurrentPlaybackState()
  .then((response) => {
    console.log(JSON.parse(JSON.stringify(response)))
    let nowPlaying = JSON.parse(JSON.stringify(response))
    if (nowPlaying.item !== undefined) {
    this.setState({
      nowPlaying: {
        name: nowPlaying.item.name,
        image: nowPlaying.item.album.images[0].url
      }
    })
  } else {
  console.log("No song currently played", this.state)
}
  })
}



  render() {
    if (!this.state.loggedIn){
      return (
        <div>
          <h1>Make this pretty</h1>
          <a href="http://localhost:8888">
          <button>Login with Spotify</button>
        </a></div>
        )
    } else {
    return (
      <Router>
        <div className="App">
          <div className="div--container__nowplayingpicture">
          {
            (this.state.nowPlaying.image !== "") 
            ? <img id="img-nowPlaying" src={this.state.nowPlaying.image} alt="current song album art" /> :
            'None'            
          }
          </div>
          <PlaybackFooter currentSong={this.state.nowPlaying.name} currentImage={this.state.nowPlaying.image}/>
        </div>
      </Router>
    )}
  }
}

export default App;

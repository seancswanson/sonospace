import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import PlaybackFooter from './widgets/PlaybackFooter.js';
import Sidebar from './widgets/Sidebar.js';
import spotify_logo from './Spotify_Logo_RGB_Green.png'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyWebApi = new Spotify();

let newReleases;
let categories;
let featuredPlaylists;

  const Landing = () => {
    return(
    <div className="div--underlayer__landing">
     <a href="https://spotify.com">
      <span   className="span--landing__powered">powered by</span>
      <img  id="img--landing__spotify" src={spotify_logo}/>
      </a>
      <div className="div--container__landing">
        <span className="span--landing__title">sonospace</span>
        <hr/>
        <span className="span--landing__subtitle">a beautiful & tidy wrapper for spotify.</span>
        <a href="http://localhost:8888">
          <button className="button--landing__login">Login with Spotify</button>
        </a>
      </div>
    </div>)
  }

const hashParams = {};

class App extends Component {
  constructor(props){
    super(props)
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Please select a song.',
        artist: '',
        image: '',
        songDuration: 0,
        progress: 0
      },
    }
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getFeatured() {
    spotifyWebApi.getFeaturedPlaylists({ limit : 3, offset: 1, country: 'SE', locale: 'sv_SE', timestamp:'2014-10-23T09:00:00' })
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.log("Something went wrong!", err);
  });
  }

  getCategories() {
    spotifyWebApi.getCategories({
      limit : 5,
      offset: 0,
      country: 'SE',
      locale: 'sv_SE'
  })
  .then(function(data) {
    categories = data
    console.log(data);
  }, function(err) {
    console.log("Something went wrong!", err);
  });
  }

  getReleases(){
    console.log('clicked')
    spotifyWebApi.getNewReleases({ limit : 5, offset: 0, country: 'US' })
    .then(function(data) {
      console.log(data)
      newReleases = data.albums.href;
      }, function(err) {
         console.log("Something went wrong!", err);
      });
  }

  getHashParams() {
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
      let nowPlaying = JSON.parse(JSON.stringify(response))
      if (nowPlaying.item !== undefined) {
      this.setState({
        nowPlaying: {
          name: nowPlaying.item.name,
          artist: nowPlaying.item.album.artists[0].name,
          image: nowPlaying.item.album.images[0].url,
          songDuration: nowPlaying.item.duration_ms,
          progress: nowPlaying.progress_ms
        }
      })
    } else {
    console.log("No song currently played", this.state)
    }
    })
  }

  componentDidMount() {
    this.setState({access_token: hashParams.access_token})
  }

  render() {
    let playbackInfo = {
      name: this.state.nowPlaying.name,
      artist: this.state.nowPlaying.artist,
      image: this.state.nowPlaying.image,
      songDuration: this.state.nowPlaying.songDuration,
      progress: this.state.nowPlaying.progress
  }
    if (!this.state.loggedIn){
      return (
        <Router>
            <Route exact path="/" component={Landing} />
        </Router>
        )
    } else {
    return (
      <Router>
        <div className="App">
          <div className="div--container__nowplayingpicture">
          {
            (this.state.nowPlaying.image !== "") 
            ? <img id="img-nowPlaying" src={this.state.nowPlaying.image} alt="current song album art" /> :
            ''            
          }
          </div>
          <Sidebar categories={categories} newReleases={newReleases} getNewReleases={this.getReleases} getFeatured={this.getFeatured} getCategories={this.getCategories} access_token={this.state.access_token} />
          {console.log(playbackInfo)}
          <PlaybackFooter access_token={this.state.access_token} refreshSong={this.getNowPlaying()} playback={playbackInfo}/>
        </div>
      </Router>
    )}
  }
}

export default App;

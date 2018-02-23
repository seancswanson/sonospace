import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node'





class Sidebar extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="div--container__sidebar">
        <div className="div--container__new">
          <h1>{this.props.newReleases}</h1>
        </div>
        <button className="a--sidebar" onClick={this.props.getNewReleases}>New Releases</button>
        <a className="a--sidebar" href="/#">Browse Categories</a>
        <a className="a--sidebar" href="/#">My Music Libary</a>
      </div>)
  }
}

export default Sidebar;
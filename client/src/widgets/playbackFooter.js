import React, { Component } from 'react';

class PlaybackFooter extends Component {
  constructor(props){
    super(props)

  }

  // componentWillUpdate(){
  //   this.props.refreshSong();
  // }

  render(){
    return(
      <div className="div--container__playbackfooter">
                <div className="div--container__seekbar">
             { 
            (this.props.currentSong !== "Please select a song.") 
            ? <span className="span--currentsong">{this.props.currentSong}</span> :
             'Please select a song'
            }
          </div>
          <div className="div--container__slider">
            <input id="input--slider" type="range" ng-model="progress" ng-change="changeprogress()" min="0" max="" />
            <span className="span--playtime" className="progress"> progress | displaytime </span>
          </div>
        <div className="div--container__playbackactions">
          <button>Shuffle</button>
          <button>Back</button>
          <button>Play</button>
          <button>Forward</button>
          <button>Repeat</button>
        </div>
      </div>
      )
  }
}

export default PlaybackFooter;
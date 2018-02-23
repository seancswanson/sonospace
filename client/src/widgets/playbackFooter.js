import React, { Component } from 'react';


const PlayBackActions = () => {
    return(      
        <div className="div--container__playbackactions">
          <button className="button-playback"><i className="fa fa-random"></i></button>
          <button className="button-playback"><i className="fa fa-angle-double-left"></i></button>
          <button className="button-playback"><i className="fa fa-play"></i></button>
          <button className="button-playback"><i className="fa fa-angle-double-right"></i></button>
          <button className="button-playback"><i className="fa fa-refresh"></i></button>
        </div>
        )
      }


class PlaybackFooter extends Component {
  render(){

    var progress = new Date(this.props.playback.progress)
    var pMinutes= Math.floor(progress.getMinutes())
    var pSeconds= Math.floor(progress.getSeconds()/60*100)

    var duration = new Date(this.props.playback.songDuration)
    var dMinutes= Math.floor(duration.getMinutes())
    var dSeconds= Math.floor(duration.getSeconds()/60*100)
    return(
      <div className="div--container__playbackfooter">
                <div className="div--container__seekbar">
             { 
            (this.props.currentSong !== "Please select a song.") 
            ? <span className="span--currentsong">{this.props.playback.name} by {this.props.playback.artist}</span> :
             'Please select a song'
            }
          </div>
          <PlayBackActions />
          <div className="div--container__slider">
            <input id="input--slider" type="range" ng-model="progress" ng-change="changeprogress()" min="0" max="" />
            <span className="span--playtime">{pMinutes}:{pSeconds} / {dMinutes}:{dSeconds} </span>
          </div>

      </div>
      )
  }
}

export default PlaybackFooter;
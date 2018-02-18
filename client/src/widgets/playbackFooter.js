import React, { Component } from 'react';

class PlaybackFooter extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="div--container__playbackfooter">
                <div className="div--container__seekbar">
             { 
            (this.props.currentSong !== "Please select a song.") 
            ? this.props.currentSong :
             'Please select a song'
            }
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
import React, { useState, useEffect } from 'react';

const PlayBarComponent = (playedSong) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const {title,artist} = playedSong;

    const [currentSong, setCurrentSong] = useState({
    title: title,
    artist: artist
  });

  useEffect(() => {
    // Update current song when title or artist changes
    setCurrentSong({
      title: title,
      artist: artist
    });
  }, [title, artist]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };


  return (
    <div className='playbar bg-dark'>
     <div className='container-fluid'>
     <div className='row'>
     <div className='col-md-2'>
      <div className='song-info text-left'>
        <p style={{ fontSize: '20px' }} className='title'>{playedSong.title} </p>
        <p className='artist'>{playedSong.artist}</p>
      </div>
      </div>
      <div className='col-md-4  d-flex justify-content-end'>
        <div className='control'  style={{ marginTop: '20px' }}>
        <button className='btn btn-lg  bg-white' 
                onClick={handlePlayPause}
                style={{ border: 'none' }}>
          {isPlaying ? (
              <i className='bi bi-pause-circle'></i> // Icon for pause
            ) : (
              <i className='bi bi-play-circle'></i> // Icon for play
            )}
        </button>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default PlayBarComponent;

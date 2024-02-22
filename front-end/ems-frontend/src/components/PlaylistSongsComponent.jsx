import React ,{useEffect, useState} from 'react'
import {getPlaylist,removeSongFromPlaylist} from '../services/PlaylistService'
import Sidebar from './Sidebar'
import PlaybarComponent from './PlaybarComponent'
import { playSong } from '../services/SongService'

import { useNavigate, useParams } from 'react-router-dom'

const PlaylistSongsComponent = () => {
  const [name, setName] = useState('')
  const [songs, setSongs] = useState([])

  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')

  const {id} = useParams();
  const {playlistId} = useParams();
  const {userType} = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if(playlistId){
    getPlaylistData(playlistId);
    }
  }, [])

  function getPlaylistData(id){
      getPlaylist(playlistId).then((response) => {
        setName(response.data.name);
        setSongs(response.data.songs);
    }).catch(error => {
        console.error(error);
    })
}

  function addSong(){
    navigator(`/add-song/${userType}/${id}/${playlistId}`)
  }
  function backToPlaylists(){
    if(userType == 'user'){
        navigator(`/user-library/${id}`)
    } else if (userType== 'artist'){
      navigator(`/artist-library/${id}`)
    }
  }

  function removeSong(songId){
    removeSongFromPlaylist(playlistId,songId).then((response) =>{
       getPlaylistData(playlistId);
    }
      ).catch(error => {
        console.error(error);
      })
  } 

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    setSortOrder((prevSortOrder) => (column === sortColumn && prevSortOrder === 'asc' ? 'desc' : 'asc'));
    setSortColumn(column);
  };
  
  const handleSortButtonClick = () => {
    // Sort based on the currently selected column
    const sortedSongs = songs.slice().sort((a, b) => {
      const comparison =
        a[sortColumn] > b[sortColumn] ? 1 : a[sortColumn] < b[sortColumn] ? -1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  
    setSongs(sortedSongs);
  };

  function play(songId,songTitle,songArtist){
    setTitle(songTitle)
    setArtist(songArtist)
    playSong(songId)
  }
  return (
    <div className='d-flex'>
      <div className='col-md-2'>
           <Sidebar userId={id} userType= 'User'/>
      </div>
      <div className='column'>
        <h2>{name}</h2>
        <button className='btn btn-primary mb-2'onClick={addSong}>Add song</button>
        <button className='btn btn-primary mb-2'onClick={backToPlaylists}>Back to playlists</button>
        <div>
        <button className = 'bi bi-filter-left' onClick={handleSortButtonClick} ></button>
        <label>Sort by :  </label>
        <select onChange={(e) => handleSort(e.target.value)}>
          <option value='title'>Title</option>
          <option value='artist'>Artist</option>
          <option value='played_no'>Played no</option>
          <option value='genre'>Genre</option>
        </select>
      </div>
        <table className='table table-striped table-bordered'>
            <tbody>
                {
                    songs.map(song =>
                        <tr key={song.id}>
                            <td>{song.title}</td>
                            <td>{song.artist}</td>
                            <td>{song.genre}</td>
                           <td>
                              <button className='btn btn-info' onClick={() => play(song.id,song.title, song.artist)} >Play</button>
                              <button className='btn btn-danger' onClick={() => removeSong(song.id)} >Delete</button>
                            </td>                           
                        </tr>)
                }
            </tbody> 
             
        </table>
        <div className='row'>
        </div>
        <div className='col-md-12 p-0'>
            <PlaybarComponent title = {title} artist = {artist}/>
          </div>
          </div>
    </div>
  )
}

export default PlaylistSongsComponent
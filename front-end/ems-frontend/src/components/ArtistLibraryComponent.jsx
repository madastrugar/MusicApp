import React ,{useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import { deletePlaylistArtist, listArtistPlaylists } from '../services/PlaylistService'
import { listSongs} from '../services/ArtistService'
import { useNavigate, useParams } from 'react-router-dom'
import PlaybarComponent from './PlaybarComponent'
import { playSong,deleteSong } from '../services/SongService'

const ArtistLibraryComponent = () => {
  const [playlists, setPlaylists] = useState([])
  const [songs, setSongs] = useState([])

  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')

  const navigator = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    getPlaylists();
    getSongs();
  }, [])

  function getPlaylists(){
    listArtistPlaylists(id).then((response) => {
        setPlaylists(response.data);
    }).catch(error => {
        console.error(error);
    })
  } 

  function getSongs(){
    listSongs(id).then((response) => {
        setSongs(response.data);
    }).catch(error => {
        console.error(error);
    })
  } 

  
  function addNewSong(){
      navigator(`/add-song/${id}`)
  }
  function updateSong(songId){
      navigator(`/edit-song/${songId}/${id}`)
 }
 function removeSong(id){
  deleteSong(id).then((response) =>{
      getSongs();
  }
    ).catch(error => {
      console.error(error);
    })
  }

  function addNewPlaylist(){
    navigator(`/create-playlist/artist/${id}`)
  }
  function getPlaylist(playlistId){
    navigator(`/playlist-songs/artist/${id}/${playlistId}`)
  }
  function updatePlaylist(playlistId){
    navigator(`/edit-playlist/artist/${id}/${playlistId}`)
  }

  function removePlaylist(playlistId){
    deletePlaylistArtist(id,playlistId).then((response) =>{
        getPlaylists();
    }
      ).catch(error => {
        console.error(error);
      })
  } 

  function play(songId,songTitle,songArtist){
    setTitle(songTitle)
    setArtist(songArtist)
    playSong(songId)
  }

  return (
    <div className='container-fluid'>
       
    <div className='row'>
      <div className='col-md-2 p-0' >
           <Sidebar userId={id} userType='Artist' />
      </div>
      <div className='col-md-10'>
      <h2> Your library </h2>
        <div className='row'>
          <div className='col-md-6'>
          <div className='card'>
        <div className='card-body'>
        <button className='btn btn-primary mb-2' onClick={addNewPlaylist}>Create playlist</button>
        <table className='table table-striped table-bordered'>
            <tbody>
                {
                    playlists.map(playlist =>
                        <tr key={playlist.id}>
                            {/* <td>{playlist.id}</td> */}
                            <td>{playlist.name}</td>
                           <td>
                              <button className='btn btn-info' onClick={()=>getPlaylist(playlist.id)}>Open playlist</button>
                              <button className='btn btn-info' onClick={()=>updatePlaylist(playlist.id)}>Update</button>
                              <button className='btn btn-danger' onClick={()=>removePlaylist(playlist.id)}>Delete</button>
                            </td>                           
                        </tr>)
                }
            </tbody>
        </table>
        </div>
        </div>
        </div>
        <div className='col-md-6'>
        <div className='card'>
        <div className='card-body'>
        <button className='btn btn-primary mb-2' onClick={addNewSong}>Add song</button>
        <table className='table table-striped table-bordered'>
            <tbody>
                {
                    songs.map(song =>
                        <tr key={song.id}>
                            <td>{song.title}</td>
                            <td>{song.genre}</td>
                            <td>{song.played_no}</td>
                           <td>
                              <button className='btn btn-info' onClick={() => play(song.id,song.title, song.artist)} >Play</button>
                              <button className='btn btn-info' onClick={()=>updateSong(song.id)}>Update</button>
                              <button className='btn btn-danger' onClick={()=>removeSong(song.id)}>Delete</button>
                            </td>                           
                        </tr>)
                }
            </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
        
        
        <div className='row'>
        <div className='col-md-12 p-0'>
            <PlaybarComponent title = {title} artist = {artist}/>
          </div>
          </div>
          </div>
    </div>
    </div>
    
  )
}

export default ArtistLibraryComponent
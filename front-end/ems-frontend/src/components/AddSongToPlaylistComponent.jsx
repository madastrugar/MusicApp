import React, {useEffect, useState} from 'react'
import { listSongs } from '../services/SongService'
import { addSongToPlaylist } from '../services/PlaylistService'
import { useNavigate, useParams} from 'react-router-dom'

const AddSongToPlaylistComponent = () => {

   const [songs, setSongs] = useState([])

   const navigator = useNavigate();

   const {id} = useParams();
   const {playlistId} = useParams();
   const {userType} = useParams();

   useEffect(() => {
        getAllSongs();
   }, [])
   
    function getAllSongs(){
        listSongs().then((response) => {
            setSongs(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    
    function addSong(songId){
        addSongToPlaylist(playlistId,songId).then((response) => {
            navigator(`/playlist-songs/${userType}/${id}/${playlistId}`)
        }).catch(error => {
            console.error(error);
        })
        
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Songs</h2>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Played Number</th>
                    <th>Genre</th>
                    <th>Artist</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    songs.map(song =>
                        <tr key={song.id}>
                            <td>{song.title}</td>
                            <td>{song.played_no}</td>
                            <td>{song.genre}</td> 
                            <td>{song.artist}</td> 
                            <td>
                                <button className='btn btn-info' onClick={()=>addSong(song.id)}>Add</button>
                            </td>                          
                        </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}


export default AddSongToPlaylistComponent
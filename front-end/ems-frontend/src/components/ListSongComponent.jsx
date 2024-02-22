import React, {useEffect, useState} from 'react'
import { deleteSong, listSongs } from '../services/SongService'
import { useNavigate} from 'react-router-dom'

const ListSongComponent = () => {

   const [songs, setSongs] = useState([])

   const navigator = useNavigate();

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
    
    function addNewSong(){
        navigator('/add-song')
    }
    function backTo(){
        navigator('/admin')
    }

    function updateSong(id){
        navigator(`/edit-song/${id}`)
    }

    function removeSong(id){
        deleteSong(id).then((response) =>{
            getAllSongs();
        }
          ).catch(error => {
            console.error(error);
          })
    }

  return (
    <div className='container'>
        <button className='btn btn-primary mb-2' onClick={backTo}>Back</button>
        <h2 className='text-center'>Songs</h2>
        <button className='btn btn-primary mb-2' onClick={addNewSong}>Add Song</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
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
                            <td>{song.id}</td>
                            <td>{song.title}</td>
                            <td>{song.played_no}</td>
                            <td>{song.genre}</td> 
                            <td>{song.artist}</td> 
                            <td>
                                <button className='btn btn-info' onClick={()=>updateSong(song.id)}>Update</button>
                                <button className='btn btn-danger' onClick={()=>removeSong(song.id)}>Delete</button>
                            </td>                          
                        </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListSongComponent

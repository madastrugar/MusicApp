import React, {useState,useEffect}from 'react'
import Sidebar from './Sidebar'
import { useParams } from 'react-router-dom'
import { listSongs, playSong } from '../services/SongService'
import PlaybarComponent from './PlaybarComponent'
import { getUserGenres } from '../services/UserService'

const UserHomepageComponent = () => {
  const [songs, setSongs] = useState([])
  const [genres, setGenres] = useState([])

  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')


  const {id} = useParams();

  useEffect(() => {
    getAllSongs();
    getGenres(id);
  }, [id])

  async function getAllSongs() {
    try {
      const response = await listSongs();
      const sortedSongs = response.data.sort((a, b) => b.played_no - a.played_no);
      const slicedSongs = sortedSongs.slice(0,9);
      setSongs(slicedSongs);
    } catch (error) {
      console.error(error);
    }
  }
  function getGenres(){
    getUserGenres(id).then((response) => {
      setGenres(response.data);
  }).catch(error => {
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
        <Sidebar userId={id}  userType = 'User' />
      </div>
      <div className='col-md-10'>
      <h2>Homepage </h2>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <h4 className='text-center'>Top 10 songs</h4>
                <table className='table bordered'>
                  <tbody>
                  {
                    songs.map(song =>
                     <tr key={song.id}>
                        <td>{song.title}</td>
                        <td>{song.artist}</td> 
                        <td>{song.played_no}</td>
                        <td>{song.genre}</td> 
                        <td>
                            <button className='btn btn-info' onClick={()=>play(song.id,song.title,song.artist)}>Play</button>
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
                <h4 className='text-center'>Genres you're into lately</h4>
                <table className='table bordered text-center'>
                <tbody>
                 {
                   genres.map((genre, index) => (
                  <tr key={index}>
                  <td>{genre}</td>
                  </tr>
                  ))}
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

export default UserHomepageComponent
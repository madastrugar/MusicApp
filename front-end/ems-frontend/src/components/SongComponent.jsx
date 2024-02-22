import React, {useEffect, useState} from 'react'
import { createSong, getSong, updateSong } from '../services/SongService'
import { useNavigate, useParams } from 'react-router-dom'
const SongComponent = () => {

    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [artist, setArtist] = useState('')
    const [played_no, setPlayed_no] = useState(0)

    const {id} = useParams();
    const {artistId} = useParams();

    const [errors, setErrors] = useState({
        title: '',
        genre: '',
        artist: '',
        played_no: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
      if(id){
        getSong(id).then((response) =>{
           setTitle(response.data.title);
           setGenre(response.data.genre);
           setArtist(response.data.artist);
           setPlayed_no(response.data.played_no);
        }).catch(error =>{
            console.error(error);
        })
      }
    }, [id])

    function saveOrUpdateSong(e){
        e.preventDefault();
   
        if(validateForm()){
            const song = {title, genre, artist}
            const songUpdate = {title, played_no, genre, artist}
            console.log(song)
            if(id){
                update(id,songUpdate);
            }else{
                add(song);
            } 
        }
    }
    function update(id,songUpdate){
        updateSong(id,songUpdate).then((response) => {
            console.log(response.data);
            if(artistId){
                navigator(`/artist-library/${artistId}`)
            }else{
                navigator(`/songs`)
            }
        }).catch(error =>{
            console.error(error);
        })
    }
    function add(song){
        createSong(song).then((response) =>{
            console.log(response.data);
            if(artistId){
                navigator(`/artist-library/${artistId}`)
            }else{
                navigator(`/songs`)
            }
          }).catch(error => {
            console.error(error);
          })
    }

    function validateForm(){
        let valid = true;

        const errorsCopy= {... errors}    

        if(title.trim()){
            errorsCopy.title = '';
        }else {
            errorsCopy.title = 'Title is required!';
            valid = false;
        }

        if(genre.trim()){
            errorsCopy.genre = '';
        }else {
            errorsCopy.genre = 'Genre is required!';
            valid = false;
        }

        if(artist.trim()){
            errorsCopy.artist = '';
        }else {
            errorsCopy.artist = 'Artist is required!';
            valid = false;
        }

        if(id){
            if (played_no !== null && played_no !== undefined && played_no.toString().trim() !== '') {
                errorsCopy.played_no = '';
            } else {
                errorsCopy.played_no = 'Played number is required!';
                valid = false;
            }

        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update song</h2>
        }else{
            return <h2 className='text-center'>Add song</h2>
        }
    }

  return (
    <div className='container'>
        <br/>  <br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                   <form>
                      <div className='form_group mb-2'>
                          <label className='form-label'>Title
                          <input 
                             type='text'
                             placeholder='Enter song title'
                             name='title'
                             value={title}
                             className={`form-control ${errors.title ? 'is-invalid': ''}`}
                             onChange={(e) => setTitle(e.target.value)}
                          >
                          </input>
                          {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
                          </label>
                      </div>

                      <div className='form_group mb-2'>
                          <label className='form-label'>Genre
                          <input 
                             type='text'
                             placeholder='Enter genre'
                             name='genre'
                             value={genre}
                             className={`form-control ${errors.genre ? 'is-invalid': ''}`}
                             onChange={(e) => setGenre(e.target.value)}
                          >
                          </input>
                          {errors.genre && <div className='invalid-feedback'>{errors.genre}</div>}
                          </label>
                      </div>

                      <div className='form_group mb-2'>
                          <label className='form-label'>Artist
                          <input 
                             type='text'
                             placeholder='Enter artist name'
                             name='artist'
                             value={artist}
                             className={`form-control ${errors.artist ? 'is-invalid': ''}`}
                             onChange={(e) => setArtist(e.target.value)}
                          >
                          </input>
                          {errors.artist && <div className='invalid-feedback'>{errors.artist}</div>}
                          </label>
                      </div>

                      {
                        id && (
                        <div className='form_group mb-2'>
                          <label className='form-label'>Played_no
                          <input 
                             type='text'
                             placeholder='Enter played number'
                             name='played_no'
                             value={played_no}
                             className={`form-control ${errors.title ? 'is-invalid': ''}`}
                             onChange={(e) => setPlayed_no(e.target.value)}
                          >
                          </input>
                          {errors.title && <div className='invalid-feedback'>{errors.played_no}</div>}
                          </label>
                      </div>)
                      }
                      <button className='btn btn-primary btn-succes' onClick={saveOrUpdateSong}>Submit</button>
                   </form>
                </div>

            </div>

        </div>

    </div>
  )
}


export default SongComponent

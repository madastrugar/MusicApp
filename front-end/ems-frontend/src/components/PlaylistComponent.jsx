import React, {useEffect, useState} from 'react'
import { createPlaylist,createPlaylistArtist, getPlaylist, updatePlaylist } from '../services/PlaylistService'
import { useNavigate, useParams } from 'react-router-dom'
const PlaylistComponent = () => {

    const [name, setName] = useState('')

    const {id} = useParams();
    const {userType} = useParams();
    const {playlistId} = useParams();
    const [errors, setErrors] = useState({
        name: '',
    })

    const navigator = useNavigate();

    useEffect(() => {
      if(id){
        getPlaylist(id).then((response) =>{
           setName(response.data.name);
        }).catch(error =>{
            console.error(error);
        })
      }
    }, [id])

    function saveOrUpdatePlaylist(e){
        e.preventDefault();
   
        if(validateForm()){
            const playlist = {name}
            //console.log(playlist)
            //console.log(playlistId)
            if(playlistId){
                updatePlaylist(playlistId,playlist).then((response) => {
                    console.log(response.data);
                    console.log(userType)
                    if(userType == 'user'){
                        navigator(`/user-library/${id}`)
                    }else if(userType == 'artist'){
                        navigator(`/artist-library/${id}`)
                    }
                   
                }).catch(error =>{
                    console.error(error);
                })
            }else{
                if(userType == 'user'){
                 createPlaylist(id,playlist).then((response) =>{
                    console.log(response.data);
                    navigator(`/user-library/${id}`)
                  }).catch(error => {
                    console.error(error);
                  })
                }else{
                    createPlaylistArtist(id,playlist).then((response) =>{
                        console.log(response.data);
                        navigator(`/artist-library/${id}`)
                      }).catch(error => {
                        console.error(error);
                      }) 
                }
            } 
        }
    }

    function validateForm(){
        let valid = true;

        const errorsCopy= {... errors}    

        if(name.trim()){
            errorsCopy.name = '';
        }else {
            errorsCopy.name = 'Name is required!';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if(playlistId){
            return <h2 className='text-center'>Update playlist</h2>
        }else{
            return <h2 className='text-center'>Add playlist</h2>
        }
    }
    console.log(name)
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
                          <label className='form-label'>Name
                          <input 
                             type='text'
                             placeholder='Enter playlist name'
                             name='name'
                             value={name}
                             className={`form-control ${errors.name ? 'is-invalid': ''}`}
                             onChange={(e) => setName(e.target.value)}
                          >
                          </input>
                          {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                          </label>
                      </div>
                      <button className='btn btn-primary btn-succes' onClick={saveOrUpdatePlaylist}>Submit</button>
                   </form>
                </div>

            </div>

        </div>

    </div>
  )
}


export default PlaylistComponent

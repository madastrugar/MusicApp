import React, {useEffect, useState} from 'react'
import { deleteUser,listUsers } from '../services/UserService';
import {listArtists, deleteArtist} from '../services/ArtistService'; 
import { useNavigate } from 'react-router-dom';

const ListAllUsersComponent = () => {

    const [users, setUsers] = useState([])
    const [artists, setArtists] = useState([])

    const navigator = useNavigate();
 
    useEffect(() => {
        getAllUsers();
        
    }, [])
    useEffect(() =>{
        getAllArtists();
    }, [])
    
     function getAllUsers(){
         listUsers().then((response) => {
             setUsers(response.data);
         }).catch(error => {
             console.error(error);
         })
     }
     function getAllArtists(){
        listArtists().then((response) => {
            setArtists(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function backTo(){
        navigator('/admin')
    }
    function addNewUser(){
         navigator('/add-user')
    }
    function addNewArtist(){
        navigator('/add-artist')
    }
    function updateUser(id){
        navigator(`/edit-user/${id}`)
    }
 
    function updateArtist(id){
         navigator(`/edit-artist/${id}`)
     }
    function removeUser(id){
        deleteUser(id).then((response) =>{
            getAllUsers();
        }
          ).catch(error => {
            console.error(error);
          })
    }  
 
    function removeArtist(id){
         deleteArtist(id).then((response) =>{
             getAllArtists();
         }
           ).catch(error => {
             console.error(error);
           })
     }  
  return (
    <div>
        <button className='btn btn-primary' onClick={backTo}>Back</button>
   <div className='container'>
    
    <h2 className='text-center'>Users</h2>
    <div className='row'> 
    <div className='col-md-6'>
        <button className='btn btn-primary mb-2' onClick={addNewUser}>Add User</button>
        
        <table className='table table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td> 
                            <td>
                                <button className='btn btn-info' onClick={()=>updateUser(user.id)}>Update</button>
                                <button className='btn btn-danger' onClick={()=>removeUser(user.id)}>Delete</button>
                            </td>                          
                        </tr>)
                }
            </tbody>
        </table>
        </div>
        <div className='col-md-6'>
        <button className='btn btn-primary mb-2' onClick={addNewArtist}>Add Artist</button>
        <table className='table table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    artists.map(artist =>
                        <tr key={artist.id}>
                            <td>{artist.id}</td>
                            <td>{artist.username}</td>
                            <td>{artist.email}</td>
                            <td>{artist.password}</td> 
                            <td>
                                <button className='btn btn-info' onClick={()=>updateArtist(artist.id)}>Update</button>
                                <button className='btn btn-danger' onClick={()=>removeArtist(artist.id)}>Delete</button>
                            </td>                          
                        </tr>)
                }
            </tbody>
        </table>
        </div>
        </div>
    </div>

    </div>
  )
}

export default ListAllUsersComponent
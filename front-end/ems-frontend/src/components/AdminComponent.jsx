import React from 'react'
import { useNavigate } from 'react-router-dom';
const AdminComponent = () => {
  
  const navigator = useNavigate();

  function chooseSongs(){
    navigator('/songs')
  }
  function chooseUsers(){
    navigator('/user')
  }
  function logOut(){
    navigator('/login')
  }

  return (
    <div>

 
    <div className='container'>
  <h2 className='text-center'>Welcome admin</h2>
  <h5 className='text-center'>Choose what data you want to work on.</h5>
  <div className='row justify-content-md-center'>
    <div className='col-md-6 text-center'>
      <button className='btn btn-primary btn-xl mb-2' style={{ fontSize: '50px' }} onClick={chooseSongs}>Songs</button>
    </div>
    <div className='col-md-6 text-center'>
      <button className='btn btn-primary  btn-xl mb-2' style={{ fontSize: '50px' }} onClick={chooseUsers}>Users</button>
    </div>
  </div>
  
</div>
<div className='row'>
    <div className='col-md-6 mt-auto'>
      <button className=' bottom_button' 
              
              onClick={logOut}>Log out</button>
    </div>
  </div>
  </div>
  )
}

export default AdminComponent
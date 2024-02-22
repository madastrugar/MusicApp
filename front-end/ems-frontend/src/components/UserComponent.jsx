import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createUser, getUser, updateUser } from '../services/UserService'
const UserComponent = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {id} = useParams();
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
      if(id){
        getUser(id).then((response) =>{
           setUsername(response.data.username);
           setEmail(response.data.email);
           setPassword(response.data.password);
        }).catch(error =>{
            console.error(error);
        })
      }
    }, [id])

    function saveOrUpdateUser(e){
        e.preventDefault();
   
        if(validateForm()){
            const user = {username, email, password}
            console.log(user)
            if(id){
                updateUser(id,user).then((response) => {
                    console.log(response.data);
                    navigator('/user')
                }).catch(error =>{
                    console.error(error);
                })
            }else{
                createUser(user).then((response) =>{
                    console.log(response.data);
                    navigator('/user')
                  }).catch(error => {
                    console.error(error);
                  })
            } 
        }
    }

    function validateForm(){
        let valid = true;

        const errorsCopy= {... errors}    

        if(username.trim()){
            errorsCopy.username = '';
        }else {
            errorsCopy.username = 'Username is required!';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        }else {
            errorsCopy.email = 'Email is required!';
            valid = false;
        }

        if(password.trim()){
            errorsCopy.password = '';
        }else {
            errorsCopy.password = 'Password is required!';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update user</h2>
        }else{
            return <h2 className='text-center'>Add user</h2>
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
                          <label className='form-label'>Username
                          <input 
                             type='text'
                             placeholder='Enter username'
                             name='username'
                             value={username}
                             className={`form-control ${errors.username ? 'is-invalid': ''}`}
                             onChange={(e) => setUsername(e.target.value)}
                          >
                          </input>
                          {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
                          </label>
                      </div>

                      <div className='form_group mb-2'>
                          <label className='form-label'>Email
                          <input 
                             type='text'
                             placeholder='Enter email'
                             name='email'
                             value={email}
                             className={`form-control ${errors.email ? 'is-invalid': ''}`}
                             onChange={(e) => setEmail(e.target.value)}
                          >
                          </input>
                          {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                          </label>
                      </div>

                      <div className='form_group mb-2'>
                          <label className='form-label'>Password
                          <input 
                             type='password'
                             placeholder='Enter password'
                             name='password'
                             value={password}
                             className={`form-control ${errors.password ? 'is-invalid': ''}`}
                             onChange={(e) => setPassword(e.target.value)}
                          >
                          </input>
                          {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                          </label>
                      </div>
                      <button className='btn btn-primary btn-succes' onClick={saveOrUpdateUser}>Submit</button>
                   </form>
                </div>

            </div>

        </div>

    </div>
  )
}


export default UserComponent
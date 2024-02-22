import React, { useState } from 'react';
import { registerUser, registerArtist, getUser, getArtist } from '../services/SignUpService';
import { useNavigate } from 'react-router-dom';

const SignUpComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('User');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      let signupServiceFunction, checkServiceFunction;

      switch (userType) {
        case 'User':
          signupServiceFunction = registerUser;
          checkServiceFunction = getUser;
          break;
        case 'Artist':
          signupServiceFunction = registerArtist;
          checkServiceFunction = getArtist;
          break;
        default:
          console.error('Invalid user type');
          return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match. Please check and try again.');
        return;
      }

      const credentials = {
        username: username,
        email: email,
        password: password,
      };

      console.log('Registration request payload:', credentials);
      const checkResponse = await checkServiceFunction(credentials);

      if (checkResponse.status === 200) {
        const response = await signupServiceFunction(credentials);
        console.log('Registration response:', response);
        if (response.status === 200) {
          console.log(`${userType} registered successfully`);
          navigate('/login'); // Redirect to the login page after successful registration
        } else {
          setError('An error occurred during registration. Please try again.');
        }
      }
    } catch (error) {
      if (error.checkResponse && error.checkResponse.status === 200) {
        setError('Username or email is already in use. Please choose a different one.');
      } else {
        console.error('Error during signup:', error);
        setError('An error occurred during registration. Please try again!');
      }
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card col-md-6">
        <h2 className="text-center">Sign Up</h2>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                name="username"
                value={username}
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                name="email"
                value={email}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                name="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                name="confirmPassword"
                value={confirmPassword}
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="userType" className="form-label">
                User Type
              </label>
              <select
                name="userType"
                id="userType"
                value={userType}
                className="form-control"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Artist">Artist</option>
              </select>
            </div>

            {error && <div className="text-danger mb-3">{error}</div>}

            <div className="d-grid gap-2">
              <button className="btn btn-primary btn-success" onClick={handleSignup}>
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
// import React, {useState} from 'react';
// import {registerUser, registerArtist, getUser, getArtist} from '../services/SignUpService';
// import { useNavigate } from 'react-router-dom';

// const SignUpComponent = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [userType, setUserType] = useState('User');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
  
//     const handleSignup = async (e) => {
//       e.preventDefault();
  
//       try {
//         let signupServiceFunction, checkServiceFunction;
  
//         switch (userType) {
//           case 'User':
//             signupServiceFunction = registerUser;
//             checkServiceFunction = getUser;
//             break;
//           case 'Artist':
//             signupServiceFunction = registerArtist;
//             checkServiceFunction = getArtist;
//             break;
//           default:
//             console.error('Invalid user type');
//             return;
//         }
  
//         if (password !== confirmPassword) {
//           setError('Passwords do not match. Please check and try again.');
//           return;
//         }
        
//         const credentials = {
//           "username" : username,
//           "email" : email,
//           "password" : password
//         }

//         console.log('Registration request payload:', credentials);
//         const checkResponse = await checkServiceFunction(credentials);
        
//         if (checkResponse.status == 200){
//           const response = await signupServiceFunction(credentials);
//           console.log('Registration response:', response); 
//           if (response.status == 200) {
//             console.log(`${userType} registered successfully`);
//             navigate('/login'); // Redirect to the login page after successful registration
//           } else {
//             setError('An error occurred during registration. Please try again.');
//           }
//         }
//       } catch (error) {
//         if(error.checkResponse && error.checkResponse.status == 404){
//           setError('Username or email is already in use. Please choose a different one.');
//         }else{
//         console.error('Error during signup:', error);
//         setError('An error occurred during registration. Please try again.');
//         }
//       }
//     };
  
//     return (
//       <div className="container">
//         <br /> <br />
//         <div className="row">
//           <div className="card col-md-6 offset-md-3 offset-md3">
//             <h2 className="text-center">Sign Up</h2>
//             <div className="card-body">
//               <form>
//                 <div className="form_group mb-2">
//                   <label className="form-label">
//                     Username
//                     <input
//                       type="text"
//                       placeholder="Enter username"
//                       name="username"
//                       value={username}
//                       className="form-control"
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                   </label>
//                 </div>
  
//                 <div className="form_group mb-2">
//                   <label className="form-label">
//                     Email
//                     <input
//                       type="email"
//                       placeholder="Enter email"
//                       name="email"
//                       value={email}
//                       className="form-control"
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </label>
//                 </div>
  
//                 <div className="form_group mb-2">
//                   <label className="form-label">
//                     Password
//                     <input
//                       type="password"
//                       placeholder="Enter password"
//                       name="password"
//                       value={password}
//                       className="form-control"
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </label>
//                 </div>
  
//                 <div className="form_group mb-2">
//                   <label className="form-label">
//                     Confirm Password
//                     <input
//                       type="password"
//                       placeholder="Confirm password"
//                       name="confirmPassword"
//                       value={confirmPassword}
//                       className="form-control"
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                     />
//                   </label>
//                 </div>
  
//                 <div className="form_group mb-2">
//                   <label className="form-label">
//                     User Type
//                     <select
//                       name="userType"
//                       value={userType}
//                       className="form-control"
//                       onChange={(e) => setUserType(e.target.value)}
//                     >
//                       <option value="User">User</option>
//                       <option value="Artist">Artist</option>
//                     </select>
//                   </label>
//                 </div>
  
//                 {error && <div className="text-danger">{error}</div>}
  
//                 <button className="btn btn-primary btn-success" onClick={handleSignup}>
//                   Register Now
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

// export default SignUpComponent;

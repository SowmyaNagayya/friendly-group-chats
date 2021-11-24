// import React, {useState, useEffect } from "react";
// import { checkPassword } from "../../src/utils/helpers";
// import { createUser, userLogin } from '../utils/api';
// import Signup from "./Signup";

// export default function Login() {
//   const [userFormData, setUserFormData] = useState({ username: '', password: '' });
//     // Make text of error messages red
//     const errorStyle = {
//     color: "red"
// }

//     const defaultLoginFormValues = { username:"", password:""}

//     // const [userFormData, setuserFormData] = useState(defaultLoginFormValues);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [currentView, setCurrentView] = useState("Login");
    
//     // we make a copy of userFormData   ...userFormData
//     // we use setuserFormData to replace the old userFormData with the updated one
//     const handleInputChange = (e) => {

//         setUserFormData({...userFormData, [e.target.name]: e.target.value});


//     };
    
//     const handleFormSubmit = (e) => {
//         // Preventing the default behavior of the form submit (which is to refresh the page)
//         e.preventDefault();

//         // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
//         if(!userFormData.username) {
//             setErrorMessage('Username is invalid');
            
//             // We want to exit out of this code block if something is wrong so that the user can correct it
//             return;
//         }
//         // Then we check to see if the password is not valid. If so, we set an error message regarding the password.
//         if(!checkPassword(userFormData.password)) {
//             setErrorMessage(

//                 `Choose a more secure password for the account: ${userFormData.userName}`

//             );
//             return;
//         } else
//         if (userFormData.username && userFormData.password) {
//             window.location.href="/dashboard";
//         }

//         if (userFormData.username && userFormData.password) {

//         }

//         setUserFormData(defaultLoginFormValues);

        
//     };

//     const signupclick = () => {

//         window.location.href="/signup";
//         alert("Hello");
//     }
    

//     return (
//       <div className="container my-5">
//         <div className="row justify-content-center">
//           <div className="col-6">
//             <h2 className="text-center">Login Here</h2>
//             <form>
//               <div className="mb-3">
//                 <label htmlFor="nameInput" className="form-label">Username</label>
//                 <input type="text" className="form-control" value={userFormData.username} name="username" placeholder="Bob"onChange={handleInputChange} />
//               </div>
            
//               <div className="mb-3">
//                 <label htmlFor="passwordInput" className="form-label">Password</label>
//                 <input value={userFormData.password} type="password" className="form-control" name="password" placeholder="password" onChange={handleInputChange} />
//               </div>           
            
//             <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>Login</button>
//             &nbsp;&nbsp;&nbsp;
//             &nbsp;&nbsp;&nbsp;
//             <button type="submit" className="btn btn-primary" onClick={signupclick} >Signup</button>
          
//           </form>
//           {errorMessage && (
//         <div>
//           <p style={errorStyle} className="error-text">{errorMessage}</p>
//         </div>
//       )}
//         </div>
//       </div>
//     </div>

//     )
// }

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import {userLogin} from '../utils/api';

import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // useEffect(() => {
  //   if (error) {
  //     setShowAlert(true);
  //   } else {
  //     setShowAlert(false);
  //   }
  // }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const data = await userLogin( {...userFormData} );
      const final = await data.json();
      console.log(final);
      // Auth.login(data.login.token);
      // console.log("we got here");
    } catch (e) {
      console.log("Error")
      console.log(e);
    }

    // clear form values
    setUserFormData({
      username: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
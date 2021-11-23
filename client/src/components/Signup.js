// import React, {useState, useEffect } from "react";
// import Login from "./Login";
// import { checkPassword } from "../../src/utils/helpers";

// export default function Signup() {

//     console.log("Started Signup");
//     // Make text of error messages red
//     const errorStyle = {
//     color: "red"
// }

//     const defaultSignupFormValues = { username:"", password:""}

//     const [formData, setFormData] = useState(defaultSignupFormValues);
//     const [errorMessage, setErrorMessage] = useState('');
    
//     // we make a copy of formData   ...formData
//     // we use setFormData to replace the old formData with the updated one
//     const handleInputChange = (e) => {
//         setFormData({...formData, [e.target.name]: e.target.value});
//     };
    
//     const handleFormSubmit = (e) => {
//         // Preventing the default behavior of the form submit (which is to refresh the page)
//         e.preventDefault();

//         // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
//         if(!formData.username) {
//             setErrorMessage('Username is invalid');
            
//             // We want to exit out of this code block if something is wrong so that the user can correct it
//             return;
//         }
//         // Then we check to see if the password is not valid. If so, we set an error message regarding the password.
//         if(!checkPassword(formData.password)) {
//             setErrorMessage(
//                 `Choose a more secure password for the account: ${formData.userName}`
//             );
//             return;
//         }
//         setFormData(defaultSignupFormValues);
//     };
//     const loginclick = () => {
       
//         window.location.href="/";
//       //  <Signup/>
//         alert("Hello");
//         // return(
            
//         // <Signup />
//         // );
//     }
   
    

//     return (
//         <>
//        { console.log("UP")}
//       <div className="container my-5">
//         <div className="row justify-content-center">
//           <div className="col-6">
//             <h2 className="text-center">Sign Up Here</h2>
//             <form>
//               <div className="mb-3">
//                 <label htmlFor="nameInput" className="form-label">Username</label>
//                 <input type="text" className="form-control" value={formData.username} name="username" placeholder="Bob"onChange={handleInputChange} />
//               </div>
            
//               <div className="mb-3">
//                 <label htmlFor="passwordInput" className="form-label">Password</label>
//                 <input value={formData.password} type="password" className="form-control" name="password" placeholder="password" onChange={handleInputChange} />
//               </div>           
            
//             <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>Signup</button>
//             &nbsp;&nbsp;&nbsp;
//             &nbsp;&nbsp;&nbsp;
//             <button type="submit" className="btn btn-primary" onClick={loginclick}>Login</button>
          
//           </form>
//           {errorMessage && (
//         <div>
//           <p style={errorStyle} className="error-text">{errorMessage}</p>
//         </div>
//       )}
//         </div>
//       </div>
//     </div>
// </>
//     )
// }



import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createUser } from '../utils/api';

import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: '',
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = createUser();

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
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
          disabled={
            !(
              userFormData.username &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
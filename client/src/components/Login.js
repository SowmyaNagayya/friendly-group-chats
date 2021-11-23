import React, {useState, useEffect } from "react";
import { checkPassword } from "../../src/utils/helpers";
import Signup from "./Signup";

export default function Login() {

    // Make text of error messages red
    const errorStyle = {
    color: "red"
}

    const defaultLoginFormValues = { username:"", password:""}

    const [formData, setFormData] = useState(defaultLoginFormValues);
    const [errorMessage, setErrorMessage] = useState('');
    
    // we make a copy of formData   ...formData
    // we use setFormData to replace the old formData with the updated one
    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    
    const handleFormSubmit = (e) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        e.preventDefault();

        // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
        if(!formData.username) {
            setErrorMessage('Username is invalid');
            
            // We want to exit out of this code block if something is wrong so that the user can correct it
            return;
        }
        // Then we check to see if the password is not valid. If so, we set an error message regarding the password.
        if(!checkPassword(formData.password)) {
            setErrorMessage(
                `Choose a more secure password for the account: ${formData.userName}`
            );
            return;
        }
        setFormData(defaultLoginFormValues);
    };

    const signupclick = () => {
       
        window.location.href="/Signup";
      //  <Signup/>
        alert("Hello");
        // return(
            
        // <Signup />
        // );
    }
    

    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <h2 className="text-center">Login Here</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">Username</label>
                <input type="text" className="form-control" value={formData.username} name="username" placeholder="Bob"onChange={handleInputChange} />
              </div>
            
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <textarea value={formData.password} type="password" className="form-control" name="passowrd" placeholder="password" onChange={handleInputChange} />
              </div>           
            
            <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>Login</button>
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            <button type="submit" className="btn btn-primary" onClick={signupclick} >Signup</button>
          
          </form>
          {errorMessage && (
        <div>
          <p style={errorStyle} className="error-text">{errorMessage}</p>
        </div>
      )}
        </div>
      </div>
    </div>

    )
}
import React, {useState, useEffect } from "react";
import { fetchUsers } from '../../utils/api';
// import {userLogin} from '../utils/api';
// import Auth from '../utils/auth';

export default function Creategroup() {
  const [createGroup, setCreateGroup] = useState("");

  useEffect( async () => {
    let userFetch = await fetchUsers();
    let userFetchData = await userFetch.json();

    // This var should let us have a running list of all the users in the database
    console.log(userFetchData);
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreateGroup({ ...createGroup, [name]: value });
  };

    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <h2 className="text-center">Create New Group</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="groupnameInput" className="form-label">GroupName</label>
                <input type="text" className="form-control" value={createGroup} name="groupname" placeholder="GroupA" onChange={handleInputChange}/>
              </div>
            
              
            <button type="submit" className="btn btn-primary"  >Create A Group</button>
          
          </form>
        
        </div>
      </div>
    </div>

        
    )
}
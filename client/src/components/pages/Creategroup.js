import React, {useState, useEffect } from "react";
import { fetchUsers } from '../../utils/api';
import { Form,Select, Button } from 'react-bootstrap';

// import {userLogin} from '../utils/api';
// import Auth from '../utils/auth';

export default function Creategroup() {
  const [createGroup, setCreateGroup] = useState("");
  const [allUsers, setAllUsers]=useState([])

  const options =null;
  useEffect( async () => {
    let userFetch = await fetchUsers();
    let userFetchData = await userFetch.json();

    // This var should let us have a running list of all the users in the database
    console.log(JSON.stringify(userFetchData) + "Hello");
    let options =userFetchData.map((item) => {
      return (
        <option key={item._id} value={item.username}>{item.username}
        </option>
      )
    })
    setAllUsers(options)
    console.log(JSON.stringify(options) + " what options")
    
   // state(state => ({ ...state, allUsers:options }));
    
    //setAllUsers({allUsers, userFetchData} )
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreateGroup({ ...createGroup, [name]: value });
  };

  // const options = userFetchData.map((item) => {
  //   return (
  //     <option key={item.id} value={item.username}>
  //       {item.username}
  //     </option>
  //   )
  // })

  // const handleFormSubmit = async (event) => {
  //   event.preDefault();

  //   const formGroup = event.currentTarget; 
  //   if(formGroup.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  // }

    return (
      <Form>
      <Form.Group>
          <Form.Label htmlFor="groupname">Groupname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Groupname"
            name="groupname"
            onChange={handleInputChange}
            value={createGroup.name}
            required
          />
              <Form.Control as="select" multiple>
                {allUsers}
              </Form.Control>
              {/* <Form.Select
                data={userFetchData.map((item) =>item.username)}
                selectMultiple={true}
                touchUi={false}
              /> */}
            </Form.Group>
            <Button
              // disabled={!(createGroup.name && allUsers)}
              type="submit"
              variant="success"
            >
              Create Group
            </Button>
            </Form>
          
        
       

        
    )
}
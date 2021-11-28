import React, {useState, useEffect } from "react";
import { fetchUsers ,createGroup} from '../../utils/api';
import { Form,Select, Button } from 'react-bootstrap';

// import {userLogin} from '../utils/api';
// import Auth from '../utils/auth';

export default function Creategroup() {
  const [createGroupName, setCreateGroupName] = useState("");
  const [allUsers, setAllUsers]=useState([])
  const [selectedUsers, setSelectedUsers]=useState([])
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const options =null;
  useEffect( async () => {
    let userFetch = await fetchUsers();
    let userFetchData = await userFetch.json();    

    // This var should let us have a running list of all the users in the database
    console.log(JSON.stringify(userFetchData) + "Hello");
    let options =userFetchData.map((item) => {
      return (
        <option key={item._id} value={item._id}>{item.username}
        </option>
      )
    })
    setAllUsers(options)
    //console.log(JSON.stringify(options) + " what options")
       
  } ,[])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreateGroupName({ ...createGroupName, [name]: value });
  };

  
  const handleFormSubmit = async (event) => {
   
    event.preventDefault();
    const formGroup = event.currentTarget; 
    console.log("here" + createGroupName.groupname + selectedUsers );

    if(formGroup.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

    try {
      var name = JSON.stringify(createGroupName.groupname);
      var users = selectedUsers;
      
      var groupData = {name,users}
     
      const response = await createGroup( groupData)
      alert("Submitted");

     
      if (!response.ok) {
              throw new Error('something went wrong!');
            }

            const group  = await response.json();
            const finalGroup = await group;
            
          } catch (e) {
            console.log("Error")
            setShowAlert(true);
          }
          setCreateGroupName(createGroupName)
          setSelectedUsers(selectedUsers)
        }

  const handleUserChange=  (event) => {
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    setSelectedUsers(value);
    //alert(value + "my selected values")
  }

  

    

    return (
      <>
        <div className="row">
          <div className="p-4 d-flex justify-content-center">
            <Form className="p-4" style={{ width: "30rem", border: ".5rem solid #539987", boxShadow: "5px 5px 10px gray"}} noValidate validated={validated} onSubmit={handleFormSubmit}>
              <Form.Group className="p-4">
                  <Form.Label htmlFor="groupname">Group Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Group Name"
                    name="groupname"
                    onChange={handleInputChange}
                    value={createGroupName.name}
                    required
                  />
                      
                  <Form.Label htmlFor="addfriend">Add Friends to Your Group</Form.Label>
                  <Form.Control as="select" multiple onChange={handleUserChange}>
                    {allUsers}
                  </Form.Control>
                        {/* <Form.Select
                          data={userFetchData.map((item) =>item.username)}
                          selectMultiple={true}
                          touchUi={false}
                        /> */}
              </Form.Group>
              <div className="d-flex justify-content-center">
                  <Button
                  //  disabled={!(createGroup.name && allUsers.username)}
                    type="submit"
                    variant="secondary" >
                      Create Group
                  </Button>
                </div>
            </Form> 
          </div>
        </div>
      </>
    )
}

import React, {useState, useEffect } from "react";
import { fetchGroup ,fetchUsers,updateGroup} from '../../utils/api';
import { Form,Select, Button } from 'react-bootstrap';
import {useParams} from "react-router-dom";
//import { param } from "../../../../server/routes/api";

// import {userLogin} from '../utils/api';
// import Auth from '../utils/auth';

export default function Updategroup(props) {
  const [updateGroupName, setUpdateGroupName] = useState("");
  const [allUsers, setAllUsers]=useState([])
  const [selectedUsers, setSelectedUsers]=useState([])
  const [validated] = useState(false);
  const {id} = useParams()
  // set state for alert
  
  const [showAlert, setShowAlert] = useState(false);
  const options =null;
  useEffect( async () => {
    console.log(id)
    console.log(JSON.stringify(props) + "my group id");
    let groupFetch = await fetchUsers();
    let groupFetchData = await groupFetch.json();

    // This var should let us have a running list of all the users in the database
    //== console.log(JSON.stringify(groupFetchData) + "Hello");
    let options =groupFetchData.map((item) => {
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
    setUpdateGroupName(value);
  };

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formGroup = event.currentTarget; 
    console.log("here" + updateGroupName + selectedUsers );
    
    if(formGroup.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    try {
      var name = updateGroupName;
      var users = selectedUsers;
      var groupData = {name,users}
      const response = await updateGroup( groupData,id)
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
      setUpdateGroupName(updateGroupName)
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

  const handleUpdateGroup = () => {
    const groupData = {

    }
    console.log(updateGroupName,selectedUsers)
  }

  

    

    return (
     <div class="p-4 d-flex justify-content-center">
          <Form className="p-4" style={{ width: "30rem", border: ".5rem solid #539987", boxShadow: "5px 5px 10px gray"}} noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Form.Group className="p-4">
                <Form.Label htmlFor="groupname">Groupname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Groupname"
                  onChange={(event)=> setUpdateGroupName(event.target.value)}
                  value={updateGroupName}
                  required
                />
                <Form.Label htmlFor="addfriend">Add Friends to Your Group</Form.Label>
                <Form.Control name="" as="select" multiple onChange={handleUserChange}>
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
                  handleUpdateGroup={handleUpdateGroup}
                  type="submit"
                  variant="secondary" >
                  Update Group
                </Button>
              </div>
          </Form>
      </div>
    )
}

import React, {useState, useEffect } from "react";
import { fetchGroup, fetchUsers, updateGroup} from '../../utils/api';
import { Form, Button } from 'react-bootstrap';
import {useParams} from "react-router-dom";

export default function Updategroup(props) {
  const [allUsers, setAllUsers]=useState([])
  const [selectedUsers, setSelectedUsers]=useState([])
  const [validated] = useState(false);
  const {id} = useParams();
  const [ groupTitle, setGroupTitle ]= useState('');
  const [updateGroupName, setUpdateGroupName] = useState('');

  useEffect( async () => {
    let groupFetch = await fetchUsers();
    let groupFetchData = await groupFetch.json();
    let options =groupFetchData.map((item) => {
      return (
        <option key={item._id} value={item._id}>{item.username}
        </option>
      )
    })
    setAllUsers(options);
    getGroupData()
      
  } ,[])

  const getGroupData = async () => {
    let groupFetch = await fetchGroup(id);
    let groupFetchData = await groupFetch.json();
    setGroupTitle(JSON.parse(groupFetchData.name));
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formGroup = event.currentTarget; 
    
    if(formGroup.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    try {
      var name = JSON.stringify(updateGroupName);
      var users = selectedUsers;
      var groupData = {name,users}
      const response = await updateGroup( groupData,id)
      alert("Group Updated!");
      window.location.href=`/group/${id}`;

      if (!response.ok) {
              throw new Error('something went wrong!');
            }
    } catch (e) {
            console.log("Error")
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
  }

    return (
     <div class="p-4 d-flex justify-content-center">
          <Form className="p-4" style={{ width: "30rem", border: ".5rem solid #539987", boxShadow: "5px 5px 10px gray"}} noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Form.Group className="p-4">
                <Form.Label htmlFor="groupname">Groupname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={groupTitle}
                  onChange={(event)=> setUpdateGroupName(event.target.value)}
                  value={updateGroupName}
                  required
                />
                <Form.Label htmlFor="addfriend">Add Friends to Your Group</Form.Label>
                <Form.Control name="" as="select" multiple onChange={handleUserChange}>
                  {allUsers}
                </Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  variant="secondary" >
                  Update Group
                </Button>
              </div>
          </Form>
      </div>
    )
}

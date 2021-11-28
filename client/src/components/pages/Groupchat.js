import React, {useState, useEffect } from "react";
import { fetchGroup,  fetchChats, updateGroup, deleteGroup, createChat, fetchUsers} from '../../utils/api';
import { Card, Button, Form } from 'react-bootstrap';
import {useParams} from "react-router-dom";

export default function Groupchat(props) {
    const { id } = useParams()
    const [ chat, setChat ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ input, setInput] = useState('');
    console.log(id);
    // const [ groupID, setGroupID ]= useState(id);

    //Fetches User Data
    const getUserData = async () => {
        let userFetch = await fetchUsers();
        let userFetchData = await userFetch.json();
        setUsers(userFetchData);
    }

    //Fetches Chat Data
    const getChatData = async () => {
        // console.log(id);
        let chatsFetch = await fetchChats(id);
        // console.log(chatsFetch);
        let chatsFetchData = await chatsFetch.json();
        // console.log(chatsFetchData);
        setChat(chatsFetchData);
    }

    // TODO: Compare passed in userid to users list and return name
    const getUsername = (userid) => {
        //  Confirming passed in id is right
        console.log(userid);
        //  if users._id does not === userid return and do nothing
        if (users._id !== userid) {
            return
        } //    else if users._id does === return that users.username
        else if (users._id === userid) {
            return this
        }
    }

    //Renders Chat Cards
    const renderCard = (card, index) => {
        //  id === current groups id
        //  card.group === a group id attached to the comment it's looping through
        //  if id does not === card.group return and do nothing
        if (id !== card.group) {
            return
        }   // else if id does === card.group run the getUsername function and return comment card to page
        else if (id === card.group) {
            //  TODO: Go over this function and get it working
            let username = getUsername(card.user)
            //  Used this console to check what I was getting back not needed for functionality
            // console.log(username);
            return (
                <Card style={{ width: '18rem', border: ".25rem solid #539987", boxShadow: "2px 2px 5px gray" }} key={index}>
                    <Card.Body>
                        <Card.Title>{username}</Card.Title>
                        <Card.Text>{card.body}</Card.Text>
                        {/* <Button id={card._id} variant="success">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            )
        }
    }

    //Fetches Group Data
    // We only need to fetch this data to display the name at the top of the page
    const getGroupData = async () => {
        // console.log(id);
        let groupFetch = await fetchGroup(id);
        // console.log(groupFetch);
        let groupFetchData = await groupFetch.json();
        // console.log(groupFetchData);
        // setGroupID(id);
    }

    useEffect( async () => {
        getChatData();
        getGroupData();
        getUserData();
    }, [])

    const UpdateGroupClick = () => {
        window.location.href="/editgroup/" + id;
        alert("Hello"); 
    }

    const deleteGroupClick = async () => {
        const response = await deleteGroup(id) 
        window.location.href="/dashboard";
        alert("Hello");
    }





    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const createChatClick = ( e, req ) => {
        //  Prevent page reload
        e.preventDefault();

        //  This is logging exactly what we need just putting it in the database everytime a button is hit.
        console.log(input);

        //  TODO: get final value of input for the body, we still need a way to get group id and user id then use createChat to submit that to database and set form empty again.
        
        //Figure out how to pass the group id in - can pass in as object?
        createChat(input);
    }

    return (
        <>
        <div className="row">
            <div className="p-4 d-flex justify-content-center">
                <button type="button" className="btn btn-primary col-2" onClick={UpdateGroupClick}>Update Group</button>
                &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <button type="button" className="btn btn-danger col-2" onClick={deleteGroupClick}>Delete Group</button>
            </div>
        </div>
            <div>
                <div className='d-flex justify-content-center'>{chat.map(renderCard)}</div>
            </div>
            <div className="row p-4">
                <div className="d-flex justify-content-center">
                    <Form onClick={createChatClick}   className="p-4" style={{ border: ".5rem solid #539987", boxShadow: "5px 5px 10px gray"}}>
                        <Form.Group className="mb-3" controlId="sendMessageForm">
                            <Form.Control onChange={handleInput} name='body' type="text" placeholder="Message" className="col-4"/>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="secondary" type="submit" id="messageBtn">Send Message</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
        
    )
}
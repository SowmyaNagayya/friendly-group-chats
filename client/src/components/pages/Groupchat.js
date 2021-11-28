import React, {useState, useEffect } from "react";
import { fetchGroup,  fetchChats, updateGroup, deleteGroup, createChat, fetchUsers} from '../../utils/api';
import { Card, Button, Form } from 'react-bootstrap';
import {useParams} from "react-router-dom";

export default function Groupchat(props) {
    const { id } = useParams()
    const [ chat, setChat ] = useState([]);
    const [ users, setUsers ] = useState([]);
    console.log(users);
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

    //  TODO: Choose between this method and below method whatever works better
    //  This method doesn't quite log what I need but seems to be more on the right track
    // const createChatClick = async ( e ) => {
    //     //  Prevent page reload
    //     e.preventDefault();

    //     //  Giving the events targets value a variable
    //     const message = e.target.value;

    //     //  Logging to test and getting nothing in console.
    //     console.log(message);
    // }

    // TODO: Choose between this method and above method whatever works better
    // This method logs the message but it's not quite right
    const createChatClick = async ( e ) => {
        //  Prevent page reload
        e.preventDefault();

        //  Giving sendMessageForm a variable
        const message = document.getElementById('sendMessageForm').value;

        //  Stringifying that variable
        JSON.stringify(message);

        //  Logging that value
        console.log(message);

        //  This is calling the createChat route to put in the database but it doesn't right now
        createChat(message);
        //  TODO: Attach group id and user id to message
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
                    <Form className="p-4" style={{ border: ".5rem solid #539987", boxShadow: "5px 5px 10px gray"}}>
                        <Form.Group className="mb-3" controlId="sendMessageForm">
                            <Form.Control type="text" placeholder="Message" className="col-4"/>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="secondary" type="submit" id="messageBtn" onClick={createChatClick}>Send Message</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
        
    )
}
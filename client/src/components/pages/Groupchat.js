import React, {useState, useEffect } from "react";
import { fetchGroup,  fetchChats, updateGroup, deleteGroup, createChat, fetchUsers} from '../../utils/api';
import {  Button, Form } from 'react-bootstrap';
import {useParams} from "react-router-dom";
import { MDBContainer } from "mdbreact";

export default function Groupchat(props) {
    const { id } = useParams()
    const [ chat, setChat ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ input, setInput] = useState('');

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
                <div className="d-flex justify-content-center">
                    <p>{card.body}</p>
                </div>
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
    }

    const deleteGroupClick = async () => {
        const response = await deleteGroup(id) 
        window.location.href="/dashboard";
    }

    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const createChatClick = ( e, req ) => {
        //  Prevent page reload
        e.preventDefault();
        createChat({input, id});
    }

    const scrollContainerStyle = { width: "800px", maxHeight: "400px" };

    return (
        <>
        <div className="row">
            <div className="p-4 d-flex justify-content-center">
                <button type="button" className="btn col-2" onClick={UpdateGroupClick} style={{backgroundColor: "#b490ca", color: "white", fontWeight: "bold"}}>Update Group</button>
                &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <button type="button" className="btn col-2" onClick={deleteGroupClick}  style={{backgroundColor: "#41a19c", color: "white", fontWeight: "bold"}}>Delete Group</button>
            </div>
        </div>
            <div>
                <MDBContainer>
                    <div className="row scrollbar scrollbar-near-moon mt-5 mx-auto" style={scrollContainerStyle}>
                        <div className='row'>{chat.map(renderCard)}</div>
                    </div>
                </MDBContainer>
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
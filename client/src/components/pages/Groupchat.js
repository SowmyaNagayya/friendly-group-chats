import React, { useState, useEffect } from "react";
import { fetchGroup,  fetchChats, deleteGroup, createChat, fetchUser} from '../../utils/api';
import { Button, Form } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { MDBContainer } from "mdbreact";
import anime from 'animejs/lib/anime.es.js';

export default function Groupchat() {
    const { id } = useParams()
    const [ chat, setChat ] = useState([]);
    const [ generatedContent, setgeneratedContent ] = useState([]);
    const [ input, setInput ] = useState('');
    const [ groupTitle, setGroupTitle ]= useState('');

    anime({
        targets: '#target',
        translateX: ['-10v', '10vw'],
        background: ['#b490ca', '#41a19c'],
        endDelay: 1000,
        loop: true,
        easing: 'easeInOutQuad',
        direction: 'alternate'
    });

    const getChatData = async () => {
        let chatsFetch = await fetchChats(id);
        let chatsFetchData = await chatsFetch.json();
        setChat(chatsFetchData);
    }

    const getUsername = async ( userid ) => {
        let singleUser = await fetchUser(userid);
        let singleUserData = await singleUser.json()
        return singleUserData.username
    }

    const renderCard = async ( card, index ) => {
        if (id !== card.group) {
            return 
        }
        else if ( id === card.group ) {
            let username = await getUsername(card.user)
            return (

                <div className="d-flex justify-content-center" key={index}>
                    <p>{username}: {card.body}</p> 
                </div>
            )
        }
    }

    const getGroupData = async () => {
        let groupFetch = await fetchGroup(id);
        let groupFetchData = await groupFetch.json();
        setGroupTitle(JSON.parse(groupFetchData.name));
    }

    useEffect( async () => {
        getChatData();
        getGroupData();
    }, [])

    useEffect( () => {
        Promise.all(chat.map(renderCard)).then(xyz => setgeneratedContent(xyz))
    }, [chat])

    const UpdateGroupClick = () => {
        window.location.href="/editgroup/" + id;
    }

    const deleteGroupClick = async () => {
        const response = await deleteGroup(id) 
        window.location.href="/dashboard";
    }

    const handleInput = ( e ) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const createChatClick = async ( e ) => {
        e.preventDefault();
        try {
            await createChat({input, id});
            window.location.href=`/group/${id}`
        }
        catch (err) {
            console.error(err);
          }
    }

    const scrollContainerStyle = { width: "auto", maxHeight: "400px" };

    return (
        <>
            <div className="row">
                <div className="d-flex p-3 justify-content-center">
                    <div style={{backgroundColor: "#b490ca", fontSize: '2em', borderRadius: '25px', padding: '5px', color: "white", fontWeight: "bold"}} id="target">{groupTitle}</div>
                </div>
            </div>
            <div className="row">
                <div className="p-4 d-flex justify-content-center">
                    <button type="button" className="btn col-lg-2 col-sm-5" onClick={UpdateGroupClick} style={{backgroundColor: "#b490ca", color: "white", fontWeight: "bold"}}>Update Group</button>
                    &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" className="btn col-lg-2 col-sm-5" onClick={deleteGroupClick}  style={{backgroundColor: "#41a19c", color: "white", fontWeight: "bold"}}>Delete Group</button>
                </div>
            </div>
            <div className="row">
                <div className="d-flex justify-content-center">
                    <MDBContainer className="d-flex justify-content-center">
                        <div className="row scrollbar scrollbar-near-moon mt-5 mx-auto" style={scrollContainerStyle}>
                            <div>{generatedContent.map(element=>element)}</div>
                        </div>
                    </MDBContainer>
                </div>
                <div className="p-4 col-md-12">
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
            </div>
        </>
    )
}
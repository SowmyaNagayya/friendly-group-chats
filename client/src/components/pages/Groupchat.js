import React, {useState, useEffect } from "react";
import { fetchGroup,  fetchChats, updateGroup, deleteGroup} from '../../utils/api';
import { Card, Button } from 'react-bootstrap';
import {useParams} from "react-router-dom";

export default function Groupchat(props) {
    const [ chat, setChat ] = useState([]);
    const [groupID,setGrouID]=useState('');
    const {id} = useParams()
    const getChatData = async() => {
        let chatsFetch = await fetchChats();
        let chatsFetchData = await chatsFetch.json();

        setChat(chatsFetchData);
        console.log(chatsFetchData);
    }

    const renderCard = (card, index) => {
        return (
            <Card border="info" style={{ width: '18rem' }} key={index}>
                <Card.Body>
                    <Card.Title>{card.body}</Card.Title>
                    <Card.Text>
                        This is where most recent message will go
                    </Card.Text>
                    {/* <Card.Link id={card.id} href="#" onClick={certainGroupClick}>See Chat</Card.Link> */}
                    <Button id={card._id} variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        )
    }


    useEffect( async () => {
        let groupFetch = await fetchGroup();
        let groupFetchData = await groupFetch.json();


        //this should console.log specific group data
        console.log(groupFetchData._id + "groupdata");
        setGrouID(groupFetchData._id)
        getChatData();
    }, [])

    const UpdateGroupclick = () => {
       
        window.location.href="/editgroup/" + id;
      //  <Signup/>
        alert("Hello");
        
        // props.onSubmit({
        //     id: groupID
        //   });
        // return( 
        // <Signup />
        // );
    }

    const deleteGroupclick = async () => {
        const response = await deleteGroup(id) 
        window.location.href="/dashboard";
      //  <Signup/>
        alert("Hello");
        // return(
        // <Signup />
        // );
    }



    return (
        <>
        <button type="button" class="btn btn-success" onClick={UpdateGroupclick}>Update Group</button>
        &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;
        <button type="button" class="btn btn-success" onClick={deleteGroupclick}>Delete Group</button>
        <div>
            <p>this is the groupchat component loading</p>
            <p> Hello World!</p>
            <div>{chat.map(renderCard)}</div>
        </div>
        </>
        
    )
}
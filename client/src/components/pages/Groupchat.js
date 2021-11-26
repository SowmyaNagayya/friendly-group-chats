import React, {useState, useEffect } from "react";
import { fetchGroup,  fetchChats} from '../../utils/api';
import { Card, Button } from 'react-bootstrap';

export default function Groupchat() {
    const [ chat, setChat ] = useState([]);

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
        console.log(groupFetchData);

        getChatData();
    })

    return (
        <div>
            <p>this is the groupchat component loading</p>
            <p> Hello World!</p>
            <div>{chat.map(renderCard)}</div>
        </div>
        
    )
}
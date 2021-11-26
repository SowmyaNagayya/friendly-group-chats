import React, {useState, useEffect } from "react";
import { fetchGroups } from '../../utils/api';
import { Card } from 'react-bootstrap';


export default function Dashboard(props) {
    
    const [ groups, setGroups ] = useState([]);

    const getGroupsData = async() => {
        let groupFetch = await fetchGroups();
        let groupFetchData = await groupFetch.json();
        setGroups(groupFetchData);
    }

    useEffect( () => {
        getGroupsData()
    }, [])

    const renderCard = (card, index) => {
        return (
            <Card border="info" style={{ width: '18rem' }} key={index}>
                    <Card.Body>
                        <Card.Title>{card.name}</Card.Title>
                        <Card.Text>
                            This is where most recent message will go
                        </Card.Text>
                        <Card.Link href="#" onClick={certainGroupClick}>See Chat</Card.Link>
                        <Card.Link href="#" onClick={removeGroupClick}>Delete Chat</Card.Link>
                    </Card.Body>
                </Card>
        )
    }

    const createGroupclick = () => {
        window.location.href="/newgroup";
      //  <Signup/>
        alert("Hello");
        // return(
        // <Signup />
        // );
    }

    const certainGroupClick = () => {
        window.location.href="/:id";
        alert("something");
    }

    const removeGroupClick = () => {
        window.location.href="/:id";
        alert("removed group");
    }


    return (
        <>
            <div className="row">
                <button type="button" class="btn btn-success" onClick={createGroupclick}>Create New Chat</button>
                <div>{groups.map(renderCard)}</div>

                {/* {props.groups.map((group) => (
                    <div class="col-sm-6">
                    
                        <div class="card" key={group.id}>
                            <div class="card-body">
                                <h5 class="card-title">{group.name}</h5>
                                <p class="card-text">{group.chats}</p>
                                <a href='/group/${group.id}' class="btn btn-primary">Go to chat</a>
                            </div>
                        </div>
                    </div>
                ))} */}
            </div>
        </>
    )
}
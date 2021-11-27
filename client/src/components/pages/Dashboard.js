import React, {useState, setState,useEffect } from "react";
import { fetchGroups } from '../../utils/api';
import { Card, Button } from 'react-bootstrap';


export default function Dashboard(props) {
    
    const [ groups, setGroups ] = useState([]);
    const [list, setList] = useState([]);

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
                    {/* <Card.Link id={card.id} href="#" onClick={certainGroupClick}>See Chat</Card.Link> */}
                    <Button id={card._id} variant="primary" onClick={certainGroupClick}>Go somewhere</Button>
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

    const certainGroupClick = (e) => {

        const id = e.currentTarget.id;
        console.log(id.trim());

        const newid = id.trim()
        window.location.href=`/group/${newid}`;
        // alert("something");
    }

        
    

    return (
        <>
            <div className="row">
                <div className="p-4 d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" onClick={createGroupclick}>Create New Group</button>
                </div>
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
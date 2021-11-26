import React, {useState, setState,useEffect } from "react";
import { fetchGroups } from '../../utils/api';
import { Card } from 'react-bootstrap';


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
                        <Card.Link id={card._id.trim()} href="#" onClick={certainGroupClick}>See Chat</Card.Link>
                        <Card.Link href="#" onClick={removeGroupClick}>Delete Chat</Card.Link>
                        <div className="row">
                <button type="button" class="btn btn-success" onClick={editGroupClick}>Update Group</button>
                

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
        const id = e.target.id
        console.log(id)
        window.location.href=`/group/${id.trim()}`;
        // alert("something");
    }

    const removeGroupClick = () => {
       
  }

        // I need a way to get the group clicked and hit the route for deleting that group

        const editGroupClick = () => {
            window.location.href="/newgroup";
          //  <Signup/>
            alert("Hello");
            // return(
            // <Signup />
            // );
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
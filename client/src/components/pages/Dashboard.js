import React, {useState, useEffect } from "react";
import { fetchGroups } from '../../utils/api';
import { Card, Button } from 'react-bootstrap';

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
            <div className="p-4">
                <Card className="p-3" style={{ width: '18rem', border: ".5rem solid #539987", boxShadow: "5px 5px 10px gray" }} key={index}>
                    <Card.Body>
                        <div className="row">
                            <div className="d-flex justify-content-center">
                                <Card.Title>{card.name}</Card.Title>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex justify-content-center">
                                <Button id={card._id} variant="secondary" onClick={certainGroupClick}>Go to Group</Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    const createGroupclick = () => {
        window.location.href="/newgroup";
    }

    const certainGroupClick = (e) => {

        const id = e.currentTarget.id;
        const newid = id.trim()
        window.location.href=`/group/${newid}`;
    }

        
    

    return (
        <>
            <div className="row">
                <div className="p-4 d-flex justify-content-center">
                    <button type="button" class="btn" onClick={createGroupclick} style={{backgroundColor: "#b490ca", color: "white", fontWeight: "bold"}}>Create New Group</button>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-center p-4 flex-wrap">
                        {groups.map(renderCard)}
                    </div>
                </div>
            </div>
        </>
    )
}
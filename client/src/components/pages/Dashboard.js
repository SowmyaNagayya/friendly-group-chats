import React, {useState, useEffect } from "react";
import { fetchGroups } from '../../utils/api';

export default function Dashboard(props) {
    //  We need a way to pull the data from mongo db

    useEffect(() => {
        let fetch = fetchGroups()
        console.log(fetch);
    })



    return (
        <>
            <div className="row">
                <button type="button" class="btn btn-success">Create New Chat</button>
                {props.groups.map(group => (
                    <div class="col-sm-6">
                        <div class="card" key={group.id}>
                            <div class="card-body">
                                <h5 class="card-title">{group.name}</h5>
                                <p class="card-text">{group.chats}</p>
                                <a href='/group/${group.id}' class="btn btn-primary">Go to chat</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
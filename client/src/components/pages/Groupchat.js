import React, {useState, useEffect } from "react";
import { fetchGroup,  fetchChats} from '../../utils/api';

export default function Groupchat() {
    // need to fetchGroup
    useEffect(() => {
        let groupFetch = fetchGroup();
        let chatsFetch = fetchChats();

        //this should console.log specific group data
        console.log(groupFetch);

        //this should console.log chats for a specific group
        console.log(chatsFetch);
    })

    return (
        <div>
            
        </div>
        
    )
}
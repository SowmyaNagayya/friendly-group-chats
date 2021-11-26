import React, {useState, useEffect } from "react";
import { fetchGroup,  fetchChats} from '../../utils/api';

export default function Groupchat() {
    // need to fetchGroup
    useEffect( async () => {
        let groupFetch = await fetchGroup();
        let groupFetchData = await groupFetch.json();

        let chatsFetch = await fetchChats();
        let chatsFetchData = await chatsFetch.json();

        //this should console.log specific group data
        console.log(groupFetchData);

        //this should console.log chats for a specific group
        console.log(chatsFetchData);
    })

    return (
        <div>
            <p>this is the groupchat component loading</p>
            <p> Hello World!</p>
        </div>
        
    )
}
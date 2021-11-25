import React, {useState, useEffect } from "react";
import { fetchGroup } from '../../utils/api';

export default function Updategroup(props) {

    useEffect( async () => {
        let groupFetch = await fetchGroup();
        let groupFetchData = await groupFetch.json();

        //This should log one groups data that we are trying to update
        console.log(groupFetchData);
    })

    return (
        <div>
            
        </div>
        
    )
}
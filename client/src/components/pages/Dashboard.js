import React, {useState, useEffect } from "react";

export default function Dashboard(props) {
    return (
        <>
            <div className="row">
                <button type="button" class="btn btn-success">Create New Chat</button>
                {props.chats.map(chat => (
                    <div class="col-sm-6">
                        <div class="card" key={chat.id}>
                            <div class="card-body">
                                <h5 class="card-title">{chat.name}</h5>
                                <p class="card-text">{chat.message}</p>
                                <a href='/group/${chat.id}' class="btn btn-primary">Go to chat</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
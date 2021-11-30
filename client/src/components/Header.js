import React from "react";
import { FaHome, FaRegWindowClose } from 'react-icons/fa';
import Auth from '../utils/auth';
import { userLogout } from "../utils/api";

export default function Header() {

    const renderHome = () => {
        if (Auth.loggedIn()) {
            return <a href="/dashboard"
                style={{ fontSize: "18px", textDecoration: "none", textTransform: "uppercase", color: "white" }}>
                <div className="bi d-flex justify-content-center mx-auto mb-1">
                    <FaHome style={{ fontSize: "2.5rem", color: "white" }} />
                </div>
                Home
            </a>;
        }
        else return;
    };

    const handleLogout = () => {
        Auth.logout();
        userLogout().then(response => {
            window.location.replace("/")
        })

    }
    
    const renderLogout = () => {
        if (Auth.loggedIn()) {
            return <a href="#"
                onClick={handleLogout}
                style={{ fontSize: "18px", textDecoration: "none", textTransform: "uppercase", color: "white" }}>
                <div className="bi d-flex justify-content-center mx-auto mb-1">
                    <FaRegWindowClose style={{ fontSize: "2.5rem", color: "white" }} />
                </div>
                Logout
            </a>;
        }
        else return;
    };

    return (
        <header style={{ backgroundColor: "#539987", color: "white" }}>
            <div className="px-3 py-2" id="header">
                <div className="container row">
                    <div className="col-md-12 col-lg-5 d-flex align-items-center justify-content-center">
                        <h1 id="header-name">Friendly Group Chats</h1>
                    </div>
                    <div className="d-flex col-md-12 col-lg-7 justify-content-center">
                        <div className="p-4">
                            {renderHome()}
                        </div>
                        <div className="p-4">
                            {renderLogout()}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
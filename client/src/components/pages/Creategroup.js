import React, {useState, useEffect } from "react";

export default function Creategroup() {

    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <h2 className="text-center">Create New Group</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="groupnameInput" className="form-label">GroupName</label>
                <input type="text" className="form-control" value="" name="groupname" placeholder="GroupA"/>
              </div>
            
              
            <button type="submit" className="btn btn-primary"  >Create A Group</button>
          
          </form>
        
        </div>
      </div>
    </div>

        
    )
}
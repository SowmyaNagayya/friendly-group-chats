export const createUser = (userData) => {
    return fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
  };
  
  export const userLogin = (userData) => {
    return fetch('/api/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };

  export const fetchGroups = async(user) => {
    return await fetch('/api/group/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  //I think we need to pass in the group id to complete the route
  export const fetchGroup = (user) => {
    return fetch('/api/group/:id', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  //I think we need to pass i nthe group id to complete the route
  export const fetchChats = (group) => {
    return fetch('/api/chat/:id', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  export const fetchUsers = () => {
    return fetch('/api/user/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
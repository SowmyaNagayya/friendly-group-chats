export const createUser = (userData) => {
    return fetch('/api/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
  };
  
  export const userLogin = (userData) => {
    return fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };

  export const fetchGroups = (user) => {
    return fetch('/api/group/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
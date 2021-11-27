export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

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

  //Create group data
  export const createGroup = (groupData) => {
    alert("hello");
    return fetch('/api/group/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData)
    });
  }

  //Update Group
  export const updateGroup = (updategroupData,id) => {
    alert("hello");
    return fetch('/api/group/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updategroupData)
    });
  }

  //Delete group
  export const deleteGroup = (id) => {
    alert("hello");
    return fetch('/api/group/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteGroup)
    });
  }
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
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
  };
  
  export const userLogin = (userData) => {
    return fetch('/api/user/', {
      method: 'POST',
      credentials: 'include',
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

  export const fetchGroup = (id) => {
    return fetch(`/api/group/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  export const fetchUser = (id) => {
    return fetch(`/api/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  export const fetchChats = (id) => {
    return fetch(`/api/chat/${id}`, {
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
  };

  //Create group data
  export const createGroup = (groupData) => {
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
    return fetch('/api/group/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteGroup)
    });
  }

  //Create chat
  export const createChat = (data) => {
    return fetch('/api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  };

  export const userLogout = (userData) => {
    return fetch('/api/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
export const server = 'https://webdev-backend-alpha1.herokuapp.com';
// export const server = 'http://localhost:3001';

export const searchFlights = async (origin, destination, adults, date) => {
  const response = await fetch(
      `${server}/api/flights/${origin}/${destination}/${adults}/${date}`);
  return await response.json()
};

export const registerUser = async (user) => {
  const response = await fetch(
      `${server}/api/user`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          "content-type": 'application/json'
        },
        credentials: "include"
      });
  let res = await response;
  if (!res.ok) {
    return false
  } else {
    return await res.json()
  }
};

export const loginUser = async (user) => {
  const response = await fetch(
      `${server}/api/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          "content-type": 'application/json'
        },
        credentials: "include"
      });
  let res = await response;
  if (res.status === 404) {
    return false
  } else {
    return await res.json()
  }
};

export const fetchProfile = async () => {
  const response = await fetch(
      `${server}/api/profile`, {
        method: 'POST',
        credentials: "include"
      });
  let profile = await response;
  if (profile.ok) {
    return await profile.json()
  } else {
    return false
  }
};

export const logoutUser = async () => {
  const response = await fetch(
      `${server}/api/logout`, {
        method: 'POST',
        credentials: "include"
      });
  return await response.json()
};

export const bookTicket = async (user) => {
  const response = await fetch(`${server}/api/user/${user._id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    },
    credentials: "include"
  });
  return await response.json()
};

export const updateUser = async (modifiedUser) => {
  const response = await fetch(`${server}/api/user/${modifiedUser._id}`, {
    method: 'PUT',
    body: JSON.stringify(modifiedUser),
    headers: {
      'content-type': 'application/json'
    },
    credentials: "include"
  });
  return await response.json()
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${server}/api/user/${userId}`, {
    method: 'DELETE'
  });
  return await response.json()
};

export const searchHotels = async (location) => {
  const response = await fetch(`${server}/api/search/hotels/${location}`);
  return await response.json()
};

export const findAllUsers = async () => {
  const response = await fetch(`${server}/api/users`);
  return await response.json()
};

export const fetchCurrencyList = async () => {
  const response = await fetch(`${server}/api/currency/list`);
  return await response.json()

};

export const convertCurrency = async (from, to, amount) => {
  const response = await fetch(`${server}/api/currency`, {
    method: 'POST',
    body: JSON.stringify({
      from: from,
      to: to,
      amount: amount
    }),
    headers: {
      'content-type': 'application/json'
    }
  });

  return await response.json();
};

export const adminPassUpdate = async (uid, newPassword) => {
  const response = await fetch(`${server}/api/user/${uid}`, {
    method: 'PUT',
    body: JSON.stringify({password: newPassword}),
    headers: {
      'content-type': 'application/json'
    },
    credentials: "include"
  });
  return await response.json()
};



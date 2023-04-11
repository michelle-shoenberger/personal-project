import axios from 'axios'
import Cookies from 'js-cookie';

export const createUser = async (username, pwd, email) => {
  let resp = await axios.post('/api/signup/', {
    username: username,
    password: pwd,
    email: email
  })
    .catch((e) => {
      console.log("Login error: " + e)
    });
  console.log(resp.data)
  if (resp.data.success) {
    Cookies.set('token', resp.data.token, {expires: 1/48})
    axios.defaults.headers.common['Authorization'] = "Token " + resp.data.token;
    return resp.data
  } else {
    return False
  }
};

export const loginUser = async (username, pwd) => {
  let resp = await axios.post('/api/login/', {
    username: username,
    password: pwd
  })
    .catch((e) => {
      console.log("Login error: " + e)
    });
  if (resp.data.success) {
    Cookies.set('token', resp.data.token, {expires: 1/48})
    axios.defaults.headers.common['Authorization'] = "Token " + resp.data.token;
    return resp.data
  } else {
    return false
  }
}

export const persistUser = async () => {
  const token = Cookies.get('token')
  const csrftoken = Cookies.get('csrftoken')
  if (token) {
    console.log('api call for whoami', token)
    axios.defaults.headers.common['Authorization'] = "Token " + token;
    const resp = await axios.post('/api/whoami/')
      .catch((e) => {
        console.log("Usercheck error: " + e)
      });
    if (resp.data.token) {
      Cookies.set('token', resp.data.token, {expires: 1/48})
      return resp.data
    } 
  } else {
    return null
  }
};

export const updateUserBudget = async (amount) => {
  let resp = await axios.post('/api/total/', {
    amount: amount
  })
    .catch((e) => {
      console.log("Update user error: " + e)
    });
  return resp
}
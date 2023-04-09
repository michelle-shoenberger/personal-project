import axios from 'axios'
import Cookies from 'js-cookie';

export const createUser = async (username, pwd, email) => {
  let resp = await axios.post('http://127.0.0.1:8000/api/signup/', {
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
  let resp = await axios.post('http://127.0.0.1:8000/api/login/', {
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
    return False
  }
}

export const persistUser = async () => {
  const token = Cookies.get('token')
  if (token) {
    console.log('api call for whoami', token)
    axios.defaults.headers.common['Authorization'] = "Token " + token;
    const resp = await axios.post('http://127.0.0.1:8000/api/whoami/')
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
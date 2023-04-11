import axios from 'axios'

export const getProfile = async () => {
  const resp = await axios.get('http://127.0.0.1:8000/api/budget/')
    .catch((e) => {
      console.log("getProfile error: " + e)
  });
  if (resp) {
    let data = resp.data
    // data.sort((a,b) => {
    //   return a.name > b.name ? 1 : a.name<b.name ? -1 : 0
    // });
    return data
  } else {
    console.log("getProfile error")
    return null
  }
}

export const createBudget = async (data) => {
  let resp = await axios.post('http://127.0.0.1:8000/api/budget/', data)
  .catch((e) => {
    console.log("createBudget error: " + e)
  });
  return resp
}

export const updateBudget = async (data, id) => {
  // formdata
  let resp = await axios.put(`http://127.0.0.1:8000/api/budget/${id}/`, data)
      .catch((e) => {
        console.log("updateBudget error: " + e)
      });
  return resp
};
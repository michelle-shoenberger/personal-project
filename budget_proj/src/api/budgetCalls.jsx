import axios from 'axios'

export const getProfile = async () => {
  const resp = await axios.get('/api/budget/')
    .catch((e) => {
      console.log("getProfile error: " + e)
    });
  if (resp) {
    let data = resp.data
    let quotedata = await axios.get('/api/quote/')
      .catch((e) => {
        console.log("getProfile error: " + e)
      });
    return {'budgets': data, 'quotedata': quotedata.data}
  } else {
    console.log("getProfile error")
    return null
  }
}

export const createBudget = async (data) => {
  let resp = await axios.post('/api/budget/', data)
  .catch((e) => {
    console.log("createBudget error: " + e)
  });
  return resp
}

export const updateBudget = async (data, id) => {
  // formdata
  let resp = await axios.put(`/api/budget/${id}/`, data)
      .catch((e) => {
        console.log("updateBudget error: " + e)
      });
  return resp
};
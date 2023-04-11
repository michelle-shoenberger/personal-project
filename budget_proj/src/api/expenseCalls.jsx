import axios from 'axios'

export const getExpenses = async () => {
  try{
    const resp = await axios.get('/api/expenses/')
    .catch((e) => {
      console.log("getExpense error: " + e)
    });
    let data = resp.data
    data.sort((a,b) => {
      a = a.date.split('-').join('')
      b = b.date.split('-').join('')
      return a > b ? -1 : a<b ? 1 : 0
    });
    console.log('expenses', data)
    return data
  } catch {
    console.log('Error - unable to fetch expenses')
    return null
  }
};

export const createExpense = async (data) => {
  // formdata
  let resp = await axios.post('/api/expenses/', data)
      .catch((e) => {
        console.log("createExpense error: " + e)
      });
  return resp
};

export const updateExpense = async (data) => {
  // formdata
  let resp = await axios.put(`/api/expenses/${data.get('id')}/`, data)
      .catch((e) => {
        console.log("updateExpense error: " + e)
      });
  return resp
};

export const deleteExpense = async (id) => {
  // 
  let resp = await axios.delete(`/api/expenses/${id}/`)
      .catch((e) => {
        console.log("deleteExpense error: " + e)
      });
  console.log(resp)
  return resp
};
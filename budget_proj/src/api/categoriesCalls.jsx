import axios from 'axios'

export const getAllCategories = async () => {
  const resp = await axios.get('/api/category/')
    .catch((e) => {
      console.log("getCategories error: " + e)
  });
  console.log('catcall', resp)
  if (resp) {
    if (resp.data.length == 0) {
      return null
    }
    let data = resp.data
    data.sort((a,b) => {
      return a.name > b.name ? 1 : a.name<b.name ? -1 : 0
    });
    return data
  } else {
    console.log("getCategories error")
    return null
  }
};

export const createCategory = async (data) => {
  let resp = await axios.post('/api/category/', data)
  .catch((e) => {
    console.log("createCategory error: " + e)
  });
  return resp
};

export const updateCategory = async (data, id) => {
  // formdata
  let resp = await axios.put(`/api/category/${id}/`, data)
      .catch((e) => {
        console.log("updateCategory error: " + e)
      });
  return resp
};

export const deleteCategory = async (id) => {
  // 
  let resp = await axios.delete(`/api/category/${id}/`)
      .catch((e) => {
        console.log("deleteCategory error: " + e)
      });
  console.log(resp)
  return resp
};
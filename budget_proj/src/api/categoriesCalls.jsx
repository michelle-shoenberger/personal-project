import axios from 'axios'

export const getAllCategories = async () => {
  const resp = await axios.get('http://127.0.0.1:8000/api/category/')
    .catch((e) => {
      console.log("getCategories error: " + e)
  });
  console.log('catcall', resp)
  if (resp) {
    let data = resp.data
    data.sort((a,b) => {
      return a.name > b.name ? 1 : a.name<b.name ? -1 : 0
    });
    return data
  } else {
    console.log("getCategories error")
    return null
  }
}
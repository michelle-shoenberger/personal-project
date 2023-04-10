import axios from 'axios'

export const getProfile = async () => {
  const resp = await axios.get('http://127.0.0.1:8000/api/budget/')
    .catch((e) => {
      console.log("getProfile error: " + e)
  });
  console.log('budget', resp)
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
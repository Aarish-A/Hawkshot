import axios from 'axios'

const baseUrl = '/api/hints'
// const baseUrl = 'http://localhost:5000/api/hints'

let token = null;

const updateToken = async firebase => {
  const currentUser = firebase.auth.currentUser;
  if (currentUser) {
    token = await currentUser.getIdToken();
    console.log('User is authenticated')
    console.log(token);
    return token;
  } else {
    console.error("User could not be authenticated");
  }
}

const get = args => {
   const request = axios.get(baseUrl, {params: args})
   return request.then(response => response.data.hints)
}

const add = async newHint => {
  const response = axios.post(baseUrl, newHint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
      }}
    ).then(response => {
      console.log("success: ", response.data);
      return {
        successful: true,
        response: response.data
      }
    }).catch(error => {
      console.error("error: ", error);
      return {
        successful: false,
        response: error
      }
    });
}

const update = (hintId, vote) => {
   const newUrl = baseUrl + '/' +  hintId;
   //vote is either 'funny', 'notfunny', 'helpful', 'nothelpful'
   const response = axios.put(newUrl,
     {
       params: {type: vote},
       headers:{Authorization: "Bearer " + token}
     }
   ).then(response => {
     console.log("update hint", response.data);
   }).catch(error =>{
     console.error(error);
   });
}

export default {
   get,
   add,
   update,
   updateToken,
}

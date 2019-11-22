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

const getVotes = async (userId) => {
  const request = axios.get('/api/votes', {params: {ownerId: userId}})
  return request.then(response => response.data)
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

const update = async (hintId, vote) => {
   const newUrl = baseUrl + '/' +  hintId;
   //vote is either 'funny', 'notfunny', 'helpful', 'nothelpful'
  console.log("hintId ", vote);
   const response = axios.put(newUrl,
     {
       params: {type: vote},
       headers: {
         'Content-Type': 'application/json',
         Authorization: "Bearer " + token
       }
     }
   ).then(response => {
     console.log("update hint", response.data);
     return {
       successful: true,
       response: response.data
     }
   }).catch(error =>{
      console.error(error);
      return {
        successful: false,
        response: error
      }
   });
}

const report = async hintId => {
  const newUrl = '/api/report/' + hintId;
  const response = axios.post(newUrl, {
      headers: {Authorization: "Bearer " + token}
    }
  ).then(response => {
    console.log("Reported Hint", response.data);
    return {
      successful: true,
      response: response.data
    }
  }).catch(error =>{
      console.error(error);
      return {
        successful: false,
        response: error
      }
  });
}

export default {
   get,
   getVotes,
   add,
   update,
   report,
   updateToken,
}

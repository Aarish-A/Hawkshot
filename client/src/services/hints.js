import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/hints'

// const firebaseToken = async () => {
//   currentUser = firebase.auth().currentUser;
//   if(currentUser){
//     const idToken = await currentUser.getIdToken();
//     return idToken
//   }
// }

const get = args => {
   const request = axios.get(baseUrl, {params: args})
   return request.then(response => response.data.hints)
}

const add = async newHint => {
   //somehow get Firebase
   const response = await axios.post(baseUrl, newHint)
   // return response.data
}

const update = (hintId, newHint) => {

}

export default {
   get,
   add,
   update
}

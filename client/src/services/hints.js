import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/hints'

const get = args => {
   const request = axios.get(baseUrl)
   return request.then(response => response.data)
}

const add = newHint => {

}

const update = (hintId, newHint) => {

}

export default {
   get,
   add,
   update
}


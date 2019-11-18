import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/hints'

const get = args => {
   const request = axios.get(baseUrl, {params: {...args}})
   return request.then(response => response.data)
}

const add = async newHint => {
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


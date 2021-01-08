import axios from 'axios'

const isntance = axios.create({
  baseURL: 'http://localhost:5000',
})

export default isntance

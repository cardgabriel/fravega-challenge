import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const TIMEOUT = 10000

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

import axios from 'axios'

const TIMEOUT = 10000

export const axiosClient = axios.create({
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

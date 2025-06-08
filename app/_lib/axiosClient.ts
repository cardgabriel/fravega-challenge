import axios from 'axios'

export const axiosClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  if (config.url?.includes('api.github.com') && process.env.GITHUB_TOKEN) {
    config.headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return config
})

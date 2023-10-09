import axios from 'axios'

export const getFiles = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
import axios from 'axios'

export const getMcq = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const editMcq = (url, data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)
export const mcqEnable = (url, data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)
export const createMcq = (url, data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)
export const delMcq = (url, data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)

export const getMcqQuestions = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const appendQuestion = (url, data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)
export const delQuestion = (url, data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)

export const getResults = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
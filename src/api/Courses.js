import axios from 'axios'

export const getCourses = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getSubjects = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getChapters = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getTopics = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getTopic = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)


export const editCourse = (url, {
    courseId, courseTitle, published, thumbnail
}) => axios.post(url, {
    courseId, courseTitle, published, thumbnail
}, { withCredentials: true }).then(res => res.data)

export const editSubject = (url, {
    courseId,
    subjectId,
    subjectTitle,
    published,
    thumbnail
}) =>
    axios.post(url, {
        courseId,
        subjectId,
        subjectTitle,
        published,
        thumbnail
    }, { withCredentials: true }).then(res => res.data)

export const editChapter = (url, {
    chapterId,
    chapterTitle,
    published,
    order
}) => axios.post(url, {
    chapterId,
    chapterTitle,
    published,
    sn: order
}, { withCredentials: true }).then(res => res.data)

export const editTopic = (url, {
    courseId,
    subjectId,
    chapterId,
    topicId,
    topicTitle,
    topicContent,
    topicEditor,
    published
}) => axios.post(url, {
    courseId,
    subjectId,
    chapterId,
    topicId,
    topicTitle,
    topicContent,
    topicEditor,
    published
}, { withCredentials: true }).then(res => res.data)

export const deleteSomething = (url, data) => axios.post(url, { ...data }, { withCredentials: true }).then(res => res.data)

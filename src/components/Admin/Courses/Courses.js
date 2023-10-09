import React, { useState, useEffect } from "react";
import CourseList from "./CourseList";
import { getCourses } from '../../../api/Courses'
import useSWR from "swr";

function Courses() {
  const [courses, setCourses] = useState([])
  const { data: courseData } = useSWR(process.env.REACT_APP_BACKEND + "/courses/list", async url => await getCourses(url))
  useEffect(() => {
    setCourses(courseData?.data)
  }, [courseData])

  return <CourseList courses={courses} />
}

export default Courses;
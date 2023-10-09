import React, { useState, useEffect } from "react";
import ChapterList from "./ChapterList";
import { useParams } from "react-router-dom";
import { getChapters } from '../../../api/Courses'
import useSWR from "swr";

function Chapters() {
  const [chapters, setChapters] = useState([])
  const params = useParams()
  const { data: chapterData } = useSWR(process.env.REACT_APP_BACKEND + `/chapters/${params.courseId}/${params.subjectId}/list`, async url => await getChapters(url))

  useEffect(() => {
    setChapters(chapterData?.data?.chapters)
  }, [chapterData])

  return (
    <ChapterList courseId={params?.courseId} chapters={chapters} subjectTitle={chapterData?.data?.subject?.title} />
  )
}

export default Chapters;

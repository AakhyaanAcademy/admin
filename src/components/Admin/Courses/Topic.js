import React from "react";
import TextEditor from "../Editor/TextEditor"
import { getTopic } from '../../../api/Courses'
import useSWR, { mutate } from "swr";
import { useParams } from "react-router-dom";

function Topic() {
  const params = useParams()
  const { data: topicData } = useSWR(process.env.REACT_APP_BACKEND + `/topic/${params.courseId}/${params.subjectId}/${params.chapterId}/${params.topicId}`, async url => await getTopic(url))
  return (
    <div className="col-span-4 flex flex-col w-full px-2 mt-2">
      <TextEditor topic={topicData} />
    </div>
  )
}

export default Topic;
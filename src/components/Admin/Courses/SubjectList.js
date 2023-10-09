import React, { useState, useRef, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { getSubjects } from '../../../api/Courses'
import { BiEdit } from "react-icons/bi";
import DeleteButton from "./DeleteButton";
import { useNavigate } from "react-router-dom";
import { IoPlayForwardSharp } from "react-icons/io5";
import { editSubject } from '../../../api/Courses'
import { useAdminData } from "../../../context/AdminProvider";

function SubjectList({ setCourseErrorMessage, setCourseIsShowing, courseId: _id }) {
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([])
  const { errorMessage, setErrorMessage, isShowing, setIsShowing } = useAdminData()
  let subjectRef = useRef([]);
  let subjectThumbnailRef = useRef([]);
  const { data: subjectData } = useSWR(process.env.REACT_APP_BACKEND + `/subjects/${_id}/list`, async url => await getSubjects(url))

  const postEditSubject = async (courseId, subjectId, subjectTitle, published, thumbnail) => {
    const subjectEdit = await editSubject(process.env.REACT_APP_BACKEND + "/subject/edit", {
      courseId,
      subjectId,
      subjectTitle,
      published,
      thumbnail
    });
    setErrorMessage(subjectEdit?.message)
    setIsShowing(true)
    setTimeout(() => {
      setIsShowing(false)
      setErrorMessage("")
    }, 4000);
    mutate(process.env.REACT_APP_BACKEND + `/subjects/${courseId}/list`)
  };

  useEffect(() => {
    setSubjects(subjectData?.data?.subjects)
  }, [subjectData])

  return <div className="w-full flex gap-5 flex-col z-10 px-5">
    {subjects?.map((subjectObj, i) => {
      return (
        <div key={subjectObj._id} className="w-full">
          <div className="shadow-md border-b-2 md:border-2 border-red-200 rounded-[0.5em] text-center py-2 flex flex-col items-center">
            <div className="flex gap-2 mb-5">
              <div
                ref={(element) =>
                  subjectRef.current.push(element)
                }
                className="text-xl font-bold text-red-800 font-mono"
                onInput={(e) => {
                  console.log(
                    e.currentTarget.textContent
                  );
                }}
                onBlur={(e) => {
                  postEditSubject(
                    _id,
                    subjectObj._id,
                    e.currentTarget.textContent,
                    subjectObj.published,
                    subjectObj.thumbnail
                  );
                  subjectRef.current[i].contentEditable = false;
                }}>
                {subjectObj.title}
              </div>
              <BiEdit
                size={18}
                color="red"
                className="hover:translate-y-0.5 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  subjectRef.current[i].contentEditable = true;
                  subjectRef.current[i].focus();
                }}
              />
            </div>

            <div className="w-full flex flex-col mb-10">
              <span
                ref={(element) =>
                  subjectThumbnailRef.current.push(element)
                }
                className="text-blue-600 break-words font-sans font-light p-1"
                onBlur={(e) => {
                  postEditSubject(_id, subjectObj._id, subjectObj.title, subjectObj.published, e.currentTarget.textContent);
                  subjectThumbnailRef.current[i].contentEditable = false;
                }}>
                {subjectObj.thumbnail}
              </span>
              <span className="mx-auto">
                <BiEdit
                  size={24}
                  color="red"
                  className="hover:translate-y-0.5 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    subjectThumbnailRef.current[i].contentEditable = true;
                    subjectThumbnailRef.current[i].focus();
                  }}
                />
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center md:gap-4">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/courses/${_id}/${subjectObj._id}`)
                }}>
                <span className="text-blue-600 border-b border-blue-500">
                  See all chapters
                </span>
                <IoPlayForwardSharp
                  color="blue"
                  className="hover:translate-y-0.5 justify-self-end"
                />
              </div>
              <div className="w-full flex justify-center py-3">
                {!subjectObj.published ? (
                  <div className="flex justify-end">
                    <button onClick={() => {
                      postEditSubject(_id, subjectObj._id, subjectObj.title, true);
                    }} className="flex items-center gap-2 font-sans text-md md:text-lg hover:translate-y-0.5 transition-all bg-slate-500 hover:bg-red-700 text-white py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline">Publish</button>
                  </div>
                ) :
                  <div className="flex justify-end">
                    <button onClick={() => {
                      postEditSubject(_id, subjectObj._id, subjectObj.title, false);
                    }} className="flex items-center gap-2 font-sans text-md md:text-lg hover:translate-y-0.5 transition-all bg-slate-500 hover:bg-red-700 text-white py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline">Unpublish</button>
                  </div>
                }
              </div>
              <div className="relative py-2 flex w-full justify-around">
                <DeleteButton
                  text="Delete Subject"
                  element="subject"
                  data={{ courseId: _id, subjectId: subjectObj._id }}
                  setErrorMessage={setCourseErrorMessage}
                  setIsShowing={setCourseIsShowing}
                />
              </div>
            </div>
          </div>
        </div>
      )
    })}
  </div>
}

export default SubjectList;
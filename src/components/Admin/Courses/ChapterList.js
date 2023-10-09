import React, { useState, useRef, useEffect } from "react";
import { useAdminData } from "../../../context/AdminProvider";
import CreateButton from "./CreateButton";
import { CreateChapter, CreateTopic } from "./CreateForm";
import DeleteButton from "./DeleteButton";
import { BiEdit } from "react-icons/bi";
import TopicList from './TopicList'
import { useParams } from "react-router-dom";
import { mutate } from 'swr'
import { editChapter } from '../../../api/Courses'
import { IoIosArrowDropdown } from 'react-icons/io'

function ChapterList({ courseId, chapters, subjectTitle }) {
  const { createForm } = useAdminData();
  const params = useParams()
  const [chaptersList, setChaptersList] = useState([])
  const { errorMessage, setErrorMessage, isShowing, setIsShowing } = useAdminData()
  const [expanded, setExpanded] = useState([])
  let chapterRef = useRef([]);
  let chapterOrderRef = useRef([]);
  useEffect(() => {
    setChaptersList(chapters)
  }, [chapters])

  const postEditChapter = async (
    subjectId,
    chapterId,
    chapterTitle,
    published,
    order
  ) => {
    const chapterEdit = await editChapter(process.env.REACT_APP_BACKEND + "/chapter/edit", {
      chapterId,
      chapterTitle,
      published,
      order
    });
    setErrorMessage(chapterEdit?.message)
    setIsShowing(true)
    setTimeout(() => {
      setIsShowing(false)
      setErrorMessage("")
    }, 4000);
    mutate(process.env.REACT_APP_BACKEND + `/chapters/${courseId}/${subjectId}/list`)
  };

  return (
    <div className="col-span-4 flex flex-col h-full">
      <div className="text-3xl text-center font-bold border-b-2 border-green-200 pt-6 pb-2 px-6">
        chaptersList
      </div>
      <div
        className={`h-fit relative p-10 pb-2 flex-1 my-6 mx-6 border-2 border-gray-200 rounded-xl`}>
        <div className="text-center text-3xl">{subjectTitle}</div>

        {/* Showing all chaptersList */}
        <div className="relative flex flex-col justify-between m-4 ">
          {chaptersList?.map((chapterObj, i) => {
            return (
              <div
                key={chapterObj._id}
                className="hover:cursor-pointer relative shadow-blue-200 hover:shadow-md border-2 rounded-[1em] p-3 my-2">
                <div className="text-center p-2 mt-2 flex justify-center">
                  <BiEdit
                    size={18}
                    color="red"
                    className="hover:translate-y-0.5 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      chapterOrderRef.current[i].contentEditable = true;
                      chapterOrderRef.current[i].focus();
                    }}
                  />
                  <span
                    ref={(element) =>
                      chapterOrderRef.current.push(element)
                    }
                    className="text-blue-600 font-mono text-[1.6rem] font-bold border-b-2 py-1"
                    onBlur={(e) => {
                      postEditChapter(
                        params.subjectId,
                        chapterObj._id,
                        chapterObj.title,
                        chapterObj.published,
                        e.currentTarget.textContent,
                      );
                      chapterOrderRef.current[i].contentEditable = false;
                    }}>
                    {chapterObj?.sn}
                  </span>
                  <span className="text-blue-600 font-mono text-[1.6rem] font-bold border-b-2 py-1 pr-2">.</span>
                  <span
                    ref={(element) =>
                      chapterRef.current.push(element)
                    }
                    className="text-blue-600 font-mono text-[1.6rem] font-bold border-b-2 p-1"
                    onBlur={(e) => {
                      postEditChapter(
                        params.subjectId,
                        chapterObj._id,
                        e.currentTarget.textContent,
                        chapterObj.published,
                        chapterObj.order
                      );
                      chapterRef.current[i].contentEditable = false;
                    }}>
                    {chapterObj.title}
                  </span>
                  <BiEdit
                    size={18}
                    color="red"
                    className="hover:translate-y-0.5 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      chapterRef.current[i].contentEditable = true;
                      chapterRef.current[i].focus();
                    }}
                  />
                  <div onClick={() => {
                    let temp = expanded
                    if (temp[i]) {
                      temp[i] = false;
                      setExpanded([...temp])
                    } else {
                      temp[i] = true;
                      setExpanded([...temp])
                    }
                  }} className={`${expanded[i] ? "rotate-180" : ""} hover:cursor-pointer absolute right-10`}>
                    <IoIosArrowDropdown color="blue" size={35} />
                  </div>
                </div>

                {createForm.topic.chapterId === chapterObj._id ? (
                  <div className="mb-24">
                    <CreateTopic
                      courseId={params.courseId}
                      subjectId={params.subjectId}
                      chapterId={chapterObj._id}
                      setIsShowing={setIsShowing}
                      setErrorMessage={setErrorMessage}
                    />
                  </div>
                ) : null}

                {/* showing list of topics */}
                {expanded[i] ?
                  <div className="animate-dropdownOpen">
                    <TopicList setSubjectErrorMessage={setErrorMessage} setSubjectIsShowing={setIsShowing} chapterId={chapterObj._id} />
                  </div>
                  :
                  <></>
                }

                <div className="mt-8 flex gap-3 md:flex-row flex-col md:justify-between">
                  <DeleteButton
                    text="Delete Chapter"
                    element="chapter"
                    data={{ courseId: params.courseId, subjectId: params.subjectId, chapterId: chapterObj._id }}
                    setErrorMessage={setErrorMessage}
                    setIsShowing={setIsShowing}
                  />
                  {!chapterObj.published ? (
                    <div className="flex justify-end">
                      <button onClick={() => {
                        postEditChapter(params.subjectId, chapterObj._id, chapterObj.title, true);
                      }} className="flex items-center gap-2 font-sans text-md md:text-lg hover:translate-y-0.5 transition-all bg-slate-500 hover:bg-red-700 text-white py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline">Publish</button>
                    </div>
                  ) :
                    <div className="flex justify-end">
                      <button onClick={() => {
                        postEditChapter(params.subjectId, chapterObj._id, chapterObj.title, false);
                      }} className="flex items-center gap-2 font-sans text-md md:text-lg hover:translate-y-0.5 transition-all bg-slate-500 hover:bg-red-700 text-white py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline">Unpublish</button>
                    </div>
                  }
                  <CreateButton
                    text="Add Topic"
                    element="topic"
                    setExpanded={setExpanded}
                    expanded={expanded}
                    expandIndex={i}
                    data={{ chapterId: chapterObj._id }}
                  />
                </div>
              </div>
            );
          })}

        </div>
        <div className="relative m-3">
          <CreateButton text="Create Chapter" element="chapter" />
          <CreateChapter courseId={courseId} subjectId={params.subjectId} setIsShowing={setIsShowing} setErrorMessage={setErrorMessage} />
        </div>
        <div className={`${isShowing ? "animate-fade" : ""} fixed bottom-10 right-10 text-warningText border-2 bg-slate-300 rounded-md px-2`}>
          {errorMessage}
        </div>
      </div>
    </div>
  );
}

export default ChapterList;

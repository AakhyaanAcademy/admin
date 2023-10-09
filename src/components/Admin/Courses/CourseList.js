import React, { useRef, useState } from "react";
import { useAdminData } from "../../../context/AdminProvider";
import CreateButton from "./CreateButton";
import DeleteButton from "./DeleteButton";
import { CreateCourse, CreateSubject } from "./CreateForm";
import { BiEdit } from "react-icons/bi";
import { mutate } from "swr";
import SubjectList from "./SubjectList";
import { editCourse } from '../../../api/Courses'
import { IoIosArrowDropdown } from 'react-icons/io'

function CourseList({ courses }) {
  const { createForm } = useAdminData();
  const [expanded, setExpanded] = useState([])
  const { errorMessage, setErrorMessage, isShowing, setIsShowing } = useAdminData()
  let courseRef = useRef([]);
  let courseThumbnailRef = useRef([]);

  const postEditCourse = async (courseId, courseTitle, published, thumbnail) => {
    const courseEdit = await editCourse(process.env.REACT_APP_BACKEND + "/course/edit", {
      courseId,
      courseTitle,
      published,
      thumbnail
    });
    setErrorMessage(courseEdit?.message)
    setIsShowing(true)
    setTimeout(() => {
      setIsShowing(false)
      setErrorMessage("")
    }, 4000);
    mutate(process.env.REACT_APP_BACKEND + "/courses/list")
  };

  return (
    <div className="col-span-4 flex flex-col h-[70vh] md:h-full w-full">
      <div className="text-3xl text-center font-bold border-b-2 border-green-200 pt-6 pb-2 px-6">
        Courses
      </div>
      <div
        className={`h-fit relative p-10 pb-2 flex-1 my-6 mx-6 border-2 border-gray-200 rounded-xl`}>
        {/* Showing all courses */}
        <div className="relative flex flex-col justify-between m-4 ">
          {/* mapping all courses */}
          {courses?.map((course, indx) => {
            return (
              <div
                key={indx}
                className="relative shadow-blue-200 hover:shadow-md border-2 rounded-[1em] p-3 my-2">
                <div className="text-center p-2 mt-2 flex justify-center">
                  <span
                    ref={(element) =>
                      courseRef.current.push(element)
                    }
                    className="text-blue-600 break-words font-mono text-[1.6rem] font-bold border-b-2 p-1"
                    onBlur={(e) => {
                      postEditCourse(course._id, e.currentTarget.textContent, course.published, course.thumbnail);
                      courseRef.current[indx].contentEditable = false;
                    }}>
                    {course.title}
                  </span>
                  <BiEdit
                    size={24}
                    color="red"
                    className="hover:translate-y-0.5 justify-self-end cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      courseRef.current[indx].contentEditable = true;
                      courseRef.current[indx].focus();
                    }}
                  />

                  <div onClick={() => {
                    let temp = expanded
                    if (temp[indx]) {
                      temp[indx] = false;
                      setExpanded([...temp])
                    } else {
                      temp[indx] = true;
                      setExpanded([...temp])
                    }
                  }} className={`${expanded[indx] ? "rotate-180" : ""} hover:cursor-pointer ml-2 md:ml-0 md:absolute right-10`}>
                    <IoIosArrowDropdown color="blue" size={35} />
                  </div>
                </div>

                <div className="w-full flex flex-col mb-10">
                  <span
                    ref={(element) =>
                      courseThumbnailRef.current.push(element)
                    }
                    className="text-blue-600 break-words font-sans font-light p-1"
                    onBlur={(e) => {
                      postEditCourse(course._id, course.title, course.published, e.currentTarget.textContent);
                      courseThumbnailRef.current[indx].contentEditable = false;
                    }}>
                    {course.thumbnail}
                  </span>
                  <span className="mb-10">
                    <BiEdit
                      size={24}
                      color="red"
                      className="hover:translate-y-0.5 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        courseThumbnailRef.current[indx].contentEditable = true;
                        courseThumbnailRef.current[indx].focus();
                      }}
                    />
                  </span>
                </div>

                {createForm.subject.courseId === course._id ? (
                  <div className="mb-16">
                    <CreateSubject courseId={course._id} setIsShowing={setIsShowing} setErrorMessage={setErrorMessage} />
                  </div>
                ) : null}

                {/* showing list of subjects */}
                {expanded[indx] ?
                  <div className="animate-dropdownOpen">
                    <SubjectList setCourseErrorMessage={setErrorMessage} setCourseIsShowing={setIsShowing} courseId={course._id} />
                  </div>
                  :
                  <></>
                }


                <div className="mt-8 flex gap-3 md:flex-row flex-col md:justify-between">
                  <DeleteButton
                    text="Delete Course"
                    element="course"
                    data={{ courseId: course._id }}
                    setErrorMessage={setErrorMessage}
                    setIsShowing={setIsShowing}
                  />
                  {!course.published ? (
                    <div className="flex justify-end">
                      <button onClick={() => {
                        postEditCourse(course._id, course.title, true, course.thumbnail);
                      }} className="font-sans text-base md:text-lg hover:translate-y-0.5 transition-all bg-red-300 hover:bg-red-700 text-blue-900 py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline">Publish</button>
                    </div>
                  ) :
                    <div className="flex justify-end">
                      <button onClick={() => {
                        postEditCourse(course._id, course.title, false, course.thumbnail);
                      }} className="font-sans text-base md:text-lg hover:translate-y-0.5 transition-all bg-red-300 hover:bg-red-700 text-blue-900 py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline">Unpublish</button>
                    </div>
                  }
                  <CreateButton
                    text="Add Subject"
                    element="subject"
                    setExpanded={setExpanded}
                    expanded={expanded}
                    expandIndex={indx}
                    data={{ courseId: course._id }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative m-4">
          <CreateButton text="Create Course" element="course" />
          <CreateCourse setIsShowing={setIsShowing} setErrorMessage={setErrorMessage} />
        </div>
        <div className={`${isShowing ? "animate-fade" : ""} fixed bottom-10 right-10 text-warningText border-2 bg-slate-300 rounded-md px-2`}>
          {errorMessage}
        </div>
      </div>
    </div>
  );
}

export default CourseList;

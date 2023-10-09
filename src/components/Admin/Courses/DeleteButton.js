import axios from "axios";
import React from "react";
import { mutate } from "swr";
import { deleteSomething } from '../../../api/Courses'

function DeleteButton({ text, element, data, setErrorMessage, setIsShowing }) {
  const apiUrl = process.env.REACT_APP_BACKEND + `/${element}/delete`;
  const onClickHandler = (e) => {
    e.preventDefault();

    const deleteCourse = async () => {
      let promptOutput = prompt(`Are you sure to delete the ${element}? Please type Confirm to delete.`, "")
      if (promptOutput === "Confirm") {
        const deleteData = await deleteSomething(apiUrl, data)
        if (element === "course") mutate(process.env.REACT_APP_BACKEND + `/courses/list`)
        else if (element === "subject") mutate(process.env.REACT_APP_BACKEND + `/subjects/${data.courseId}/list`)
        else if (element === "chapter") mutate(process.env.REACT_APP_BACKEND + `/chapters/${data.courseId}/${data.subjectId}/list`)
        else if (element === "topic") mutate(process.env.REACT_APP_BACKEND + `/topics/${data.chapterId}/list`)
        setErrorMessage(deleteData?.data?.message)
        setIsShowing(true)
        setTimeout(() => {
          setIsShowing(false)
          setErrorMessage("")
        }, 4000);
      } else {
        setErrorMessage("You weren't sure of deleting.")
        setIsShowing(true)
        setTimeout(() => {
          setIsShowing(false)
          setErrorMessage("")
        }, 4000);
      }
    };

    deleteCourse().catch((err) => console.log(err));
  };
  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={onClickHandler}
          className="font-sans text-base md:text-lg hover:translate-y-0.5 transition-all bg-red-300 hover:bg-red-700 text-blue-900 py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline"
          type="submit">
          {text}
        </button>
      </div>
    </>
  );
}

export default DeleteButton;

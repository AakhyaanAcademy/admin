import React from "react";
import { useAdminData } from "../../../context/AdminProvider";

function CreateButton({ text, element, data, setExpanded = null, expanded = null, expandIndex = null }) {
  const { createForm, setCreateForm } = useAdminData();
  const onClickHandler = (e) => {
    e.preventDefault();

    setCreateForm((prev) => {
      return element === "course" ? { ...prev, course: !prev.course }
        :
        element === "subject" ? {
          ...prev,
          subject: {
            status: !prev.subject.status,
            courseId: data.courseId,
          },
        }
          :
          element === "chapter" ? { ...prev, chapter: !prev.chapter }
            :
            element === "topic"
              ? {
                ...prev,
                topic: { status: !prev.topic.status, chapterId: data.chapterId },
              }
              : null;
    });
    if (expanded !== null) {
      let temp = expanded
      if (temp[expandIndex]) {
        temp[expandIndex] = false;
        setExpanded([...temp])
      }
    }
  };
  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={onClickHandler}
          className="font-sans text-base md:text-lg hover:translate-y-0.5 transition-all bg-green-400 hover:bg-red-500 text-blue-900 py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline"
          type="submit">
          {text}
        </button>
      </div>
    </>
  );
}

export default CreateButton;

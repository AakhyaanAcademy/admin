import React from "react";
import { useAdminData } from "../../../context/AdminProvider";

function EditButton({ text, element, data }) {
  const { editForm, setEditForm } = useAdminData();
  const onClickHandler = (e) => {
    e.preventDefault();

    setEditForm((prev) => {
      return element === "course"
        ? {
            ...prev,
            course: { stutus: !prev.course.status, courseId: data.courseId },
          }
        : element === "subject"
        ? {
            ...prev,
            subject: {
              status: !prev.subject.status,
              subjectId: data.subjectId,
            },
          }
        : element === "chapter"
        ? {
            ...prev,
            topic: { status: !prev.chapter.status, chapterId: data.chapterId },
          }
        : element === "topic"
        ? {
            ...prev,
            topic: { status: !prev.topic.status, topicId: data.topicId },
          }
        : null;
    });

    console.log("Edit Form = ", editForm);
  };
  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={onClickHandler}
          className="flex items-center gap-2 font-sans text-md md:text-lg hover:translate-y-0.5 transition-all bg-purple-500 hover:bg-purple-700 text-white py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline"
          type="submit">
          {text}
        </button>
      </div>
    </>
  );
}

export default EditButton;

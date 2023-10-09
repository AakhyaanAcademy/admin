import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAdminData } from "../../../context/AdminProvider";

export const EditCourse = ({ courseId }) => {
  const [newCourse, setNewCourse] = useState({ title: "" });
  const { editForm, setEditForm } = useAdminData();

  useEffect(() => {
    console.log("edit form for ", courseId);
  }, []);

  const editCourse = (e) => {
    e.preventDefault();
    const postNewCourse = async () => {
      const submitCourse = await axios.post(
        process.env.REACT_APP_BACKEND + "/course/edit",
        { ...newCourse, courseId }
      );
      mutate(process.env.REACT_APP_BACKEND + "/courses/list")
    };

    postNewCourse().catch((err) => console.log(err));

    setEditForm((prev) => {
      return { ...prev, course: { status: !prev.course.status, courseId } };
    });
  };
  return (
    <div
      className={`${!editForm.course.status ? "hidden" : "flex"} w-full z-10`}>
      <form
        className="rounded-md w-full transition-all mt-10 flex flex-col border-2 shadow-md p-5 mb-10"
        onSubmit={editCourse}>
        <div className="mb-2">
          <input
            className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            type="text"
            placeholder="Enter New Course"
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
            required
          />
          <div
            onClick={(e) => {
              e.preventDefault();
              setEditForm((prev) => {
                return { ...prev, course: { status: false, courseId: "" } };
              });
            }}
            className="float-left flex items-center gap-2 font-sans text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Close
          </div>
          <button
            className="float-right flex items-center gap-2 font-sans text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
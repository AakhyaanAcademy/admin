import axios from "axios";
import React, { useState } from "react";
import { mutate } from "swr";
import { useAdminData } from "../../../context/AdminProvider";

export const CreateCourse = ({ setIsShowing, setErrorMessage }) => {
  const [course, setCourse] = useState({ title: "", tag: [], thumbnail: "" });
  const { createForm, setCreateForm } =
    useAdminData();

  const createCourse = (e) => {
    e.preventDefault();
    const postCourse = async () => {
      const posted = await axios.post(
        process.env.REACT_APP_BACKEND + "/course/create",
        course,
        { withCredentials: true }
      );
      setErrorMessage(posted?.data?.message)
      setIsShowing(true)
      setTimeout(() => {
        setIsShowing(false)
        setErrorMessage("")
      }, 4000);
      mutate(process.env.REACT_APP_BACKEND + "/courses/list")
    };

    postCourse().catch((err) => console.log(err));

    setCreateForm((prev) => {
      return { ...prev, course: !prev.course };
    });
  };
  return (
    <div className={`${!createForm.course ? "hidden" : "flex"} w-full`}>
      <form
        className="rounded-md w-full transition-all mt-10 flex flex-col border-2 shadow-md p-5 mb-10 z-20"
        onSubmit={createCourse}>
        <div className="mb-2">
          <input
            className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            type="text"
            placeholder="Course"
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            required
          />
          <input
            className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            type="text"
            placeholder="Thumbnail"
            onChange={(e) => setCourse({ ...course, thumbnail: e.target.value })}
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setCreateForm((prev) => {
                return { ...prev, course: false };
              });
            }}
            className="float-left flex items-center gap-2 font-sans text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Close
          </button>
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

export const CreateSubject = ({ courseId, setIsShowing, setErrorMessage }) => {
  const [subject, setSubject] = useState({ title: "", tag: [], thumbnail: "" });
  const { createForm, setCreateForm } = useAdminData();

  const createSubject = (e) => {
    e.preventDefault();

    if (subject.title === "") return;

    const postSubject = async () => {
      const posted = await axios.post(
        process.env.REACT_APP_BACKEND + "/subject/create",
        { ...subject, courseId },
        { withCredentials: true }
      );
      setErrorMessage(posted?.data?.message)
      setIsShowing(true)
      setTimeout(() => {
        setIsShowing(false)
        setErrorMessage("")
      }, 4000);
      mutate(process.env.REACT_APP_BACKEND + `/subjects/${courseId}/list`)
    };

    postSubject().catch((err) => console.log(err));
    setCreateForm((prev) => {
      return { ...prev, subject: !prev.subject };
    });
  };
  return (
    <div
      className={`${!createForm.subject ? "hidden" : "flex"
        } w-full h-full absolute top-0 right-0 bg-blue-50 rounded-[1em] z-20`}>
      <form
        className="w-full transition-all mt-10 flex flex-col p-5 mb-10"
        onSubmit={createSubject}>
        <div className="mb-6">
          <input
            className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            type="text"
            placeholder="Subject"
            onChange={(e) => setSubject({ ...subject, title: e.target.value })}
            required
          />
          <input
            className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            type="text"
            placeholder="Thumbnail"
            onChange={(e) => setSubject({ ...subject, thumbnail: e.target.value })}
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setCreateForm((prev) => {
                return { ...prev, subject: false };
              });
            }}
            className="float-left flex items-center gap-2 font-sans text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Close
          </button>
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

export const CreateChapter = ({ courseId, subjectId, setIsShowing, setErrorMessage }) => {
  const [chapter, setChapter] = useState({ title: "", tag: [], order: 0 });
  const { createForm, setCreateForm } = useAdminData();

  const createChapter = (e) => {
    e.preventDefault();

    const postChapter = async () => {
      const posted = await axios.post(
        process.env.REACT_APP_BACKEND + "/chapter/create",
        { ...chapter, courseId, subjectId },
        { withCredentials: true }
      );
      setErrorMessage(posted?.data?.message)
      setIsShowing(true)
      setTimeout(() => {
        setIsShowing(false)
        setErrorMessage("")
      }, 4000);
      mutate(process.env.REACT_APP_BACKEND + `/chapters/${courseId}/${subjectId}/list`)
    };

    postChapter().catch((err) => console.log(err));

    setCreateForm((prev) => {
      return { ...prev, chapter: !prev.chapter };
    });
  };
  return (
    <div
      className={`${!createForm.chapter ? "hidden" : "flex"
        } w-full absolute top-4 left-0 z-20`}>
      <form
        className="w-full transition-all mt-10 flex flex-col border-2 shadow-md bg-pink-50 p-5 mb-10"
        onSubmit={createChapter}>
        <div className="mb-6">
          <input
            className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            type="text"
            placeholder="Chapter Name"
            onChange={(e) => setChapter({ ...chapter, title: e.target.value })}
            required
          />
          <input
            className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            type="text"
            placeholder="Chapter Order"
            onChange={(e) => setChapter({ ...chapter, sn: e.target.value })}
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setCreateForm((prev) => {
                return { ...prev, chapter: false };
              });
            }}
            className="float-left flex items-center gap-2 font-sans text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Close
          </button>
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

export const CreateTopic = ({ chapterId, setIsShowing, setErrorMessage }) => {
  const [topic, setTopic] = useState({ title: "", content: "", sn: 0 });
  const { createForm, setCreateForm } = useAdminData();

  const createTopic = (e) => {
    e.preventDefault();

    const postTopic = async () => {
      const posted = await axios.post(
        process.env.REACT_APP_BACKEND + "/topic/create",
        { ...topic, chapterId },
        { withCredentials: true }
      );
      setErrorMessage(posted?.data?.message)
      setIsShowing(true)
      setTimeout(() => {
        setIsShowing(false)
        setErrorMessage("")
      }, 4000);
      mutate(process.env.REACT_APP_BACKEND + `/topics/${chapterId}/list`)
    };

    postTopic().catch((err) => console.log(err));

    setCreateForm((prev) => {
      return { ...prev, topic: !prev.topic };
    });
  };
  return (
    <div
      className={`${!createForm.topic ? "hidden" : "flex"
        } w-full h-full absolute top-0 right-0 bg-blue-50 rounded-[1em] z-20`}>
      <form
        className="w-full transition-all mt-10 flex flex-col p-5 mb-10"
        onSubmit={createTopic}>
        <div className="mb-6">
          <input
            className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            type="text"
            placeholder="Topic Name"
            onChange={(e) => setTopic({ ...topic, title: e.target.value })}
            required
          />
          <input
            className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            type="text"
            placeholder="Topic Order"
            onChange={(e) => setTopic({ ...topic, sn: e.target.value })}
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setCreateForm((prev) => {
                return { ...prev, topic: false };
              });
            }}
            className="float-left flex items-center gap-2 font-sans text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Close
          </button>
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

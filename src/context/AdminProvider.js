import React, { useState, useContext } from "react";

const AdminContext = React.createContext();

export const useAdminData = () => {
  return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
  const [createForm, setCreateForm] = useState({
    course: false,
    subject: { status: false, courseId: "" },
    chapter: false,
    topic: { status: false, chapterId: "" },
  });
  const [editForm, setEditForm] = useState({
    course: { status: false, courseId: "" },
    subject: { status: false, subjectId: "" },
    chapter: { status: false, chapterId: "" },
    topic: { status: false, topicId: "" },
  });
  const [errorMessage, setErrorMessage] = useState("")
  const [isShowing, setIsShowing] = useState(false)

  return (
    <AdminContext.Provider
      value={{
        createForm,
        setCreateForm,
        editForm,
        setEditForm,
        errorMessage,
        setErrorMessage,
        isShowing,
        setIsShowing
      }}>
      {children}
    </AdminContext.Provider>
  );
};

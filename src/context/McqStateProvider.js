import React, { useState, useContext } from "react";

const McqStateContext = React.createContext();

export const useMcqState = () => {
  return useContext(McqStateContext);
};

export const McqStateProvider = ({ children }) => {
  const [mcqState, setMcqState] = useState({
    page: "course",
    showForm: false,
    questions: [],
  });

  return (
    <McqStateContext.Provider value={{ mcqState, setMcqState }}>
      {children}
    </McqStateContext.Provider>
  );
};

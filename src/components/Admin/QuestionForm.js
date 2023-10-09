import React, { useRef, useState } from "react";
import { useMcqState } from "../../context/McqStateProvider";

function QuestionForm() {
  const [image, setImage] = useState("");
  const imageRef = useRef(null);
  const { mcqState, setMcqState } = useMcqState();
  const [question, setQuestion] = useState([]);
  const createQuestion = (e) => {
    e.preventDefault();
    setMcqState((prev) => {
      return { ...prev, showForm: true };
    });
    //   postMcq(process.env.REACT_APP_BACKEND + `/mcq/course${title}`, [...questions, question]);
  };
  return (
    <div>
      <form
        className={`${mcqState.showForm ? "flex" : "hidden"
          } transition-all mt-10 flex flex-col border-2 shadow-md bg-pink-50 p-5 mb-10`}
        onSubmit={createQuestion}>
        <div className="mb-6">
          <input
            className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            type="text"
            placeholder="Question"
            onChange={(e) =>
              setQuestion((prev) => {
                return { ...prev, question: e.target.value };
              })
            }
            required
          />
        </div>
        {[...Array(4)].map((x, i) => (
          <div className="mb-6" key={i}>
            <input
              className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
              type="text"
              placeholder={`Option ${i + 1}`}
              onChange={(e) =>
                setQuestion((prev) => {
                  return {
                    ...prev,
                    options: [...prev.options, e.target.value],
                  };
                })
              }
              required
            />
          </div>
        ))}
        <div className="mb-6">
          <input
            className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            type="text"
            placeholder="Weight"
            onChange={(e) =>
              setQuestion((prev) => {
                return { ...prev, weight: e.target.value };
              })
            }
            required
          />
        </div>
        <div className="max-w-[300px] mb-5 mt-2">
          <img src={image}></img>
        </div>
        <div>
          <input
            type="file"
            ref={imageRef}
            accept=".jpg, .png, .jpeg"
            onChange={() => {
              const reader = new FileReader();
              reader.onload = (e) => setImage(e.target.result);
              reader.readAsDataURL(imageRef.current.files[0]);
            }}></input>
        </div>
        <div className="mt-5">
          <button
            onClick={() => {
              setMcqState((prev) => {
                return { ...prev, showForm: false };
              });
            }}
            className="float-left flex items-center gap-2 font-sans text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
          <button
            className="float-right flex items-center gap-2 font-sans text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;

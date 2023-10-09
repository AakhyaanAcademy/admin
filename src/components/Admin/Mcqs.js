import React, { useEffect, useRef, useState } from "react";
import { useAdminData } from "../../context/AdminProvider";
import { BiEdit } from "react-icons/bi";
import { editMcq, createMcq, getMcq, delMcq, mcqEnable } from '../../api/Mcq'
import { RiDeleteBinLine } from 'react-icons/ri'
import useSWR, { mutate } from 'swr';

function Mcqs() {
  const [mcqs, setMcqs] = useState([])
  const [added, setAdded] = useState(null)
  const [saved, setSaved] = useState(false)
  const { errorMessage, setErrorMessage, isShowing, setIsShowing } = useAdminData()
  const [editing, setEditing] = useState(null)
  let mcqRef = useRef([]);
  let durationRef = useRef([]);
  let negMarkRef = useRef([]);
  let mcqExplanationRef = useRef([]);

  const { data: mcqsList } = useSWR(process.env.REACT_APP_BACKEND + "/mcq/list", async (url) => await getMcq(url));  //getting mcqs


  useEffect(() => {
    setMcqs(mcqsList?.data)
  }, [mcqsList])


  //edit mcq
  const postEditMcq = async (mcqId, title, enabled, published, explanation, duration, negMark) => {
    const mcqEdit = await editMcq(process.env.REACT_APP_BACKEND + "/mcq/edit", {
      mcqId,
      title,
      enabled,
      published,
      explanation,
      duration,
      negMark
    });
    setErrorMessage(mcqEdit?.message)
    setIsShowing(true)
    setTimeout(() => {
      setIsShowing(false)
      setErrorMessage("")
    }, 4000);
    mutate(process.env.REACT_APP_BACKEND + "/mcq/list")
  };

  //enable mcq
  const enableMcq = async (mcqId, enabled) => {
    const mcqEdit = await mcqEnable(process.env.REACT_APP_BACKEND + "/mcq/enable", {
      mcqId,
      enabled
    });
    setErrorMessage(mcqEdit?.message)
    setIsShowing(true)
    setTimeout(() => {
      setIsShowing(false)
      setErrorMessage("")
    }, 4000);
    mutate(process.env.REACT_APP_BACKEND + "/mcq/list")
  };


  //create mcq
  const postMcq = async (title, explanation, duration, negMark) => {
    const mcqCreate = await createMcq(process.env.REACT_APP_BACKEND + "/mcq/create", {
      title,
      explanation,
      duration,
      negMark
    });
    setErrorMessage(mcqCreate?.message)
    setIsShowing(true)
    setTimeout(() => {
      setIsShowing(false)
      setErrorMessage("")
    }, 4000);
    mutate(process.env.REACT_APP_BACKEND + "/mcq/list")
  };


  //delete mcq
  const deleteMcq = async (mcqId) => {
    let promptOutput = prompt(`Are you sure to delete the mcq? Please type Confirm to delete.`, "")
    if (promptOutput === "Confirm") {
      const mcqDelete = await delMcq(process.env.REACT_APP_BACKEND + "/mcq/delete", {
        mcqId
      });
      setErrorMessage(mcqDelete?.message)
      setIsShowing(true)
      setTimeout(() => {
        setIsShowing(false)
        setErrorMessage("")
      }, 4000);
      mutate(process.env.REACT_APP_BACKEND + "/mcq/list")
    }
  };


  return (
    <div className="col-span-4 flex flex-col h-[70vh] md:h-full w-full">
      <div className="text-3xl text-center font-bold border-b-2 border-green-200 pt-6 pb-2 px-6">
        Mcqs
      </div>

      <div className="border-2 mt-4 divide-y-2">
        {mcqs?.map((mcq, i) => {
          return (
            <div key={i} className="flex gap-10 text-gray-600 text-md bg-gray-100 overflow-auto">
              <div className="flex-1">
                <div className="flex gap-2">
                  <div>{i + 1}.</div>

                  {/* title */}
                  <a className={`${i === editing ? "bg-white" : ""} px-2`} href={`/mcqs/${mcqs[i]._id}`} ref={el => mcqRef.current[i] = el} contentEditable={i === added ? true : false} >{mcq.title}</a>
                </div>
              </div>

              {/* duration */}
              <div className="text-gray-500 text-base flex gap-1 items-center">
                <span className="text-sm">duration:</span>
                <div className={`${i === editing ? "bg-white" : ""} px-2`} ref={el => durationRef.current[i] = el} contentEditable={i === added ? true : false} >
                  {parseInt(mcq?.duration)}
                </div>
              </div>

              {/* Negative Marking in percentage */}
              <div className="text-gray-500 text-base flex gap-1 items-center">
                <span className="text-sm whitespace-nowrap">Neg Mark:</span>
                <div className={`${i === editing ? "bg-white" : ""} px-2`} ref={el => negMarkRef.current[i] = el} contentEditable={i === added ? true : false} >
                  {mcq?.negMark}
                </div>
              </div>

              {/* explanation */}
              <div className="text-gray-500 text-base flex gap-1 items-center">
                <span className="text-sm">explanation:</span>
                <div className={`${i === editing ? "bg-white" : ""} px-2`} ref={el => mcqExplanationRef.current[i] = el} contentEditable={i === added ? true : false} >
                  {mcq.explanation}
                </div>
              </div>

              {/* enable button */}
              <div className="cursor-pointer text-sky-700 text-base">
                {mcq.enabled ? <div onClick={() => {
                  if (i !== added)
                    enableMcq(mcq._id, false)
                }}>Disable</div> : <div onClick={() => {
                  if (i !== added)
                    enableMcq(mcq._id, true)
                }}>Enable</div>}
              </div>

              {/* publish button */}
              <div className="cursor-pointer text-sky-700 text-base">
                {mcq.published ? <div onClick={() => {
                  if (i !== added)
                    postEditMcq(mcq._id, mcq.title, mcq.enabled, false, mcq.explanation, parseInt(mcq.duration))
                }}>Unpublish</div> : <div onClick={() => {
                  if (i !== added)
                    postEditMcq(mcq._id, mcq.title, mcq.enabled, true, mcq.explanation, parseInt(mcq.duration))
                }}>Publish</div>}
              </div>

              {/* edit button */}
              {i !== editing && i !== added ?
                <div>
                  <BiEdit
                    size={15}
                    color="red"
                    className="hover:translate-y-0.5 justify-self-end cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (editing === null) {
                        mcqExplanationRef.current[i].contentEditable = true;
                        mcqRef.current[i].contentEditable = true;
                        durationRef.current[i].contentEditable = true;
                        negMarkRef.current[i].contentEditable = true;
                        setEditing(i);
                        mcqRef.current[i].focus();
                      } else {
                        setErrorMessage("Save the current edit first.")
                        setIsShowing(true)
                        setTimeout(() => {
                          setIsShowing(false)
                          setErrorMessage("")
                        }, 4000);
                      }
                    }}
                  />
                </div>
                :
                <></>
              }

              {/* save button */}
              {i == editing || i == added ?
                <div className="flex divide-x-2">
                  <button className="bg-pink-100 px-1 text-base text-blue-900 border-2 border-red-100" onClick={() => {
                    if (mcqRef.current[i]?.textContent) {
                      if (added !== null) {
                        postMcq(mcqRef.current[i].textContent, mcqExplanationRef.current[i].textContent, parseInt(durationRef.current[i].textContent), negMarkRef.current[i].textContent)
                        setEditing(null);
                        setSaved(true);
                        setAdded(null);
                      } else {
                        postEditMcq(mcq._id, mcqRef.current[i].textContent, mcq.enabled, mcq.published, mcqExplanationRef.current[i].textContent, parseInt(durationRef.current[i].textContent), negMarkRef.current[i].textContent)
                        mcqExplanationRef.current[i].contentEditable = false;
                        mcqRef.current[i].contentEditable = false;
                        durationRef.current[i].contentEditable = false;
                        negMarkRef.current[i].contentEditable = false;
                        setEditing(null);
                      }
                    } else {
                      setErrorMessage("Please enter a topic.")
                      setIsShowing(true)
                      setTimeout(() => {
                        setIsShowing(false)
                        setErrorMessage("")
                      }, 4000);
                    }
                  }}
                  >Save</button>

                  {/* cancel button */}
                  <button className="bg-pink-100 px-1 text-base text-blue-900 border-2 border-red-100" onClick={() => {
                    if (added !== null) {
                      if (!saved) {
                        let questions = mcqs
                        questions.pop()
                        setMcqs([...questions])
                        setEditing(null)
                        setAdded(null)
                      } else {
                        mcqRef.current[i].textContent = mcqs[i].title;
                        mcqExplanationRef.current[i].textContent = mcqs[i].explanation;
                        durationRef.current[i].textContent = mcqs[i].duration;
                        negMarkRef.current[i].textContent = mcqs[i].negMark;
                        setEditing(null)
                        setAdded(null)
                        setSaved(false)
                      }
                    } else {
                      mcqRef.current[i].textContent = mcqs[i].title;
                      mcqExplanationRef.current[i].textContent = mcqs[i].explanation;
                      durationRef.current[i].textContent = mcqs[i].duration;
                      negMarkRef.current[i].textContent = mcqs[i].negMark;
                      mcqExplanationRef.current[i].contentEditable = false;
                      mcqRef.current[i].contentEditable = false;
                      durationRef.current[i].contentEditable = false;
                      negMarkRef.current[i].contentEditable = false;
                      setEditing(null);
                      setAdded(null)
                    }
                  }}
                  >Cancel</button>

                  {/* delete button */}
                  <div onClick={(e) => {
                    e.preventDefault()
                    if (added === null) {
                      deleteMcq(mcqs[i]._id)
                      setEditing(null)
                      setAdded(null)
                    }
                  }} className="px-1 pt-1 bg-green-300 cursor-pointer hover:translate-y-[1px]"><RiDeleteBinLine size={18} /></div>
                </div>
                :
                <></>
              }
            </div>
          )
        })}
      </div>

      {/* add button */}
      <div className="mt-4">
        <button onClick={(e) => {
          e.preventDefault()
          if (editing === null) {
            let len = mcqs?.length
            if (!mcqs) len = 0
            let tempMcqs = mcqs
            if (!tempMcqs)
              tempMcqs = []
            tempMcqs.push({ _id: "", title: "", isEnabled: false, explanation: "", questions: [] })
            setMcqs([...tempMcqs])
            setAdded(len)
            setEditing(len)
          } else {
            setErrorMessage("Save the current edit first.")
            setIsShowing(true)
            setTimeout(() => {
              setIsShowing(false)
              setErrorMessage("")
            }, 4000);
          }
        }} className="float-right border-2 px-1 text-gray-700 bg-gray-200">
          Add
        </button>
      </div>

      {/* error message div */}
      <div className={`${isShowing ? "animate-fade" : ""} fixed bottom-10 right-10 text-warningText border-2 bg-slate-300 rounded-md px-2`}>
        {errorMessage}
      </div>
    </div>
  );
}

export default Mcqs;

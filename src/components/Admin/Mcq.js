import React, { useEffect, useRef, useState } from "react";
import { useAdminData } from "../../context/AdminProvider";
import { BiEdit } from "react-icons/bi";
import { editMcq, getMcqQuestions, appendQuestion, delQuestion } from '../../api/Mcq'
import { RiDeleteBinLine } from 'react-icons/ri'
import useSWR, { mutate } from 'swr';
import { useParams } from "react-router-dom";
import { Paginate } from '../Pagination'

function Mcq() {
    const params = useParams()
    const mcqId = params.id
    const [mcqs, setMcqs] = useState([])
    const [added, setAdded] = useState(null)
    const [saved, setSaved] = useState(false)
    const optionsRef = useRef([])
    const optionsImageRef = useRef([])
    const weightRef = useRef(null)
    const [currentAnswer, setCurrentAnswer] = useState(null)
    const { errorMessage, setErrorMessage, isShowing, setIsShowing } = useAdminData()
    const [editing, setEditing] = useState(null)

    const { data: mcqsList } = useSWR(process.env.REACT_APP_BACKEND + `/mcq/get/${mcqId}`, async (url) => await getMcqQuestions(url));
    let mcqRef = useRef([]);
    let questionImageRef = useRef([]);
    let explanationRef = useRef([]);
    let explanationImageRef = useRef([]);

    useEffect(() => {
        setMcqs(mcqsList?.data?.questions)
    }, [mcqsList])

    const [activePage, setActivePage] = useState(1)
    const filesPerPage = 20
    const [currentPage, setCurrentPage] = useState(0)

    const pagesVisited = currentPage * filesPerPage
    const pageCount = Math.ceil(mcqs?.length / filesPerPage)

    const handleChangePage = ({ selected }) => {
        setCurrentPage(selected - 1)
    }

    const displayFiles = mcqs?.slice(pagesVisited, pagesVisited + filesPerPage).map((mcq, i) => {
        i = pagesVisited + i
        return (
            <div key={i} className="flex flex-col">
                <div className="flex gap-10 text-gray-600 text-md bg-gray-100">
                    <div className="flex-1 w-[200px]">
                        <div className="flex gap-2">
                            <div>{i + 1}.</div>
                            {/* question */}
                            <div className={`${i === editing ? "bg-white" : ""} px-2 overflow-hidden break-words`} ref={el => mcqRef.current[i] = el} contentEditable={i === added ? true : false}>{mcq.question}</div>
                        </div>
                    </div>

                    {/* edit button */}
                    {i !== editing && i !== added ?
                        <div>
                            <BiEdit
                                size={18}
                                color="red"
                                className="hover:translate-y-0.5 justify-self-end cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (editing === null) {
                                        mcqRef.current[i].contentEditable = true;
                                        setEditing(i);
                                        setCurrentAnswer(mcqs[i].answer);
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
                    {i == editing || i == added ?
                        <div className="flex divide-x-2">

                            {/* save button */}
                            <button className="bg-pink-100 px-1 h-[28px] text-base text-blue-900 border-2 border-red-100" onClick={() => {
                                if (mcqRef.current[i]?.textContent && currentAnswer !== null) {
                                    if (added !== null) {
                                        postAppendMcq(mcqRef.current[i]?.textContent, mcqId, weightRef.current.textContent, [...Array.from(Array(4)).map((val, j) => ({ text: optionsRef.current[i * 4 + j].textContent, image: optionsImageRef.current[i * 4 + j].textContent }))], currentAnswer, explanationRef.current[i]?.textContent, questionImageRef.current[i]?.textContent, explanationImageRef.current[i]?.textContent)
                                        setEditing(null);
                                        setSaved(true);
                                        setAdded(null);
                                    } else {
                                        postEditMcq(mcqRef.current[i]?.textContent, mcqId, mcq._id, weightRef.current.textContent, [...Array.from(Array(4)).map((val, j) => ({ text: optionsRef.current[i * 4 + j].textContent, image: optionsImageRef.current[i * 4 + j].textContent }))], currentAnswer, explanationRef.current[i]?.textContent, questionImageRef.current[i]?.textContent, explanationImageRef.current[i]?.textContent)
                                        mcqRef.current[i].contentEditable = false;
                                        setEditing(null);
                                    }
                                } else {
                                    console.log(added, saved)
                                    setErrorMessage("Please fill all the information first.")
                                    setIsShowing(true)
                                    setTimeout(() => {
                                        setIsShowing(false)
                                        setErrorMessage("")
                                    }, 4000);
                                }
                            }}
                            >Save</button>

                            {/* cancel buttton */}
                            <button className="bg-pink-100 px-1 h-[28px] text-base text-blue-900 border-2 border-red-100" onClick={() => {
                                if (added !== null) {
                                    if (!saved) {
                                        let questions = mcqs
                                        questions.pop()
                                        if (mcqs.length % filesPerPage === 0) {
                                            setCurrentPage(pageCount - 2)
                                            setActivePage(pageCount - 1)
                                        }
                                        setMcqs([...questions])
                                        setEditing(null)
                                        setAdded(null)
                                    } else {
                                        mcqRef.current[i].textContent = mcqs[i].question;
                                        questionImageRef.current[i].textContent = mcqs[i].questionImage;
                                        explanationRef.current[i].textContent = mcqs[i].explanation;
                                        explanationImageRef.current[i].textContent = mcqs[i].explanationImage;
                                        setCurrentAnswer(mcqs[i].answer)
                                        setEditing(null)
                                        setAdded(null)
                                        setSaved(false)
                                    }
                                } else {
                                    mcqRef.current[i].textContent = mcqs[i].question;
                                    questionImageRef.current[i].textContent = mcqs[i].questionImage;
                                    explanationRef.current[i].textContent = mcqs[i].explanation;
                                    explanationImageRef.current[i].textContent = mcqs[i].explanationImage;
                                    mcqRef.current[i].contentEditable = false;
                                    setCurrentAnswer(mcqs[i].answer)
                                    setEditing(null);
                                    setAdded(null)
                                }
                            }}
                            >Cancel</button>


                            {/* delete button */}
                            <span onClick={(e) => {
                                e.preventDefault()
                                if (added === null) {
                                    if (i === (mcqs.length - 1) && i % filesPerPage === 0) {
                                        setCurrentPage(pageCount - 2)
                                        setActivePage(pageCount - 1)
                                    }
                                    deleteQuestion(mcqId, mcq._id)
                                    setEditing(null)
                                    setAdded(null)
                                } else {
                                    setErrorMessage("Save the question first.")
                                    setIsShowing(true)
                                    setTimeout(() => {
                                        setIsShowing(false)
                                        setErrorMessage("")
                                    }, 4000);
                                }
                            }} className="px-1 pt-1 h-[28px] bg-green-300 cursor-pointer hover:translate-y-[1px]"><RiDeleteBinLine size={18} /></span>
                        </div>
                        :
                        <></>
                    }
                </div>


                <div className="flex ml-5">
                    {i === editing ?
                        <div className="flex flex-col gap-2 my-1 overflow-auto">

                            {/* question-Image */}
                            <div className="flex gap-3">
                                <span className="italic text-sm ml-5">Image:&nbsp;</span>
                                <span className={`bg-white min-h-[24px] overflow-auto px-4 break-words`} ref={el => questionImageRef.current[i] = el} contentEditable={true}>{mcq?.questionImage}</span>
                            </div>

                            {/* options */}
                            {Array.from(Array(4)).map((val, j) =>
                                <div key={i} className="flex flex-col">
                                    <div className="flex gap-2 overflow-auto">
                                        <input onClick={() => setCurrentAnswer(j)} type="radio" name="mcq" value={j} checked={j === currentAnswer} />
                                        <div ref={el => optionsRef.current[i * 4 + j] = el} contentEditable={true} className={`bg-white px-2 min-h-[24px]`} >{mcq?.options ? mcq.options[j] !== null ? mcq.options[j].text : "" : ""}</div>
                                    </div>
                                    <div className="ml-5">
                                        <span className="italic text-sm">Image:&nbsp;&nbsp;</span>
                                        <span ref={el => optionsImageRef.current[i * 4 + j] = el} contentEditable={true} className="bg-white px-4 min-h-[24px] overflow-auto" >{mcq?.options ? mcq.options[j] !== null ? mcq.options[j].image : "" : ""}</span>
                                    </div>
                                </div>
                            )}

                            {/* marks */}
                            <div className="flex gap-3">
                                <span>Marks: </span>
                                <div ref={(el) => weightRef.current = el} className={`bg-white px-4 min-h-[24px]`} contentEditable={true}>{mcq.weight}</div>
                            </div>

                            {/* explanation */}
                            <div className="flex gap-3">
                                <span>Explanation:</span>
                                <div className={`bg-white px-4 overflow-hidden break-words`} ref={el => explanationRef.current[i] = el} contentEditable={true}>{mcq?.explanation}</div>
                            </div>

                            {/* explanation-Image */}
                            <div className="flex gap-3 mb-1 min-h-[24px]">
                                <span className="ml-5 text-sm italic">Image:&nbsp;</span>
                                <span className={`bg-white px-4 overflow-auto`} ref={el => explanationImageRef.current[i] = el} contentEditable={true}>{mcq?.explanationImage}</span>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        )
    })


    //edit question
    const postEditMcq = async (question, mcqId, questionId, weight, options, answer, explanation, questionImage, explanationImage) => {
        const mcqEdit = await editMcq(process.env.REACT_APP_BACKEND + "/mcq/question/edit", {
            question,
            mcqId,
            questionId,
            weight,
            options,
            answer,
            explanation,
            questionImage,
            explanationImage
        });
        setErrorMessage(mcqEdit?.message)
        setIsShowing(true)
        setTimeout(() => {
            setIsShowing(false)
            setErrorMessage("")
        }, 4000);
        mutate(process.env.REACT_APP_BACKEND + `/mcq/get/${mcqId}`)
    };

    //append question
    const postAppendMcq = async (question, mcqId, weight, options, answer, explanation, questionImage, explanationImage) => {
        const mcqEdit = await appendQuestion(process.env.REACT_APP_BACKEND + "/mcq/question/append", {
            question,
            mcqId,
            weight,
            options,
            answer,
            explanation,
            questionImage,
            explanationImage
        });
        setErrorMessage(mcqEdit?.message)
        setIsShowing(true)
        setTimeout(() => {
            setIsShowing(false)
            setErrorMessage("")
        }, 4000);
        mutate(process.env.REACT_APP_BACKEND + `/mcq/get/${mcqId}`)
    };


    //delete question
    const deleteQuestion = async (mcqId, questionId) => {
        let promptOutput = prompt(`Are you sure to delete the mcq? Please type Confirm to delete.`, "")
        if (promptOutput === "Confirm") {
            const mcqDelete = await delQuestion(process.env.REACT_APP_BACKEND + "/mcq/question/delete", {
                mcqId,
                questionId
            });
            setErrorMessage(mcqDelete?.message)
            setIsShowing(true)
            setTimeout(() => {
                setIsShowing(false)
                setErrorMessage("")
            }, 4000);
            mutate(process.env.REACT_APP_BACKEND + `/mcq/get/${mcqId}`)
        }
    };

    return (
        <div className="col-span-4 flex flex-col h-[70vh] md:h-full w-full">
            <div className="text-3xl text-center font-bold border-b-2 border-green-200 pt-6 pb-2 px-6 break-words">
                {mcqsList?.data?.title}
            </div>
            <a target="_blank" href={`/mcqs/view/${mcqId}`} className="text-right text-sm text-green-900">
                Click to see Client's view
            </a>
            <div className="border-2 mt-4 divide-y-2">
                {displayFiles}
            </div>

            <div className="mt-4">
                {/* add button */}
                <button onClick={(e) => {
                    e.preventDefault()
                    if (editing === null) {
                        let len = mcqs?.length
                        if (!mcqs) len = 0
                        let tempMcqs = mcqs
                        if (!tempMcqs)
                            tempMcqs = []
                        if (mcqs.length % filesPerPage === 0) {
                            setCurrentPage(pageCount)
                            setActivePage(pageCount + 1)
                        }
                        tempMcqs.push({ question: "", mcqId: mcqId, weight: null, options: [], answer: null })
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

            {/* pagination */}
            <div className='flex justify-center mt-10'>
                <Paginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={handleChangePage}
                    containerClassName={"flex gap-3 items-center select-none"}
                    previousLinkClassName={"text-lg text-blue-900 dark:text-blue-100 hover:cursor-pointer"}
                    nextLinkClassName={"text-lg text-blue-900 dark:text-blue-100 hover:cursor-pointer"}
                    activeClassName={"bg-blue-600 text-white dark:bg-black hover:bg-blue-400"}
                    pageClassName={"border-2 px-3 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer hover:text-white dark:hover:bg-black"}
                    activePage={activePage}
                    setActivePage={setActivePage}
                />
            </div>

            {/* error showing */}
            <div className={`${isShowing ? "animate-fade" : ""} fixed bottom-10 right-10 text-warningText border-2 bg-slate-300 rounded-md px-2`}>
                {errorMessage}
            </div>
        </div>
    );
}

export default Mcq;

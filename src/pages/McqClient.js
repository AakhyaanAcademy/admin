import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useSWR from "swr";
import { getMcqQuestions } from "../api/Mcq";
import { Paginate } from "../components/Pagination"
import { MathJax } from 'better-react-mathjax'


function McqClient() {
    const params = useParams()
    const navigate = useNavigate()
    const id = params.id
    const [questions, setQuestions] = useState([])

    const { data } = useSWR(process.env.REACT_APP_BACKEND + `/mcq/get/${id}`, async (url) => await getMcqQuestions(url));

    useEffect(() => {
        if (typeof data !== typeof undefined) {
            if (data.success) {
                setQuestions(data?.data?.questions)
            }
        }
    }, [data])

    const handleChangePage = ({ selected }) => {
        setCurrentPage(selected - 1)
    }

    const [activePage, setActivePage] = useState(1)
    const [currentPage, setCurrentPage] = useState(0)
    const questionsPerPage = 20
    const pagesVisited = currentPage * questionsPerPage
    const pageCount = Math.ceil(questions?.length / questionsPerPage)

    const displayQuestions = questions?.slice(pagesVisited, pagesVisited + questionsPerPage).map((question, i) => {
        return (
            <div key={i} className='flex flex-col gap-1 dark:bg-background break-all'>
                <div className='flex flex-wrap gap-4'>
                    <div className="flex gap-4 break-all">
                        <div>{pagesVisited + i + 1}.</div>
                        <MathJax
                            hideUntilTypeset={"first"}
                            inline
                            dynamic
                        >{question.question}</MathJax>                        </div>
                    <span className="dark:bg-white/20 bg-blue-200 dark:text-black text-gray-900 px-2 break-all">{question.weight}</span>
                </div>
                <a target="_blank" href={question.questionImage}>
                    <div className="hover:scale-150 transition-all duration-200 ml-10 max-w-[80px]"><img alt="" src={question.questionImage}></img></div>
                </a>
                <div className='dark:bg-background flex flex-col ml-14 gap-3'>
                    {question.options.map((option, j) => {
                        return (
                            <div key={pagesVisited + i + j}>
                                <div className='flex gap-3 items-center flex-wrap'>
                                    <input className='hover:cursor-pointer' type="radio" name={`question${pagesVisited + i + 1}`} value={option}
                                        checked={question.answer === j ? true : false}
                                    />
                                    <MathJax
                                        hideUntilTypeset={"first"}
                                        inline
                                        dynamic
                                    >{option.text}</MathJax>
                                </div>
                                {option.image ?
                                    <a target="_blank" href={option.image}>
                                        <div className="hover:scale-150 transition-all duration-200 ml-10 max-w-[80px]"><img alt="" src={option.image}></img></div>
                                    </a>
                                    :
                                    <></>
                                }
                            </div>
                        )
                    })}
                </div>
                {question.explanation ?
                    <div className="ml-2 mt-2 italic flex bg-green-200 dark:bg-gray-900">
                        <MathJax
                            hideUntilTypeset={"first"}
                            inline
                            dynamic
                        >{question.explanation}</MathJax>                    </div>
                    :
                    <></>
                }
                <a target="_blank" href={question.explanationImage}>
                    <div className="hover:scale-150 transition-all ml-10 duration-200 max-w-[80px]"><img alt="" src={question.explanationImage}></img></div>
                </a>
            </div>
        )
    })


    return (
        <div className='dark:bg-background bg-back'>
            <div className={`pt-[60px] md:pt-[80px] relative dark:bg-background dark:text-mainText w-full min-h-full flex flex-col`}>
                <div className="text-2xl text-center">{data?.data?.title}</div>
                <div className="italic text-right mr-4 text-green-500">Duration:&nbsp;{parseInt(data?.data?.duration)}mins</div>

                <div className='gap-10 dark:bg-background bg-back h-full flex flex-col p-10 w-full'>
                    {displayQuestions}
                </div>

                <div className='flex justify-center mb-14'>
                    <Paginate
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={handleChangePage}
                        containerClassName={"flex gap-3 items-center select-none"}
                        previousLinkClassName={"hover:text-blue-900 text-lg text-blue-900/40 hover:cursor-pointer"}
                        nextLinkClassName={"hover:text-blue-900 text-lg text-blue-900/40 hover:cursor-pointer"}
                        activeClassName={"bg-blue-600/60 text-white hover:bg-blue-400"}
                        pageClassName={"border-2 px-3 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer hover:text-white"}
                        activePage={activePage}
                        setActivePage={setActivePage}
                    />
                </div>
            </div>
        </div>
    )
}

export default McqClient;
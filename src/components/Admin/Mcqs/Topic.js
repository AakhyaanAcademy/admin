import React, { useState, useEffect, useRef } from 'react';
import { BsPlus } from 'react-icons/bs'
import useSWR from 'swr'
import axios from 'axios'

const Topic = ({ activeTopic }) => {
    const model = {
        title: "title",
        questions: []
    }
    useEffect(() => {
        // console.log("once")
    }, [])
    const [image, setImage] = useState("")
    const imageRef = useRef(null)
    const [question, setQuestion] = useState({})
    let questions = []
    const { data, error } = useSWR("/mcq/mcq", url => axios.get(url).then(res => res.data))
    if (typeof data !== typeof undefined) {
        questions = data
    }
    const noOfQuestions = questions.length
    const [create, setCreate] = useState(false) //creating mcq

    const createQuestion = (e) => {
        e.preventDefault()
        setCreate(false)
        // postMcq(`/mcq/course${title}`, [...questions, question])
    }

    function intToChar(int) {
        // for Uppercase letters, replace `a` with `A`
        const code = 'a'.charCodeAt(0);
        return String.fromCharCode(code + int);
    }

    return (
        <div className="p-10 flex-1 my-6 mx-6 border-2 border-gray-200 rounded-xl">
            <div className='text-center text-3xl'>{activeTopic}</div>
            <div className='flex flex-col mt-10'>
                {/* adding topic */}
                <div className={`${!create ? "hidden" : ""}`}>
                    <form className="w-full transition-all mt-10 flex flex-col border-2 shadow-md bg-pink-50 p-5 mb-10"
                        onSubmit={createQuestion}
                    >
                        <div className="mb-6">
                            <input className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" type="text" placeholder="Question"
                                onChange={(e) =>
                                    setQuestion((prev) => {
                                        return { ...prev, question: e.target.value };
                                    })} required />
                        </div>
                        {[...Array(4)].map((x, i) =>
                            <div className="mb-6" key={i}>
                                <input className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" type="text" placeholder={`Option ${i + 1}`}
                                    onChange={(e) =>
                                        setQuestion((prev) => {
                                            return { ...prev, options: [...prev.options, e.target.value] };
                                        })} required />
                            </div>
                        )}
                        <div className="mb-6">
                            <input className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" type="text" placeholder="Weight"
                                onChange={(e) =>
                                    setQuestion((prev) => {
                                        return { ...prev, weight: e.target.value };
                                    })} required />
                        </div>
                        <div className='max-w-[300px] mb-5 mt-2'>
                            <img src={image}></img>
                        </div>
                        <div>
                            <input type="file" ref={imageRef} accept='.jpg, .png, .jpeg' onChange={() => {
                                const reader = new FileReader()
                                reader.onload = (e) => setImage(e.target.result)
                                reader.readAsDataURL(imageRef.current.files[0])
                            }}></input>
                        </div>
                        <div className='mt-5'>
                            <button onClick={() => {
                                setCreate(false)
                            }}
                                className="float-left flex items-center gap-2 font-sans text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Cancel
                            </button>
                            <button
                                className="float-right flex items-center gap-2 font-sans text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
                <div className='flex justify-end mt-5'>
                    <button onClick={() => setCreate(true)}
                        className="flex items-center gap-2 font-sans text-md md:text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline" type="submit">
                        Create
                        <span className='hidden md:block'><BsPlus size={30} /></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Topic




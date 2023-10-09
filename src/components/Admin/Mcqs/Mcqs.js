import React, { useState, useEffect } from 'react'
import { BsPlus } from 'react-icons/bs'
import Topic from './Topic'

const Mcqs = () => {
    const [addTopic, setAddTopic] = useState(false)
    const [activeTopic, setActiveTopic] = useState("")
    const [topic, setTopic] = useState("")
    const [topics, setTopics] = useState(["Physics", "Mathematics"])

    const createTopic = (e) => {
        e.target.reset()
        setAddTopic(false)
        setTopics([...topics, topic])
        // mutate("/courses/create/", courses)
        e.preventDefault()
    }

    return (
        <div className="col-span-4 flex flex-col h-[70vh] md:h-full">
            <div className="text-3xl text-center font-bold border-b-2 border-green-200 pt-6 pb-2 px-6">Mcqs</div>
            {!activeTopic ?
                <div className="p-10 flex-1 my-6 mx-6 border-2 border-gray-200 rounded-xl">
                    <div className='text-center text-3xl'>Mcqs</div>
                    <div className='flex flex-col mt-10'>
                        {topics.map((topic, i) => 
                            <div key={i} className="flex flex-col">
                                <div className='flex items-center relative'>
                                    <div className={`relative w-full flex p-2 text-xl text-blue-900 gap-2`} >
                                        <span>{i + 1}.</span>
                                        <span onClick={() => setActiveTopic(topic)} className='hover:underline hover:cursor-pointer'>{topic}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className={`${!addTopic ? "hidden" : ""}`}>
                            <form onSubmit={createTopic} className="mt-5 p-6 flex flex-col shadow-md">
                                <input className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" type="text" placeholder="Topic"
                                    onChange={(e) =>
                                        setTopic((prev) => {
                                            return e.target.value
                                        })} required />
                                <div className='mt-5 mb-5'>
                                    <button onClick={() => {
                                        setAddTopic(false)
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
                            <button onClick={() => setAddTopic(true)}
                                className="flex items-center gap-2 font-sans text-md md:text-lg hover:translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline" type="submit">
                                Add Topic
                                <span className='hidden md:block'><BsPlus size={30} /></span>
                            </button>
                        </div>
                    </div>
                </div>
                : <Topic topic={activeTopic} />
            }
        </div>
    )
}

export default Mcqs
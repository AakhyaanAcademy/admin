import React, { useState, useRef, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { editTopic, getTopics } from '../../../api/Courses'
import { BiEdit } from "react-icons/bi";
import { useParams } from "react-router-dom"
import DeleteButton from "./DeleteButton";
import { useNavigate } from "react-router-dom";
import { IoPlayForwardSharp } from "react-icons/io5";
import { useAdminData } from "../../../context/AdminProvider";

function TopicList({ chapterId: _id, setSubjectErrorMessage, setSubjectIsShowing }) {
    const navigate = useNavigate()
    const params = useParams()
    const [topics, setTopics] = useState([])
    const { errorMessage, setErrorMessage, isShowing, setIsShowing } = useAdminData()
    let topicRef = useRef([]);
    let topicOrderRef = useRef([]);
    const { data: topicData } = useSWR(process.env.REACT_APP_BACKEND + `/topics/${_id}/list`, async url => await getTopics(url))

    const postEditTopic = async (
        chapterId,
        topicId,
        topicTitle,
        topicContent,
        published,
        sn
    ) => {
        const topicEdit = await editTopic(process.env.REACT_APP_BACKEND + "/topic/edit", {
            topicId,
            topicTitle,
            topicContent,
            published,
            sn
        });
        setErrorMessage(topicEdit?.message)
        setIsShowing(true)
        setTimeout(() => {
            setIsShowing(false)
            setErrorMessage("")
        }, 4000);
        mutate(process.env.REACT_APP_BACKEND + `/topics/${chapterId}/list`)
    };


    useEffect(() => {
        setTopics(topicData?.data?.topics)
    }, [topicData])

    return <div className="w-full flex justify-between flex-wrap gap-2 mt-4 z-10">
        {topics?.map((topicObj, i) => {
            return (
                <div key={topicObj._id} className="w-full">
                    <div className="shadow-md border-b-2 md:border-2 border-red-200 rounded-[0.5em] cursor-pointer text-center py-2 flex flex-col items-center">
                        <div className="flex gap-2 mb-5">
                            <BiEdit
                                size={18}
                                color="red"
                                className="hover:translate-y-0.5 cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    topicOrderRef.current[i].contentEditable = true;
                                    topicOrderRef.current[i].focus();
                                }}
                            />
                            <span
                                ref={(element) =>
                                    topicOrderRef.current.push(element)
                                }
                                className="text-blue-600 font-mono text-[1.6rem] font-bold border-b-2 py-1"
                                onBlur={(e) => {
                                    postEditTopic(
                                        params.chapterId,
                                        topicObj._id,
                                        topicObj.title,
                                        topicObj.content,
                                        topicObj.published,
                                        e.currentTarget.textContent
                                    );
                                    topicOrderRef.current[i].contentEditable = false;
                                }}>
                                {topicObj?.sn}
                            </span>
                            <span className="text-blue-600 font-mono text-[1.6rem] font-bold border-b-2 py-1 pr-2">.</span>
                            <span
                                ref={(element) =>
                                    topicRef.current.push(element)
                                }
                                className="text-xl font-bold text-red-800 flex font-mono"
                                onBlur={(e) => {
                                    postEditTopic(
                                        _id,
                                        topicObj._id,
                                        e.currentTarget.textContent,
                                        topicObj.content,
                                        topicObj.published,
                                        topicObj.sn,
                                    );
                                    topicRef.current[i].contentEditable = false;
                                }}>
                                {topicObj.title}
                            </span>
                            <BiEdit
                                size={18}
                                color="red"
                                className="hover:translate-y-0.5 cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log(
                                        topicRef.current[i]
                                    );
                                    topicRef.current[i].contentEditable = true;
                                    topicRef.current[i].focus();
                                }}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:gap-4">
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/courses/${params.courseId}/${params.subjectId}/${_id}/${topicObj._id}`)
                                }}>
                                <span className="text-blue-600 border-b border-blue-500">
                                    Check Content
                                </span>
                                <IoPlayForwardSharp
                                    color="blue"
                                    className="hover:translate-y-0.5 justify-self-end"
                                />
                            </div>
                            <div className="w-full flex justify-center py-3">
                                {!topicObj.published ? (
                                    <div className="flex justify-end">
                                        <button onClick={() => {
                                            postEditTopic(_id, topicObj._id, topicObj.title, topicObj.content, true);
                                        }} className="flex items-center gap-2 font-sans text-md md:text-lg hover:translate-y-0.5 transition-all bg-slate-500 hover:bg-red-700 text-white py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline">Publish</button>
                                    </div>
                                ) :
                                    <div className="flex justify-end">
                                        <button onClick={() => {
                                            postEditTopic(_id, topicObj._id, topicObj.title, topicObj.content, false);
                                        }} className="flex items-center gap-2 font-sans text-md md:text-lg hover:translate-y-0.5 transition-all bg-slate-500 hover:bg-red-700 text-white py-2 px-1 md:px-4 rounded-md focus:outline-none focus:shadow-outline">Unpublish</button>
                                    </div>
                                }
                            </div>
                            <div className="relative py-2 flex w-full justify-around">
                                <DeleteButton
                                    text="Delete Topic"
                                    element="topic"
                                    data={{ chapterId: _id, topicId: topicObj._id }}
                                    setErrorMessage={setSubjectErrorMessage}
                                    setIsShowing={setSubjectIsShowing}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
}

export default TopicList;
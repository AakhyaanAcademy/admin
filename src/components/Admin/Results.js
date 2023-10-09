import React, { useEffect, useRef, useState } from "react";
import { getMcq } from '../../api/Mcq'
import useSWR, { mutate } from 'swr';
import { Link } from 'react-router-dom'
import moment from "moment";

function Results() {
    const [mcqs, setMcqs] = useState([])
    const { data: mcqsList } = useSWR(process.env.REACT_APP_BACKEND + "/mcq/list", async (url) => await getMcq(url));  //getting mcqs


    useEffect(() => {
        setMcqs(mcqsList?.data)
    }, [mcqsList])


    return (
        <div className="col-span-4 flex flex-col min-h-[70vh] md:min-h-full w-full">
            <div className="text-3xl text-center font-bold border-b-2 border-green-200 pt-6 pb-2 px-6">
                Results
            </div>

            <div className="divide-y-2 flex flex-col gap-5">
                {mcqs?.length ?
                    mcqs?.map((mcq, i) =>
                        <div className="flex gap-4 pt-2 flex-col">
                            <div className="flex gap-2 text-xl">
                                <div>{i + 1}.</div>
                                <div><Link className='font-medium underline' to={`/results/${mcq._id}`}>{mcq.title}</Link></div>
                            </div>
                            <div className="flex flex-col ml-8 text-base italic">
                                <div>Start time:&nbsp;&nbsp;{moment(mcq.startTime).format("MMMM Do YYYY,hh:mm:ss a")}</div>
                                <div>
                                    {mcq.endTime < mcq.currentTime ?
                                        <span>End time:&nbsp;&nbsp;{moment(mcq.endTime).format("MMMM Do YYYY,hh:mm:ss a")}</span>
                                        :
                                        <></>
                                    }
                                </div>
                                <div>
                                    {mcq.endTime > mcq.currentTime ?
                                        <span>Status:&nbsp;&nbsp;Pending</span>
                                        :
                                        <span>Status:&nbsp;&nbsp;Completed</span>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                    :
                    <div className='text-center text-red-900'>
                        There haven't been any mcqs lately.
                    </div>
                }
            </div>
        </div>
    )
}

export default Results;

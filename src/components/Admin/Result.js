import React, { useEffect, useRef, useState } from "react";
import { getResults } from '../../api/Mcq'
import { Paginate } from '../Pagination'
import useSWR, { mutate } from 'swr';
import { useParams } from "react-router-dom";
import floatingPointFix from 'js-floating-point';


function Results() {
    const params = useParams()
    const id = params.id
    const [submissions, setSubmissions] = useState([])
    const { data } = useSWR(process.env.REACT_APP_BACKEND + `/mcq/users/submissions/${id}`, async (url) => await getResults(url));

    useEffect(() => {
        if (typeof data !== typeof undefined) {
            let subs = []
            let i = 0 //because not all submissions are for live mcq
            for (let k = 0; k < data?.data?.submissions?.length; k++) {
                if (data?.data?.submissions[k].endTime <= data?.data?.endTime) {
                    subs.push(data?.data?.submissions[k])
                    let points = 0
                    for (let j = 0; j < data?.data.questions.length; j++) {
                        if (subs[i].answer[j] === data?.data?.questions[j].answer) points = floatingPointFix(points + data?.data?.questions[j].weight)
                        else {
                            if (subs[i].answer[j] !== null)
                                points = floatingPointFix(points - data?.data?.questions[j].weight * data?.data?.negMark / 100)
                        }
                    }
                    subs[i] = { ...subs[i], score: points }
                    let change = i  //for replacing one with lesser score
                    for (let j = i - 1; j >= 0; j--) {
                        if (subs[change].score > subs[j].score) {
                            let temp = subs[j]
                            subs[j] = subs[change]
                            subs[change] = temp
                            change = j
                        } else {
                            break
                        }
                    }
                    i = i + 1
                }
            }
            setSubmissions(subs)
        }
    }, [data])

    const [activePage, setActivePage] = useState(1)
    const filesPerPage = 20
    const [currentPage, setCurrentPage] = useState(0)

    const pagesVisited = currentPage * filesPerPage
    const pageCount = Math.ceil(submissions?.length / filesPerPage)

    const handleChangePage = ({ selected }) => {
        setCurrentPage(selected - 1)
    }

    const displayFiles = submissions?.slice(pagesVisited, pagesVisited + filesPerPage)?.map((user, i) => {
        i = pagesVisited + i
        return (
            <tr key={i}>
                <td>{i + 1}.</td>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.score}</td>
            </tr>
        )
    })

    return (
        <div className="col-span-4 flex flex-col min-h-[70vh] md:min-h-full w-full break-all relative">
            <div className="text-3xl text-center font-bold border-b-2 border-green-200 pt-6 pb-2 px-6">
                {data?.data?.title}
            </div>
            <div className="flex justify-end mr-5 italic my-4 font-medium">Duration:&nbsp;{parseInt(data?.data?.duration)}mins</div>
            <div className="divide-y-2 flex flex-col gap-5">
                <table>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Score</th>
                    </tr>
                    {displayFiles}
                </table>
            </div>
            <div className='flex justify-center py-10'>
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
        </div >
    )
}

export default Results;

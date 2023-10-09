import axios from 'axios'
import useSWR, { mutate } from 'swr';
import React, { useState, useEffect } from 'react'
import { getFiles } from '../../api/Media';
import { IoCopyOutline } from 'react-icons/io5'

export default function Mcq() {
    const [currentPage, setCurrentPage] = useState(0)
    const [message, setMessage] = useState("")
    const [isShowing, setIsShowing] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState(null);

    const { data: filesList } = useSWR(process.env.REACT_APP_BACKEND + "/file/list", async (url) => await getFiles(url));

    const uploadFile = (e) => {
        e.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            const upload = async () => {
                await axios.post(process.env.REACT_APP_BACKEND + "/file/upload", formData)
            }
            upload()
            mutate(process.env.REACT_APP_BACKEND + "/file/list")
        }
    }

    const handleFileChage = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    useEffect(() => {
        if (typeof filesList !== typeof undefined) {
            setFiles(filesList)
        }
    }, [filesList])

    const filesPerPage = 10
    const pagesVisited = currentPage * filesPerPage
    const pageCount = Math.ceil(filesList?.length / filesPerPage)


    const handleChangePage = ({ selected }) => {
        setCurrentPage(selected - 1)
    }


    const displayFiles = filesList?.slice(pagesVisited, pagesVisited + filesPerPage).map((file, i) => {
        return (
            <div key={i} className='hover:cursor-pointer duration-500 flex flex-col gap-3 max-w-[400px] max-h-[400px] min-w-[200px]'>
                <img className='hover:scale-105 transition-all max-h-[400px] max-w-[300px] object-cover' src={file.fileURL} />
                <div className='flex justify-center'>
                    <div onClick={() => {
                        navigator.clipboard.writeText(file.fileURL)
                        setMessage("Copied to Clipboard")
                        setIsShowing(true)
                        setTimeout(() => {
                            setIsShowing(false)
                            setMessage("")
                        }, 4000);
                        mutate(process.env.REACT_APP_BACKEND + "/courses/list")
                    }} className='hover:cursor-pointer'>
                        <IoCopyOutline size={30} />
                    </div>
                </div>
            </div>

        )
    })


    return (
        <div className={`col-span-4 relative font-sans dark:bg-background dark:text-mainText w-full h-full flex flex-col `}>
            <div className={`${isShowing ? "animate-fade" : ""} fixed bottom-10 right-10 text-blue-900 border-2 bg-slate-300 rounded-md px-2`}>
                {message}
            </div>
            <div className="flex flex-col h-full w-full">
                <div className="text-3xl text-center font-bold border-b-2 border-green-200 pt-6 pb-2 px-6">
                    Media
                </div>
                <div className="p-10 my-6 mx-6 border-2 border-gray-200 rounded-xl text-center h-full">
                    <span className='text-xl text-blue-900 font-semibold'>Add new Media from here</span>
                    <form className='flex mt-4 gap-3 md:items-center md:justify-center flex-col md:flex-row'>
                        <input type="file" name="media" onChange={handleFileChage} />
                        <button className="font-sans text-lg hover:-translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={uploadFile}>Submit</button>
                    </form>
                    <div className='gap-14 grid md:grid-cols-2 items-center justify-center p-10 px-20 mb-5'>
                        {displayFiles}
                    </div>
                </div>
            </div>
            <div className='flex justify-center mb-14 absolute bottom-0 left-0 right-0'>
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
                />
            </div>
        </div >
    )
}


export function Paginate({ nextLabel, previousLabel, pageCount, onPageChange, containerClassName, previousLinkClassName, nextLinkClassName, pageClassName, activeClassName, disabledClassName }) {
    const [activePage, setActivePage] = useState(1)
    return (
        <>
            {pageCount > 1 ?
                <div className={containerClassName}>
                    <div onClick={() => {
                        if (activePage - 1 !== 0) {
                            onPageChange({ selected: activePage - 1 })
                            setActivePage(activePage - 1)
                        }
                    }} className={previousLinkClassName}>{previousLabel}</div>
                    {
                        [...Array(pageCount)].map((e, i) => {
                            return (
                                <div onClick={() => {
                                    onPageChange({ selected: i + 1 })
                                    if (activePage !== i + 1) {
                                        setActivePage(i + 1)
                                    }
                                }} key={i + 1} className={`${activePage === i + 1 ? activeClassName : disabledClassName} ${pageClassName}`}>{i + 1}</div>
                            )
                        })
                    }
                    <div onClick={() => {
                        if (activePage + 1 <= pageCount) {
                            onPageChange({ selected: activePage + 1 })
                            setActivePage(activePage + 1)
                        }
                    }} className={nextLinkClassName}>{nextLabel}</div>
                </div>
                :
                <></>
            }
        </>
    )
}
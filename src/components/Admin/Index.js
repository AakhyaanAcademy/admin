import React from 'react'

export default function Index() {
    return (
        <div className="col-span-4 flex flex-col h-[70vh] md:h-full w-full">
            <div className="text-3xl text-center font-bold border-b-2 border-green-200 pt-6 pb-2 px-6">
                Dashboard
            </div>
            <div className="p-10 flex-1 my-6 mx-6 border-2 border-gray-200 rounded-xl text-center">
                The admin is requested to add media files like images and videos by adding url of the file located in the server. You just have to go to 'Media' tab and copy the url of the file. Also be used to content writing. Thank You!
            </div>
        </div>
    )
}

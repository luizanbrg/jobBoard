import * as React from "react";


export default function ButtonAdd() {
    return (
        <>
            <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex grid-cols-1 justify-center">
                <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    <i className="fa-solid fa-plus"></i>  
                </button>
            </div>
        </>
    )
}
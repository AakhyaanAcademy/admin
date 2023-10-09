import { useState } from "react"


export function Paginate({ nextLabel, previousLabel, pageCount, onPageChange, containerClassName, previousLinkClassName, nextLinkClassName, pageClassName, activeClassName, disabledClassName, activePage, setActivePage }) {
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
import React, { FC } from 'react'

interface PaginationProps {
    pageCount: number;
    pageChangeCallback: (num: number) => void;
    perPageCallback: (num: number) => void;
    perPage: number;
}

const Pagination: FC<PaginationProps> = ({ pageCount, pageChangeCallback, perPageCallback, perPage }) => {
    const pageArr = Array.from(Array(pageCount), (_, index) => index + 1)

    const handlePerPage = () => {
        const newNumber = perPage === 10 ? 20 : 10
        perPageCallback(newNumber)
    }

  return (
      <div className='pagination-wrapper'>
        <div>
            Show per page:
            <button onClick={handlePerPage}>{perPage === 10 ? '20' : '10'}</button>
        </div>
        <div className='page-buttons'>
            {pageArr.map((cur: number) => {
                return (
                    <button key={cur} onClick={() => pageChangeCallback(cur)}>{cur}</button>
                )
            })}
        </div>
    </div>
  )
}

export default Pagination
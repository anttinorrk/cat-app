import React, { FC } from 'react'
import './Pagination.scss'

interface PaginationProps {
    pageCount: number;
    pageChangeCallback: (num: number) => void;
    perPageCallback: (num: number) => void;
    perPage: number;
    currentPage: number;
}

const Pagination: FC<PaginationProps> = ({ pageCount, pageChangeCallback, perPageCallback, perPage, currentPage }): JSX.Element => {
    
    //Array with values from 1 to pageCount
    const pageArr: number[] = Array.from(Array(pageCount), (_, index) => index + 1)

    //Handles the change of how many cat cards to view on one page
    const handlePerPage = () => {
        const newNumber = perPage === 10 ? 20 : 10
        pageChangeCallback(1)
        perPageCallback(newNumber)
    }

  return (
      <div className='pagination-wrapper'>
        <div>
            <p>Show per page: </p>
            <button onClick={handlePerPage}>{perPage === 10 ? '20' : '10'}</button>
        </div>
        <div className='page-buttons'>
            <p>Go to page: </p>
            {pageArr.map((cur: number) => {
                return (
                    <button 
                        key={cur} 
                        className={currentPage === cur ? 'highlighted' : ''} 
                        onClick={() => pageChangeCallback(cur)}
                    >
                        {cur}
                    </button>
                )
            })}
        </div>
    </div>
  )
}

export default Pagination
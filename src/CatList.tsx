import React, { FC, useEffect, useState } from 'react'
import './CatList.scss'
import axios from 'axios'
import CatItem from './CatItem'
import { filterFunction, paginate } from './CatFunctions'
import { CatType } from './Interfaces'
import Pagination from './Pagination'
import Loader from './Loader'

interface SearchProps {
    keyword: string[]
}

const CatList: FC<SearchProps> = ({keyword}): JSX.Element => {
    
    const url = 'https://api.thecatapi.com/v1/breeds'
    const [fetchComplete, setFetchComplete] = useState<boolean>(false)
    const [cats, setCats] = useState<CatType[]>([])
    const [filteredCats, setFilteredCats] = useState<CatType[]>([])

    const [perPage, setPerPage] = useState<number>(10)
    const [paginatedCats, setPaginatedCats] = useState<(CatType[])[]>([[]])
    const [pageCount, setPageCount] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)

    //helper function to make sure that fetched attribute is string, not undefined
    const check = (atr: any): string => {
        return atr === undefined ?  '' : atr
    }
    //fetches the json data from server
    //data is saved to variable 'cats'

    useEffect(() => {
        axios.get(url)
        .then((res: any) => {
            console.log(res.data)
            const mappedData: CatType[] = (
                res.data.map((cur: any) => {
                return (
                    {
                        catId: cur.id, 
                        name: cur.name,
                        altNames: check(cur.alt_names),
                        weight: check(cur.weight.metric),
                        temperament: check(cur.temperament)
                    }
                )
                })
            )
            console.log(mappedData)
            setCats(mappedData)
            setFilteredCats(filterFunction(mappedData, ['','']))
            setFetchComplete(true)
        })
        .catch(error => console.log(error.response.status))
    }, [])


    //Chain of effects to render cat list to the screen. Executed as follows:
    //1 filteredCats is set to contain the cats to show to user
    //2 paginatedCats is set to divide them into chunks to view on one page
    //3 pageCount is set to how many pages the data is divided to

    useEffect(() => {
        console.log('effect with keyword: ', keyword)
        console.log('cats is: ', cats)
        const filtered = filterFunction(cats, keyword)
        console.log(filtered)
        setFilteredCats(filtered)
    }, [keyword, perPage])
    useEffect(() => {
        console.log('effect with filtered cats: ', filteredCats)
        const paginated = paginate(filteredCats, perPage)
        setPaginatedCats(paginated)
    },[filteredCats])
    useEffect(() => {
        console.log('effect with paginated: ', paginatedCats)
        setPageCount(paginatedCats.length)
    },[paginatedCats])

    useEffect(() => {
        console.log('CATS: ', cats)
    },[cats])
    useEffect(() => {
        console.log('FILTERED: ', filteredCats)
    },[filteredCats])
    useEffect(() => {
        console.log('PAGINATED: ', paginatedCats)
    },[paginatedCats])
    
    //Called from child component Pagination to update current page
    const handlePageChange = (num: number) => {
        console.log(num)
        setCurrentPage(num)
    }

    const handlePerPage = (num: number) => {
        setPerPage(num)
    }

    return (
        <>
            <div className={`list-container${fetchComplete ? '' : ' hidden'}`}>
                Page count: {pageCount}
                <Pagination pageCount={pageCount} pageChangeCallback={handlePageChange} perPageCallback={handlePerPage} perPage={perPage} />
                {
                    paginatedCats[currentPage - 1].map((cur: CatType) => {
                        return (
                            <CatItem key={cur.catId} catData={cur} />
                        )
                    })
                }
            </div>
            <div className={`loader-wrapper${fetchComplete ? ' hidden' : ''}`}>
                <Loader />
            </div>
        </>
    )
}

export default CatList
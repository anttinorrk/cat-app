import React, { FC, useEffect, useState } from 'react'
import './CatList.scss'
import axios from 'axios'
import CatItem from '../components/CatItem'
import { filterFunction, paginateFunction } from '../components/CatFunctions'
import { CatType } from '../components/Interfaces'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

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

    
    //helper function to make sure that fetched attribute exists, as in is not undefined
    const check = (atr: any): any => {
        return atr === undefined ?  '' : atr
    }
    //fetches the json data from server
    //data is saved to variable 'cats'
    useEffect(() => {
        axios.get(url)
        .then((res: any) => {
            console.log('fetched data')
            const mappedData: CatType[] = (
                res.data.map((cur: any) => {
                return (
                    {
                        catId: cur.id, 
                        name: cur.name,
                        altNames: check(cur.alt_names),
                        description: check(cur.description),
                        weight: check(cur.weight),
                        life: check(cur.life_span),
                        temperament: check(cur.temperament),
                        country: check(cur.country_code),
                        image: check(cur.image),
                        wiki: check(cur.wikipedia_url),
                        figures: {
                            energy: check(cur.energy_level),
                            social: check(cur.social_needs),
                            intelligence: check(cur.intelligence)

                        }
                    }
                )
                })
            )
            setCats(mappedData)
            setFilteredCats(filterFunction(mappedData, ['','']))
            setFetchComplete(true)
            console.log('saved fetched data')
        })
        .catch(error => console.log(error.response.status))
    }, [])


    //Chain of effects to render cat list to the screen. Executed as follows:
    //1 filteredCats is set to contain the cats to show to user
    //2 paginatedCats is set to divide them into chunks to view on one page
    //3 pageCount is set to how many pages the data is divided to
    useEffect(() => {
        console.log('started filtering effect')
        const filtered = filterFunction(cats, keyword)
        setFilteredCats(filtered)
    }, [keyword, perPage])
    useEffect(() => {
        console.log('started paginating effect')
        const paginated = paginateFunction(filteredCats, perPage)
        setPaginatedCats(paginated)
    },[filteredCats])
    useEffect(() => {
        console.log('setting page count')
        setPageCount(paginatedCats.length)
    },[paginatedCats])

    
    //Called from child component Pagination to update current page
    const handlePageChange = (num: number) => {
        console.log(num)
        if (currentPage != num) {setCurrentPage(num)}
    }
    const handlePerPage = (num: number) => {
        setPerPage(num)
    }
    
    
    const catPage = (
        paginatedCats[currentPage - 1].map((cur: CatType) => {
            return <CatItem key={cur.catId} catData={cur} />
    }))
    return (
        <div>
            <Pagination 
                pageCount={pageCount} 
                pageChangeCallback={handlePageChange} 
                perPageCallback={handlePerPage} 
                perPage={perPage}
                currentPage={currentPage} 
            />
            <div className='list-wrapper'>
                <div className={`list-container${fetchComplete ? '' : ' hidden'}`}>
                    {catPage}
                </div>
                <div className={`loader-wrapper${fetchComplete ? ' hidden' : ''}`}>
                    <Loader />
                </div>
            </div>
        </div>
    )
}

export default CatList
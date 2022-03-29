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
    const [paginatedCats, setPaginatedCats] = useState<CatType[][]>([[]])
    const [pageCount, setPageCount] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)

    /*const [loadedImages, setLoadedImages] = useState<number>(0)
    const [catsBeforeSearch, setCatsBeforeSearch] = useState<string[]>([])*/
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


    /*TODO: make loader work on search, idea:
        1 save the cats of current page to variable
        2 after searching, increment loadedImages for all
        cats on current page that weren't there originally,
        as in aren't in that variable
        
        loadedImages is incremented every time a new cat is rendered.
        PROBLEMS:

    */


    //Chain of effects to render cat list to the screen. Executed as follows:
    //1 filteredCats is set to contain the cats to show to user
    //2 paginatedCats is set to divide them into chunks to view on one page
    //3 pageCount is set to how many pages the data is divided to
    
    useEffect(() => {
        console.log('started filtering effect')
        const filtered: CatType[] = filterFunction(cats, keyword)
        setFilteredCats(filtered)
        setCurrentPage(1)
    }, [keyword, perPage])

    useEffect(() => {
        console.log('started paginating effect')
        const paginated: CatType[][] = paginateFunction(filteredCats, perPage)
        setPaginatedCats(paginated)
    },[filteredCats])
    useEffect(() => {
        console.log('setting page count')
        setPageCount(paginatedCats.length)
    },[paginatedCats])

    
    //Called from child component Pagination to update current page
    const handlePageChange = (num: number) => {
        if (currentPage != num) {
            console.log('handlePageChange', num)
            setCurrentPage(num)
        }
    }
    const handlePerPage = (num: number) => {
        console.log('handlePerPage', num)
        setPerPage(num)
    }

    //Used to show cat cards only when all images are loaded
    /*const catNotNew = (cat: CatType): boolean => {
        return catsBeforeSearch.includes(cat.name)
    }
    useEffect(() => {
        //saving the cats of current page to use when changing loadedImages
        const nameArr: string[] = paginatedCats[currentPage - 1].map((cur: CatType): string => {
            return cur.name
        })
        setCatsBeforeSearch(nameArr)
        setLoadedImages(0)
    },[keyword])
    useEffect(() => {
        //function to increment loadedImages
        //init loadedImages to how many cats of current page were there originally
        console.log('cats before search', catsBeforeSearch)
        let newLoaded: number = 0
        paginatedCats[currentPage - 1]
            .forEach((cur: CatType) => { 
                if (catNotNew(cur)) {
                    newLoaded ++
                    console.log(newLoaded)
                }})
        setLoadedImages(loadedImages + newLoaded)
        console.log(catsBeforeSearch)
        console.log(loadedImages)
    },[paginatedCats])

    const allLoaded = loadedImages === paginatedCats[currentPage - 1].length
    const handleLoaded = () => {
        setLoadedImages(loadedImages + 1)
    }*/
    
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
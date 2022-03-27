import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import CatItem from './CatItem'
import { filterFunction, paginate } from './CatFunctions'
import { CatType } from './Interfaces'

interface SearchProps {
    keyword: string[]
}

const AxiosCats: FC<SearchProps> = ({keyword}): JSX.Element => {
    
    const url = 'https://api.thecatapi.com/v1/breeds'
    const [cats, setCats] = useState<CatType[]>([])
    const [filteredCats, setFilteredCats] = useState<CatType[]>([])

    const perPage = 10
    const [paginatedCats, setPaginatedCats] = useState<(CatType[])[]>([[
        {
          catId: '1',
          name: 'cat1',
          altNames: '',
          weight: '1-1',
          temperament: 'cool'
        },
        {
          catId: '2',
          name: 'cat2',
          altNames: '',
          weight: '1-1',
          temperament: 'cool'
        }
      ],
      [
        {
          catId: '3',
          name: 'cat3',
          altNames: '',
          weight: '1-1',
          temperament: 'cool'
        },
        {
          catId: '4',
          name: 'cat4',
          altNames: '',
          weight: '1-1',
          temperament: 'cool'
        }
      ],
      [
        {
          catId: '5',
          name: 'cat5',
          altNames: '',
          weight: '1-1',
          temperament: 'cool'
        }
      ]])
    const [pageCount, setPageCount] = useState<number>()
    const [currentPage, setCurrentPage] = useState<number>(1)

    //helper function to make sure that fetched attribute is string, not undefined
    const check = (atr: any): string => {
        return atr === undefined ?  '' : atr
    }
    //fetches the json data and saves it to the state array 'cats'
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
        })
        .catch(error => console.log(error.response.status))
    }, [])


    //filtering function. First checks the searchBy attribute and then
    //filters cats by that attribute.
    useEffect(() => {
        console.log(keyword)
        setFilteredCats(
            filterFunction(cats, keyword)
        )
    }, [keyword])
    useEffect(() => {
        setPaginatedCats(paginate(filteredCats, perPage))
    },[filteredCats])
    useEffect(() => {
        setPageCount(paginatedCats.length)
    },[paginatedCats])
    
    //Pagination. First, filtered data is grouped to objects of 10. Those objects are then shown.
    

    return (
        <div>
            Page count: {pageCount}
            {
                paginatedCats[currentPage - 1].map((cur: CatType) => {
                    return (
                        <CatItem key={cur.catId} catData={cur} />
                    )
                })
            }
        </div>
    )
}

export default AxiosCats
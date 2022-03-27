import { serialize } from 'v8'
import { CatType } from './Interfaces'

//keyword has two parts: [0]name and [1]temperament
export const filterFunction = (cats: CatType[], keyword: string[]): CatType[] => {
  return (
    cats.filter((cur: CatType) => {
        return (
            (
            cur.name.toUpperCase().includes(keyword[0].toUpperCase()) ||
            cur.altNames.toUpperCase().includes(keyword[0].toUpperCase())
            ) && 
            cur.temperament.toUpperCase().includes(keyword[1].toUpperCase())
        )
    })
  )
}

//Divides array into smaller chunks
export const paginate = (arr: CatType[], perPage: number): (CatType[])[] => {
  const remainingArr: CatType[] = arr
  console.log(arr)
  const paginatedArr: (CatType[])[] = []
  do {
    const slicedCats: CatType[] = remainingArr.splice(0, perPage)
    console.log('sliced: ', slicedCats)
    paginatedArr.push(slicedCats)
    console.log('paginatedArr is now: ', paginatedArr)
    console.log(`remaining cats: ${remainingArr.length}`)
  } while (remainingArr.length > 0);
  console.log('paginated: ', paginatedArr)
  return paginatedArr
}

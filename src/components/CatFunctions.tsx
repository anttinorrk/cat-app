import { CatType } from './Interfaces'


//keyword has two parts: [0]name and [1]temperament
//filterFunction returns array of cats filtered by the keyword
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


//paginateFunction divides array into smaller chunks to view on different pages
export const paginateFunction = (arr: CatType[], perPage: number): (CatType[])[] => {
  const remainingArr: CatType[] = arr
  const paginatedArr: (CatType[])[] = []
  do {
    const slicedCats: CatType[] = remainingArr.splice(0, perPage)
    paginatedArr.push(slicedCats)
  } while (remainingArr.length > 0);
  console.log('paginateFunction complete')
  return paginatedArr
}

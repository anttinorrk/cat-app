import { CatType } from './Interfaces'

export const FilterFunction = (cats: CatType[], keyword: string[]): CatType[] => {
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

export const handlePagination = (arr: CatType[]): (CatType[])[] => {
  return [arr, arr]
}
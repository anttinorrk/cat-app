import { paginateFunction, filterFunction } from '../src/CatFunctions'
import { CatType } from '../src/Interfaces'

const testData: CatType[] = [
    {
        catId: "1",
        name: "one",
        altNames: "",
        description: "",
        weight: {imperial: "1-1", metric: "1-1"},
        life: "",
        temperament: "cool",
        country: "FI",
        image: {id: "", width: 100, height: 100, url: ""},
        wiki: "",
        figures: {energy: 0, social: 0, intelligence: 0}
    },
    {
        catId: "2",
        name: "two",
        altNames: "",
        description: "",
        weight: {imperial: "1-1", metric: "1-1"},
        life: "",
        temperament: "cool",
        country: "FI",
        image: {id: "", width: 100, height: 100, url: ""},
        wiki: "",
        figures: {energy: 0, social: 0, intelligence: 0}
    },
    {
        catId: "3",
        name: "three",
        altNames: "",
        description: "",
        weight: {imperial: "1-1", metric: "1-1"},
        life: "",
        temperament: "cool",
        country: "FI",
        image: {id: "", width: 100, height: 100, url: ""},
        wiki: "",
        figures: {energy: 0, social: 0, intelligence: 0}
    },
    {
        catId: "4",
        name: "four",
        altNames: "",
        description: "",
        weight: {imperial: "1-1", metric: "1-1"},
        life: "",
        temperament: "cool",
        country: "FI",
        image: {id: "", width: 100, height: 100, url: ""},
        wiki: "",
        figures: {energy: 0, social: 0, intelligence: 0}
    },
    {
        catId: "5",
        name: "five",
        altNames: "",
        description: "",
        weight: {imperial: "1-1", metric: "1-1"},
        life: "",
        temperament: "cool",
        country: "FI",
        image: {id: "", width: 100, height: 100, url: ""},
        wiki: "",
        figures: {energy: 0, social: 0, intelligence: 0}
    }
]

test('filter function', () => {
    const filtered = filterFunction(testData, ['one',''])
    console.log(filtered)
    expect(filtered.length).toBe(1)
})

test('paginate function', () => {
    const paginated = paginateFunction(testData, 2)
    expect(paginated.length).toBe(3)
    expect(paginated.map(c=>c[0].name)).toEqual([ 'one', 'three', 'five' ])
})

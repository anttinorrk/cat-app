import { paginate } from '../src/CatFunctions'
import { CatType } from '../src/Interfaces'

const testData: CatType[] = [
    {
        "catId": "1",
        "name": "cat1",
        "altNames": "",
        "weight": "1-1",
        "temperament": "cool"
    },
    {
        "catId": "2",
        "name": "cat2",
        "altNames": "",
        "weight": "1-1",
        "temperament": "cool"
    },
    {
        "catId": "3",
        "name": "cat3",
        "altNames": "",
        "weight": "1-1",
        "temperament": "cool"
    },
    {
        "catId": "4",
        "name": "cat4",
        "altNames": "",
        "weight": "1-1",
        "temperament": "cool"
    },
    {
        "catId": "5",
        "name": "cat5",
        "altNames": "",
        "weight": "1-1",
        "temperament": "cool"
    }
]


test('paginate test data', () => {
    const paginated = paginate(testData, 2)
    expect(paginated.length).toBe(3)
    expect(paginated.map(c=>c[0].name)).toEqual([ 'cat1', 'cat3', 'cat5' ])
})
export interface CatType {
    catId: string;
    name: string;
    altNames: string;
    description: string;
    weight: {imperial: string; metric: string};
    life: string;
    temperament: string;
    country: string;
    image: {id: string; width: number; height: number; url: string};
    wiki: string;
    figures: {energy: number; social: number; intelligence: number}
}
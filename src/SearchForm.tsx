import React, { FC, useState } from 'react'
import './SearchForm.scss'

// atrCallback takes 2 values: search attribute and keyword
const SearchForm: FC<any> = ({keywordCallback}) => {
    //different attributes to search by
    const searchAtrs: string[] = [
        'catId',
        'name',
        'temperament'
    ]
    const handleSearch = (event: any) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        keywordCallback(formData.get('name'), formData.get('temperament'))
    }
    const temperaments: string[] = [
        'Active',
        'Affectionate',
        'Curious',
        ''
    ]
    
    return (
        <section id='section1'>
            <form onSubmit={handleSearch}>
                <label>
                    Name:
                    <input 
                        type='text' 
                        name='name'
                    />
                </label>
                <label>
                    Temperament:
                <input 
                    type='text'
                    name='temperament'
                />
                </label>
                <button type='submit'>Search</button>
                </form>
                
            
        </section>
    )
}

export default SearchForm
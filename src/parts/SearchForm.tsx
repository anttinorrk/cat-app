import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react'
import './SearchForm.scss'

interface FormProps {
    keywordCallback: (name: string, temperament: string) => void
}

//SearcForm is responsible for providing search keywords
//to parent component
const SearchForm: FC<FormProps> = ({keywordCallback}) => {
    
    const [nameValue, setNameValue] = useState<string>('')
    const [tempValue, setTempValue] = useState<string>('')

    //TODO: what is the type of event?
    const handleName = (event: any) => {
        console.log(event.target.value)
        setNameValue(event.target.value)
    }
    const handleTemp = (event: any) => {
        console.log(event.target.value)
        setTempValue(event.target.value)
    }
    const handleSearch = (event: SyntheticEvent) => {
        console.log(event.type)
        event.preventDefault()
        console.log(nameValue, tempValue)
        keywordCallback(nameValue, tempValue)
    }
    
    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSearch}>
                <label>
                    <input 
                        type='text' 
                        name='name'
                        placeholder='name'
                        onChange={handleName}
                    />
                </label>
                <label>
                    <input 
                        type='text'
                        name='temperament'
                        placeholder='temperament'
                        onChange={handleTemp}
                    />
                </label>
                <button type='submit'>Search</button>
            </form>            
        </div>
    )
}

export default SearchForm
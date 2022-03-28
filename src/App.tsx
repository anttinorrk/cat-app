import React, { FC, useState } from 'react'
import './App.scss'
import CatList from './parts/CatList'
import SearchForm from './parts/SearchForm'

const App: FC = (): JSX.Element => {

  //modified from SearchForm and passed to CatList
  const [keyword, setKeyword] = useState<string[]>([ '', '' ])
  const handleKeyword = (name: string, temperament: string) : void => {
    console.log([name, temperament])
    setKeyword([name, temperament])
  }

  return (
    <div className="App">
      <SearchForm keywordCallback={handleKeyword} />
      <CatList keyword={keyword} />
    </div>
  );
}

export default App;

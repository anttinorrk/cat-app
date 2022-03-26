import React, { FC, useState } from 'react'
import './App.scss'
import AxiosCats from './AxiosCats'
import SearchForm from './SearchForm'

const App: FC = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string[]>([])
  const handleKeyword = (name: string, temperament: string) : void => {
    console.log([name, temperament])
    setKeyword([name, temperament])
  }

  

  return (
    <div className="App">
      <SearchForm keywordCallback={handleKeyword} />
      <AxiosCats keyword={keyword} />
    </div>
  );
}

export default App;

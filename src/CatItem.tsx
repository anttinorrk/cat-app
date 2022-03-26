import React, { FC } from 'react'
import './CatItem.scss'
import { CatType } from './Interfaces'

interface CatProps {
    catData: CatType;
}

const CatItem: FC<CatProps> = ({ catData }): JSX.Element => {
  return (
    <div className='cat-item'>
        <p>{catData.name} | Weight: {catData.weight} kg</p>
    </div>
  )
}

export default CatItem
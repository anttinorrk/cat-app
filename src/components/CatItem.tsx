import React, { FC, useState } from 'react'
import './CatItem.scss'
import { CatType } from '../components/Interfaces'
import imgNotFound from '../media/imgNotFound.jpg'
import downArrow from '../media/downArrow.svg'

interface CatProps {
    catData: CatType;
}

const CatItem: FC<CatProps> = ({ catData }): JSX.Element => {

  //Handles the visibility of detail box
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false)
  const handleDetails = () => {
    const current = detailsVisible
    setDetailsVisible(!current)
  }

  return (
    <div className='cat-container'>
      <div className='cat-card' onClick={handleDetails}>
          <div className='img-container'>
            <img 
              className='cat-img' 
              src={catData.image.url != undefined ? catData.image.url : imgNotFound} 
              alt='cat'
              />
          </div>
          <div className='title-container'>
            <h3>{catData.name}</h3>
            <img className='triangle-icon' src={downArrow} alt='open details' />
          </div>
      </div>
      <div className={`cat-details${detailsVisible ? '' : ' hidden'}`}>
        <div className='title-container'>
          <h2>{catData.name}</h2>
          <p>{catData.altNames}</p>
        </div>
        <div className='info-container'>
          <img className='country-flag' src={`https://countryflagsapi.com/png/${catData.country.toLowerCase()}`} alt={catData.country} />
          <p>{catData.weight.metric} kg</p>
          <p>{catData.life} yrs</p>
        </div>
        <div className='temperament-container'>
          <p>{catData.temperament}</p>
        </div>
        <div className='figures-container'>
          <div className='figure-titled'>
            <div className={`figure size${catData.figures.energy}`}>
            </div>
            <h4>Energy</h4>
          </div>
          <div className='figure-titled'>
            <div className={`figure size${catData.figures.social}`}>
            </div>
            <h4>Sociality</h4>
          </div>
          <div className='figure-titled'>
            <div className={`figure size${catData.figures.intelligence}`}>
            </div>
            <h4>Intelligence</h4>
          </div>
        </div>
        <div className='desc-container'>
          <p>{catData.description}</p>
          <a href={catData.wiki}>{catData.wiki}</a>
        </div>
      </div>
    </div>
  )
}

export default CatItem
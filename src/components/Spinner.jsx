import React from 'react'
import { ImSpinner3 } from 'react-icons/im'

const Spinner = ({ active }) => {
  return (

    <div className={`spinner ${active ? 'active' : ''}`}>
      <ImSpinner3 className='spinner__icon' />
    </div>

  )
}

export default Spinner
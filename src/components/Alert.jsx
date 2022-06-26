import React from 'react'

const Alert = ({ alert}) => {
  return (
    <div className={`alert ${alert.active ? 'active' : ''}`}>{alert.text}</div>
  )
}

export default Alert
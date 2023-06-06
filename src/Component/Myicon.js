import React from 'react'

const Myicon = (props) => {
  return (
    <div>
        <button className={props.myclass}>{props.icon}</button>
    </div>
  )
}

export default Myicon
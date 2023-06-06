import React from 'react'

const Myimg = (props) => {
  return (
    <>
      <div>
          <img src={props.im} alt="" srcset="" className={props.className} />
      </div>
    </>
  )
}

export default Myimg
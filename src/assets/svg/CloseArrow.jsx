import React from 'react'

function CloseArrow(props) {
    const{width,height}=props;
  return (
    <svg
    width={width}
    height={height}
    viewBox="0 0 29 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29 5L21.5 0.669873V9.33013L29 5ZM0 5.75H22.25V4.25H0V5.75Z"
      fill="black"
    />
  </svg>
  )
}

export default CloseArrow
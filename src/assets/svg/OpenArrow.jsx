import React from 'react'

function OpenArrow(props) {
    const{height,width}=props;
  return (
    <svg
    width={width}
    height={height}
    viewBox="0 0 30 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.5303 6.53033C29.8232 6.23744 29.8232 5.76256 29.5303 5.46967L24.7574 0.696699C24.4645 0.403806 23.9896 0.403806 23.6967 0.696699C23.4038 0.989592 23.4038 1.46447 23.6967 1.75736L27.9393 6L23.6967 10.2426C23.4038 10.5355 23.4038 11.0104 23.6967 11.3033C23.9896 11.5962 24.4645 11.5962 24.7574 11.3033L29.5303 6.53033ZM0 6.75H29V5.25H0V6.75Z"
      fill="black"
    />
  </svg>
  )
}

export default OpenArrow
import React from 'react'

function Line(props) {
  const{width,height}=props;
  return (
    <svg
    width={width}
    height={height}
    viewBox="0 0 29 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      y1="1.25"
      x2="29"
      y2="1.25"
      stroke="black"
      stroke-width="1.5"
    />
  </svg>
  )
}

export default Line
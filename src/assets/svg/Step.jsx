import React from 'react'

function Step(props) {
  const{width,height}=props;
  return (
    <svg
              width={width}
              height={height}
              viewBox="0 0 28 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 19H14.9655V1H28" stroke="black" />
            </svg>
  )
}

export default Step
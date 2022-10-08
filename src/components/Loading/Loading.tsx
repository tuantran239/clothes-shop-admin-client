import React from 'react'
import { ScaleLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="h-screen bg-gray-800 d-flex flex-column justify-content-center align-items-center">
      <ScaleLoader color="#fff" />
    </div>
  )
}

export default Loading

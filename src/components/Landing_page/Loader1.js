import React from 'react'
import './Loader1.css'
export default function Loader1() {
  return (
    <div className="loader-body">
      <div className="loader-wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Loading</span>
      </div>
    </div>
  )
}

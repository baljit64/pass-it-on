// import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import jpg from '../../images/mydp.png';
export default function Mydp() {
  // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  // const [image, setImage] = useState('')
  // setImage(localStorage.getItem('mydp'))
  let img = (localStorage.getItem('mydp'))
  // useEffect(() => {
  //   axios.get('View_profile').then(res => {
  //     if (res) {
  // setImage(img)
  //     }
  //   })

  // }, [img])
  if (img === null) {
    return (
      <div>
        <img src={jpg} alt="profile pic" />
      </div>
    )
  }
  else {
    return (
      <div>
        <img src={img} alt="profile pic" />
      </div>
    )
  }

}

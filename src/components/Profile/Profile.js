import React, { Component } from 'react';
import Sidebar from '../navbar/Sidebar';
import Footer from '../Landing_page/Footer';
import * as FaIcons from 'react-icons/fa'
import './profile.css';
// import { Link } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../Landing_page/spinner'
// import Mydp from '../navbar/Mydp';
import Loader from '../../images/loader.gif'

class Profile extends Component {
  constructor() {
    super();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.state = {
      name: null,
      email: null,
      city: null,
      college: null,
      rno: null,
      yop: null,
      image: null,
      loaded: false,
      edit: true
    }
  }
  componentDidMount() {
    this.profile()
  }
  mydp() {
    axios.get('View_profile').then(res => {
      if (res.data) {
        localStorage.setItem('mydp', res.data.message)
        this.setState({
          image: res.data.message
        })

      }
    })
  }

  profile() {
    this.mydp()
    axios.get('/get_profile').then((res => {
      if (res.data.result) {
        this.setState({
          name: res.data.result.name,
          email: res.data.result.email,
          city: res.data.result.city,
          college: res.data.result.college,
          rno: res.data.result.roll_number,
          yop: res.data.result.yop,
          loaded: true
        })
      }
    }))
      .catch(err => {
        alert(err.message)
      })

  }
  setImg = (e) => {
    this.setState({
      image: Loader
    })
    const formData = new FormData();
    formData.append("file", e)
    axios.post('/set_Image', formData).then(res => {
      console.log(res)
      if (res.data.message === "sucessfully uploaded....") {
        this.mydp()
      }
    }).catch(err => {
      console.log(err)
    })

  }
  render() {

    if (this.state.loaded) {

      return (
        <div className="wrapper">
          <Sidebar />
          <div className="container ">
            <div className="profile-box">
              <div className="row shadow-box">
                <div className="col-md-4 w-100  text-center sidenav">
                  <div className="profile-pic-box  mx-auto text-center ">
                    <div className="profile-pic-circle mx-auto">
                      <div className="edit-img">
                        <FaIcons.FaPencilAlt size='2rem' className="edit-icon" />
                        <input className="uploadimg" onChange={(e) => { this.setImg(e.target.files[0]) }} accept=".jpg,.png"
                          type="file" />
                      </div>
                      <div className="profile-pic">
                        <img src={this.state.image} className="profile-pic-img w-100" alt="profile-pic" />
                      </div>
                    </div>
                  </div>
                  <h4>{this.state.name}</h4>
                </div>
                <br />
                <br />
                <div className="col-md-8 ">
                  <div className="profile-content">
                    <div className="row ">
                      <div className="col-sm-6">
                        <div className=" px-2 d-flex py-3 flex-column">
                          <h4 className="info-label">Email</h4>
                          <h4 className="info-value">{this.state.email}</h4>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className=" px-2 d-flex py-3 flex-column">
                          <h4 className="info-label">Name</h4>
                          <h4 className="info-value">{this.state.name}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className=" px-2 d-flex py-3 flex-column">
                          <h4 className="info-label">Roll Number</h4>
                          <h4 className="info-value">{this.state.rno}</h4>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className=" px-2 d-flex py-3 flex-column">
                          <h4 className="info-label">University/College</h4>
                          <h4 className="info-value">{this.state.college}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className=" px-2 d-flex py-3 flex-column">
                          <h4 className="info-label">Year of Passing</h4>
                          <h4 className="info-value">{this.state.yop}</h4>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className=" px-2 d-flex py-3 flex-column  ">
                          <h4 className="info-label">City</h4>
                          <h4 className="info-value">{this.state.city}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div >
      );
    }
    else {
      return (
        <Spinner />)
    }
  }
}

export default Profile;
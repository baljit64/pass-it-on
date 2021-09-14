import React, { Component } from 'react';

import axios from 'axios';

import Sidebar from '../navbar/Sidebar';
import Footer from '../Landing_page/Footer';
import Spinner from '../Landing_page/spinner'
import mydp from '../../images/mydp.png'
import Loader from '../../images/loader.gif';

class Editprofile extends Component {
  constructor() {
    super();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.state = {

      loaded: false,
      errmsg: '',
      image: '',
      loaderror: '',
      success: false,

      email: '',
      name: '',
      roll_number: '',
      college: '',
      yop: '',
      city: ''

    }
  }



  componentDidMount() {
    this.apicall()
  }
  apicall() {
    axios.get('View_profile').then((res => {
      this.setState({
        image: res.data.message
      })
    }))
    axios.get('/get_profile').then(res => {
      if (res.data) {

        this.setState({
          email: res.data.result.email,
          name: res.data.result.name,
          roll_number: res.data.result.roll_number,
          college: res.data.result.college,
          yop: res.data.result.yop,
          city: res.data.result.city,
          loaded: true
        })

      }
    }).catch(err => {
      if (err) {
        this.setState({
          loaderror: err.message
        })
      }
    })
  }
  update(e) {
    this.setState({
      errmsg: '',
      success: false
    })
    e.preventDefault()
    document.querySelector(".update-btn").innerHTML = "Updating...";
    let data = {
      name: this.state.name,
      yop: this.state.yop,
      email: this.state.email,
      roll_number: this.state.roll_number,
      city: this.state.city,
      college: this.state.college
    }

    axios.post('/Edit_profile', data).then((res => {
      console.log(res)
      if (res.data) {
        if (res.data.message === "Sucessfully uploaded data...") {
          this.setState({
            success: true,
            errmsg: res.data.message
          })
        }
        document.querySelector(".update-btn").innerHTML = "Save and Update";
      }
    })).catch(err => {
      if (err) {
        document.querySelector(".update-btn").innerHTML = "Save and Update";
        this.setState({
          errmsg: err.message
        })
      }
    })
  }
  setimage = (e) => {
    this.setState({
      errmsg: '',
      success: false
    })
    document.getElementsByClassName("dp")[0].src = Loader;
    document.querySelector(".upload-img-label").innerHTML = "Uploading...";
    const formData = new FormData();
    formData.append("file", e)
    axios.post('/set_Image', formData).then(res => {
      if (res) {
        document.querySelector(".upload-img-label").innerHTML = "Update pic";
        if (res.data.message === "sucessfully uploaded....") {
          this.setState({
            errmsg: "sucessfully uploaded....",
            success: true
          })
          this.profileImg()
        }
      }
      else {
        document.getElementsByClassName("dp")[0].src = this.state.image;
      }
    }).catch(err => {
      if (err) {
        this.setState({
          errmsg: err.message
        })
        document.getElementsByClassName("dp")[0].src = this.state.image;
        document.querySelector(".upload-img-label").innerHTML = "Update pic";
      }
    })
  }
  show() {
  }
  profileImg() {
    axios.get('/View_profile').then(res => {
      if (res.data) {
        localStorage.setItem('mydp', res.data.message)
        document.getElementsByClassName("dp")[0].src = res.data.message;
      }
      this.setState({
        image: res.data.message
      })
    })
  }
  delProfile() {
    axios.post('del-profile').then(res => {
      if (res) {
        if (res.data.message === "Profile Photo is removed"
        ) {
          this.profileImg()
        }
      }
    })
  }
  render() {
    let error = '';
    if (this.state.loaderror) {
      return (
        <div className="alert height-400 alert-danger mt-4" role="alert">
          <p className="msg-text-size">{this.state.loaderror}</p>
        </div>
      )
    }
    if (this.state.errmsg) {
      if (this.state.success) {
        error = (
          <div className=" text-center  my-2" role="alert">
            <p className="text-success msg-text-size">{this.state.errmsg}</p>
          </div>
        )
      }
      else {
        error = (
          <div className=" text-center  my-2" role="alert">
            <p className="text-danger msg-text-size">{this.state.errmsg}</p>
          </div>
        )
      }
    }
    if (this.state.loaded) {
      return (
        <div>
          <Sidebar />
          <div className="container">
            <div className="outer-box-discription">
              <h1 className="item-name">Edit Profile</h1>
              {error}
              <div className="row">
                <div className="col-md-5 mx-auto">
                  <div className="img-box mx-auto d-flex flex-column ">
                    <img src={this.state.image} className="dp" alt="Profile pic" />
                    <div className="Upload-img-btn-box my-3 w-100 d-flex justify-content-around">
                      <label className="width-40 mx-auto upload-profile-pic-btn">
                        <label className="btn-lg  upload-img-label btn w-100 btn-upload ">Update pic </label>
                        <input accept=".png,.jpg"
                          onChange={(e) => {
                            e.target.files.length > 0 ? this.setimage(e.target.files[0]) : this.show()
                          }}
                          type="file" className="upload-img-input btn btn-lg w-100" accept=".jpg,.png" />
                      </label>
                      <div onClick={() => this.delProfile()}
                        className="remove-dp  text-center  width-40 mx-auto upload-profile-pic-btn
                btn-lg btn-danger">Remove pic</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 pt-md-5">
                  <form>
                    <div className="row">
                      <div className="col-sm-6 mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">Name </h2>
                        <input className="sell-input w-100 d-block" required placeholder="Name"
                          value={this.state.name}
                          onChange={(e) => this.setState({
                            name: e.target.value
                          })}
                          type="text" />
                      </div>
                      <div className="col-sm-6  mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">Email </h2>
                        <input required className="sell-input w-100 d-block"
                          value={this.state.email}
                          onChange={(e) => this.setState({
                            email: e.target.value
                          })} placeholder="Email"
                          type="text" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">Year of Passing</h2>
                        <input required className="sell-input d-block w-100"
                          value={this.state.yop}
                          onChange={(e) => this.setState({
                            yop: e.target.value
                          })}
                          placeholder="Year of Passing"
                          type="number" />
                      </div>
                      <div className="col-sm-6 mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">City</h2>
                        <input required className="sell-input d-block w-100"
                          value={this.state.city}
                          onChange={(e) => this.setState({
                            city: e.target.value
                          })}
                          placeholder="City"
                          type="text" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">Roll Number</h2>
                        <input required className="sell-input d-block w-100"
                          value={this.state.roll_number}
                          onChange={(e) => this.setState({
                            roll_number: e.target.value
                          })}
                          placeholder="Roll Number"
                          type="number" />
                      </div>
                      <div className="col-sm-6 mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">College/University</h2>
                        <input required className="sell-input d-block w-100"
                          value={this.state.college}
                          onChange={(e) => this.setState({
                            college: e.target.value
                          })}
                          placeholder="College/university"
                          type="text" />
                      </div>
                    </div>

                  </form>
                </div>
                <div className="row w-100">
                  <div className="col-sm-12">
                    <div className="discription-content-box pt-md-5 text-center mx-auto w-100">

                      <div className="msg-btn-box d-flex  justify-content-center">
                        <button onClick={(e) => { this.update(e) }} className="btn-lg btn update-btn py-3 w-50 btn-success">Save and Update</button> </div>
                    </div></div></div>
              </div>
            </div>
          </div>
          <Footer />
        </div >
      );
    }
    else {
      return (
        <Spinner />
      )
    }
  }
}

export default Editprofile;
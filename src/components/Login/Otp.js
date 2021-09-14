import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Otp extends Component {

  err = {

    otpstatus: false
  }
  constructor(props) {
    super(props);
    this.state = {
      OTP: null,
      email: null
    }
  }
  componentDidMount() {
    const MYemail = localStorage.getItem('myemail');
    this.setState({ email: MYemail })
  }

  submit = (e) => {
    e.preventDefault();
    console.log(this.state)
    this.setState({ message: '' })
    axios.post('forget', this.state).then(res => {
      if (res.data.message === "OTP matched....") {
        this.setState({ otpstatus: true })
      }
      else {
        this.setState({
          otpstatus: false,
          message: "Invalid OTP"
        })

      }
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    if (this.state.otpstatus === true) {
      return <Redirect to={"/set"} />
    }
    return (
      <div className="wrapper">

        <div className="sign-in-body">
          <div className="container ">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="login-box-section">
                  <div className="login-box-section-inner">
                    <div className="row px-0">
                      <div className=" col-xl-7 col-lg-7  w-md-100">
                        <div className="logo-bar text-left">
                          <img src="/images/logo.svg" alt="" className="logo my-3 ml-2" />
                        </div>
                        <form>
                          <div className="form-content d-flex  flex-column my-lg-5">
                            <p className="forget-text text-left py-2">Enter the otp code Here
                            </p>
                            <label htmlFor="otp" className="pl-1 pb-1 text-left email">OTP</label>
                            <input type="number/text" name="otp"
                              value={this.OTP} onChange={(e) => { this.setState({ OTP: e.target.value }) }}
                              className="mb-3 pl-3" />
                            <p className="errmsg">{this.state.message}</p>
                            <button
                              onClick={this.submit}
                              style={{ textDecoration: 'none' }} type="submit"
                              className="continue-btn mb-3 text-center">Submit</button>
                            <p className="dont-have-account-text my-5 text-center">don't have an account?
                              <Link to="/signup" className="sign-up-link" >sign up</Link></p>
                          </div>
                        </form>
                      </div>
                      <div className="col-lg-5 col-xl-5 d-none d-lg-block">
                        <img className="login-img w-100" src="/images/login-page1.jpg" alt="login" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Otp;
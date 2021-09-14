import axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header'
const Logo = "./images/logo.svg";
class Forget extends Component {


  constructor() {
    super();
    this.state = {
      email: ''
    }
  }

  valid() {
    if (this.state.email === '') {
      this.setState({
        message: "Please Enter Email."
      })

      return false;
    }
    else {
      return true;
    }
  }
  submit = (e) => {
    e.preventDefault()
    this.setState({ message: '' })
    if (this.valid()) {
      axios.post('forget',
        this.state).then(res => {
          // console.log(res)

          if (res.data.message === "OTP is generated....") {
            localStorage.setItem('myemail', this.state.email);
            this.setState({
              getotp: true
            });
          }
          else {

            this.setState({
              getotp: false,
              message: "Email not Found"

            });
          }

        })
        .catch(error => {
          this.setState({
            message: "Email not Found"
          });

        })
    }


  }
  render() {
    if (this.state.getotp === true) {
      return <Redirect to={'/otp'} />;
    }
    let error = '';
    if (this.state.message) {
      error = (
        <div className="alert alert-danger" role="alert">

          {this.state.message}
        </div>
      )
    }
    const { email } = this.state;
    return (

      <div className="wrapper">

        <div className="sign-in-body">
          <div className="container">
            <div className="row justify-content-center px-0">
              <div className="col-md-10">
                <div className="login-box-section">
                  <div className="login-box-section-inner">
                    <div className="row px-0">
                      <div className=" col-xl-7 col-lg-7  w-md-100">
                        <div className="logo-bar text-left">
                          <img src={Logo} alt="" className="logo my-3 ml-2" />

                        </div>
                        <form>

                          <div className="form-content d-flex  flex-column my-lg-5">
                            {error}
                            <p className="forget-text text-left pt-2">Enter the Registered Email address.</p>

                            <label htmlFor="email" className="pl-1 pb-1 text-left email">Email</label>
                            <input type="text"
                              value={email} onChange={(e) => { this.setState({ email: e.target.value }) }}
                              className="mb-3 pl-3" />
                            {/* <p className="errmsg">{this.val}</p> */}

                            <button style={{ textDecoration: 'none' }}
                              type="submit" onClick={this.submit}
                              className="continue-btn mt-3 mb-3 text-center">Continue</button>


                            <p className="dont-have-account-text my-5 text-center">don't have an account?
                              <Link to="/signup" className="sign-up-link" >sign up</Link></p>



                          </div>
                        </form>
                      </div>
                      <div className="col-lg-5 col-xl-5 d-none d-lg-block">
                        <img className=" login-img w-100" src="../images/login-page1.jpg" alt="login" />

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

export default Forget;
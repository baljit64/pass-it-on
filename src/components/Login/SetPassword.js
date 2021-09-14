import axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Logo = "./images/logo.svg";
const Bg = "./images/login-page1.jpg";


class SetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      New_password: '',
      verify_new_password: '',
      email: ''
    }
  }
  valid() {

    if ((this.state.New_password === "" || this.state.verify_new_password === "")) {
      this.setState({ message: "Fields are Empty" })
      return false;
    }
    else if (this.state.New_password.length < 6 || this.state.verify_new_password < 6) {
      this.setState({ message: "password must be atleast 6 character" })
      return false;
    }
    else if (this.state.New_password !== this.state.verify_new_password) {
      this.setState({ message: "password are not matched" })
      return false;
    }
    else {
      this.setState({ message: "" })
      return true;
    }
  }
  componentDidMount() {
    const MYemail = localStorage.getItem('myemail');
    this.setState({ email: MYemail })
  }
  submit = e => {
    e.preventDefault()
    this.setState({
      message: ''
    })
    console.log(this.state)
    if (this.valid()) {
      console.log("api called")
      axios.post('forget', this.state).then(res => {
        console.log(res);
        if (res.data.message === "Your PassWord is Sucessfully changed!.....") {
          this.setState({
            changed: true
          });
          localStorage.clear();
        }
        else {
          this.setState({
            changed: false,
            message: res.data.message
          });
        }
      })
        .catch(error => {
          this.setState({
            changed: false,
            message: "Something Went Wrong"
          });
        })
    }
  }
  render() {
    if (this.state.changed === true) {
      return <Redirect to={"/"} />
    }
    let error = '';
    if (this.state.message) {
      error = (
        <div className="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      )
    }
    return (
      <div className="wrapper">

        <div className="sign-in-body">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="login-box-section">
                  <div className="login-box-section-inner">
                    <div className="row px-0">
                      <div className=" col-xl-7 col-lg-7  w-md-100">
                        <div className="logo-bar text-left">
                          <img src={Logo} alt="" className="logo my-3 ml-2" />
                        </div>
                        <h2 className="reset-password-heading text-center my-4">Reset Your Password</h2>
                        <div className="form-content py-5">
                          <form className="d-flex  flex-column">
                            {error}
                            <input type="password" onChange={e => this.setState({ New_password: e.target.value })} className="mb-3 pl-2" placeholder="New Password" />
                            <input type="password" onChange={e => this.setState({ verify_new_password: e.target.value })} className="mb-3 pl-2" placeholder="Confirm Password" />
                            <button type="submit" onClick={this.submit} style={{ textDecoration: 'none' }} className="continue-btn mt-3 mb-3 text-center">Reset Password</button>
                            <p className="dont-have-account-text my-5 text-center">don't have an account?
                              <Link to="/signup">sign up</Link></p>
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-5 col-xl-5 d-none d-lg-block">
                        <img className=" login-img w-100" src={Bg} alt="login" />
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

export default SetPassword;
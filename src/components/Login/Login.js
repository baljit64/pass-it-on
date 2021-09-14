import React from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";

const Logo = "./images/logo.svg";
const Bg = "./images/login-page1.jpg";

export default class Login extends React.Component {

    state = {
        loggedIn: false
    }
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        }
    }
    submitHandler = e => {
        e.preventDefault()
        document.getElementsByClassName('sign-in-btn')[0].innerHTML = "Logging...";
        this.setState({ message: '' })
        axios.post('login', this.state).then(res => {
            // console.log("login res", res)

            if (res.data.token) {
                document.getElementsByClassName('sign-in-btn')[0].innerHTML = "Log In";
                localStorage.setItem('token', res.data.token);

                this.setState({
                    loggedIn: true
                });
            }
            else if (res.data.message === "login Failed") {
                document.getElementsByClassName('sign-in-btn')[0].innerHTML = "Log In";
                this.setState({
                    loggedIn: false,
                    message: "Incorrect Password"

                });
            }
            else {
                document.getElementsByClassName('sign-in-btn')[0].innerHTML = "Log In";
                this.setState({
                    loggedIn: false,
                    message: res.data.message
                });
            }
        }).catch(err => {
            document.getElementsByClassName('sign-in-btn')[0].innerHTML = "Log In";
            this.setState({
                message: err.message
            });
        })
    }
    render() {
        if (this.state.loggedIn === true) {

            return <Redirect to={'/apicall'} />;
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
            <div className="wrapper" >

                <div className="sign-in-body">
                    <div className="container">
                        <div className="row justify-content-center px-0">
                            <div className="col-md-10">
                                <div className="login-box-section">
                                    <div className="login-box-section-inner">
                                        <div className="row">
                                            <div className=" col-xl-7 col-lg-7 mx-0 w-100 w-md-100">
                                                <div className="logo-bar text-left">

                                                    <img src={Logo} alt="" className="logo my-3 ml-2" />

                                                </div>
                                                <div className="form-content">
                                                    <form className="d-flex  flex-column" >
                                                        <h3 className="sign-in text-center py-2"> Sign In </h3>
                                                        {error}
                                                        <label htmlFor="email" className="text-left email"> Email  </label>
                                                        <input type="text" name="email" required className="mb-3 pl-2"
                                                            placeholder="Email" value={this.email}
                                                            onChange={(e) => (this.setState({ email: e.target.value }))} />
                                                        <label htmlFor="password" className="text-left password">Password </label>
                                                        <input type="password" name="password" required
                                                            className="pl-2"
                                                            placeholder="Password"
                                                            value={this.password}
                                                            onChange={(e) => (this.setState({ password: e.target.value }))} />

                                                        <small className="forget-password text-right">
                                                            <Link className="forget" to="/forget">
                                                                Forget Password ? </Link>
                                                        </small>
                                                        <div className="btns d-flex flex-row justify-content-between">
                                                            <button type="submit"
                                                                className="mr-auto sign-in-btn text-center"
                                                                onClick={this.submitHandler}  >
                                                                Log In</button>

                                                            <Link to="/signup" style={{ textDecoration: 'none' }} className="ml-auto sign-up-btn  text-center" >
                                                                Sign up
                                                            </Link>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="col-lg-5 col-xl-5 d-none d-lg-block">
                                                <img className="login-img w-100" src={Bg} alt="login" />
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

};

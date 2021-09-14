import React from 'react';

import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
const Logo = "./images/logo.svg";

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            college: '',
            yop: '',
            roll_number: '',
            city: '',
            password: '',
            confirm_password: ''

        }
    }
    data = {
        errEmail: '',
        errName: '',
        errClg: '',
        errYop: '',
        errRno: '',
        errCity: '',
        errPassword: '',
        loggedIn: false
    }

    valid() {
        if (!this.state.email.includes("@gmail.com") && this.state.name.length < 6
            && this.state.college === '' && this.state.yop === '' && this.state.roll_number === ''
            && this.state.city === '' && this.state.confirm_password !== this.state.password &&
            this.state.confirm_password.length < 6) {
            this.setState({
                errEmail: "Invalid Email",
                errName: "Minimun name length is 6",
                errClg: "Select college",
                errYop: "Select year",
                errRno: "Enter Roll no.",
                errCity: "City Required",
                errPassword: "Password is not Matched"

            })
        }
        else if (!this.state.email.includes("@gmail.com")) {
            this.setState({
                errEmail: "Invalid Email"
            })
        }
        else if (this.state.name.length < 6) {
            this.setState({
                errName: "Minimun name length is 6"
            })
        }
        else if (this.state.college === '') {
            this.setState({
                errClg: "Select college"
            })
        }
        else if (this.state.city === '') {
            this.setState({
                errCity: "City Required"
            })
        }
        else if (this.state.roll_number === '') {
            this.setState({
                errRno: "Roll no required"
            })
        }
        else if (this.state.yop === '') {
            this.setState({
                errYop: "Select year"
            })
        }
        else if (this.state.confirm_password !== this.state.password) {
            this.setState({
                errPassword: "Password  not matched"
            })
        }
        else if (this.state.confirm_password.length < 6) {
            this.setState({
                errPassword: "Minimun length is 6 rquired"
            })
        }
        else {
            return true;
        }

    }

    submitHandler = e => {
        e.preventDefault()
        this.setState({
            errEmail: '',
            errName: '',
            errClg: '',
            errYop: '',
            errRno: '',
            errCity: '',
            errPassword: '',
            message: ''
        })
        if (this.valid()) {

            axios.post('register',
                this.state).then(res => {

                    console.log(res.data)
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token)
                        this.setState({
                            loggedIn: true
                        });
                    }
                    else {

                        this.setState({
                            loggedIn: false,
                            message: res.data.message

                        });
                    }
                })
                .catch(error => {
                    if (error) {
                        this.setState({

                            message: error.message

                        });
                    }

                })
        }

    }

    render() {




        let error = '';
        if (this.state.message) {
            error = (
                <div className="alert alert-danger" role="alert">

                    {this.state.message}
                </div>
            )
        }
        if (this.state.loggedIn === true) {
            return <Redirect to={'/apicall'} />;
        }
        return (


            <div className="wrapper" >

                <div className="sign-up-body">

                    <div className="container ">

                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="login-box-section">
                                    <div className="login-box-section-inner ">
                                        <div className="row">
                                            <div className=" col-xl-7 col-lg-7 w-100 w-md-100">
                                                <div className="logo-bar text-left">
                                                    <img src={Logo} alt="" className="logo my-3 ml-2" />

                                                </div>
                                                <div className="form-content sign-up-form-content">
                                                    <form className="d-flex  flex-column" onSubmit={this.submitHandler} >
                                                        <h3 className="sign-in text-center py-2">Sign Up</h3>
                                                        {error}
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 py-2 col-md-6 col-sm-12">

                                                                <input type="text" className="email w-100" placeholder="Email" value={this.email}
                                                                    onChange={(e) => this.setState({ email: e.target.value })}
                                                                    required />
                                                                <p className="errmsg">{this.state.errEmail}</p>
                                                            </div>

                                                            <div className="col-lg-6 col-md-6 py-2 col-sm-12 mx-sm-auto"> <input value={this.name}
                                                                type="text" className="name w-100" pattern='[a-zA-Z\s]+'
                                                                onChange={(e) => this.setState({ name: e.target.value })}
                                                                required placeholder="Name" />
                                                                <p className="errmsg">{this.state.errName}</p></div>
                                                            <div className="col-lg-6 col-md-6 py-2 col-sm-12">


                                                                <select required className="college-list w-100 py-3" value={this.college}
                                                                    onChange={(e) => this.setState({ college: e.target.value })}>

                                                                    <option value="">Select College/University</option>
                                                                    <option value="Adesh University,Bathinda">Adesh University,Bathinda</option>
                                                                    <option value="Akal University,Bathinda">Akal University,Bathinda</option>
                                                                    <option value="Baba Farid University of Health Sciences,Faridkot">Baba Farid University of Health Sciences,Faridkot</option>
                                                                    <option value="Central University of Punjab,Bathinda">Central University of Punjab,Bathinda</option>
                                                                    <option value="Chandigarh University,mohali">Chandigarh University,mohali</option>
                                                                    <option value="Chitkara University, Punjab">Chitkara University, Punjab</option>
                                                                    <option value="DAV University,Jalandhar">DAV University,Jalandhar</option>
                                                                    <option value="Dr. B R Ambedkar National Institute of Technology Jalandhar">Dr. B R Ambedkar National Institute of Technology Jalandhar</option>
                                                                    <option value="GNA University,Phagwara">GNA University,Phagwara</option>
                                                                    <option value="Guru Angad Dev Veterinary and Animal Sciences University,Ludhiana">Guru Angad Dev Veterinary and Animal Sciences University,Ludhiana</option>
                                                                    <option value="Guru Kashi University,Talwandi Sabo">Guru Kashi University,Talwandi Sabo</option>
                                                                    <option value="Guru Nanak Dev University,Amritsar">Guru Nanak Dev University,Amritsar</option>
                                                                    <option value="Guru Ravidas Ayurved University,Hoshiarpur">Guru Ravidas Ayurved University,Hoshiarpur</option>
                                                                    <option value="Indian Institute of Science Education and Research, Mohali">Indian Institute of Science Education and Research, Mohali</option>
                                                                    <option value="Indian Institute of Technology Ropar,Rupnagar">Indian Institute of Technology Ropar,Rupnagar</option>
                                                                    <option value="Lovely Professional University,hoshiarpur">Lovely Professional University,hoshiarpur</option>
                                                                    <option value="Maharaja Ranjit Singh Punjab Technical University,Bathinda">Maharaja Ranjit Singh Punjab Technical University,Bathinda</option>
                                                                    <option value="National Institute of Pharmaceutical Education and Research, S.A.S. Nagar Mohali">National Institute of Pharmaceutical Education and Research, S.A.S. Nagar Mohali</option>
                                                                    <option value="Punjab Agricultural University,Ludhiana">Punjab Agricultural University,Ludhiana</option>
                                                                    <option value="Punjab Technical University,Kapurthala">Punjab Technical University,Kapurthala</option>
                                                                    <option value="Punjabi University Patiala,Patiala">Punjabi University Patiala,Patiala</option>
                                                                    <option value="RIMT University,Mandi Gobindgarh,Desh Bhagat University,Mandi Gobindgarh">RIMT University,Mandi Gobindgarh,Desh Bhagat University,Mandi Gobindgarh</option>
                                                                    <option value="Rajiv Gandhi National University of Law,Patiala">Rajiv Gandhi National University of Law,Patiala</option>
                                                                    <option value="Rayat-Bahra University,Kharar">Rayat-Bahra University,Kharar</option>
                                                                    <option value="Sant Baba Bhag Singh University,Jalandhar">Sant Baba Bhag Singh University,Jalandhar</option>
                                                                    <option value="Sant Longowal Institute of Engineering and Technology,Sangrur">Sant Longowal Institute of Engineering and Technology,Sangrur</option>
                                                                    <option value="Sri Guru Granth Sahib World University,Fatehgarh Sahib">Sri Guru Granth Sahib World University,Fatehgarh Sahib</option>
                                                                    <option value="Sri Guru Ram Das University of Health Sciences,Qila Jiwan Singh">Sri Guru Ram Das University of Health Sciences,Qila Jiwan Singh</option>
                                                                    <option value="Thapar Institute of Engineering and Technology,patiala">Thapar Institute of Engineering and Technology,patiala</option>
                                                                </select>
                                                                <p className="errmsg">{this.state.errClg}</p>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 py-2 col-sm-12">

                                                                <select className="year-of-passing w-100 py-3" required
                                                                    onChange={(e) => this.setState({ yop: e.target.value })} value={this.yop}
                                                                    placeholder="Year of passing">

                                                                    <option value="">Year of Passing</option>
                                                                    <option value="2021">2021</option>
                                                                    <option value="2020">2020</option>
                                                                    <option value="2019">2019</option>
                                                                    <option value="2018">2018</option>
                                                                    <option value="2017">2017</option>
                                                                    <option value="2016">2016</option>
                                                                    <option value="2015">2015</option>
                                                                    <option value="2014">2014</option>
                                                                    <option value="2013">2013</option>
                                                                    <option value="2012">2012</option>
                                                                    <option value="2011">2011</option>
                                                                    <option value="2010">2010</option>
                                                                    <option value="2009">2009</option>
                                                                    <option value="2008">2008</option>
                                                                    <option value="2007">2007</option>
                                                                    <option value="2006">2006</option>
                                                                    <option value="2005">2005</option>
                                                                    <option value="2004">2004</option>
                                                                    <option value="2003">2003</option>
                                                                    <option value="2002">2002</option>
                                                                    <option value="2001">2001</option>
                                                                    <option value="2000">2000</option>
                                                                    <option value="1999">1999</option>
                                                                    <option value="1998">1998</option>
                                                                    <option value="1997">1997</option>
                                                                </select>
                                                                <p className="errmsg">{this.state.errYop}</p>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 py-2 col-sm-12"><input type="number" pattern='[0-9]*' required
                                                                className="university-roll-no w-100" inputMode="numeric"
                                                                onChange={(e) => this.setState({ roll_number: e.target.value })} value={this.roll_number}
                                                                placeholder="University Roll Number" />     <p>{this.state.errRno}</p></div>
                                                            <div className="col-lg-6 col-md-6  py-2 col-sm-12"><input type="text" required
                                                                onChange={(e) => this.setState({ city: e.target.value })} pattern='[a-zA-Z\s]+' value={this.city}
                                                                className="city w-100" placeholder="City" />     <p>{this.state.errCity}</p></div>
                                                            <div className="col-lg-6 col-md-6  py-2 col-sm-12"><input type="password" required
                                                                onChange={(e) => this.setState({ password: e.target.value })} value={this.password}
                                                                className="password w-100" placeholder="Password" /></div>
                                                            <div className="col-lg-6 col-md-6 py-2 col-sm-12"> <input type="password" required
                                                                onChange={(e) => this.setState({ confirm_password: e.target.value })} value={this.confirm_password}
                                                                className="confirm-password w-100" placeholder="Confirm Password " />
                                                                <p className="errmsg">{this.state.errPassword}</p>
                                                            </div>

                                                            <div className="col-sm-12 py-2 d-flex flex-row place-items-center">
                                                                <input type="checkbox" required name="terms" id="terms-and-conditions" />
                                                                <label className="terms-conditions" htmlFor="terms-and-conditions">Terms and
                                                                    Conditions.</label>
                                                            </div>

                                                            <div className="col-lg-12 w-100 col-md-12 col-sm-12 sign-up-page-btns d-flex flex-row justify-content-between">
                                                                <Link style={{ textDecoration: 'none' }} to="/"
                                                                    className="mr-auto back-btn text-center">Back
                                                                </Link>
                                                                <button
                                                                    className="ml-auto  sign-up-btn   text-center"
                                                                    type="submit">Sign up</button>
                                                            </div>


                                                        </div>



                                                    </form>
                                                </div>
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
            </div >

        )
    }
}
export default Signup;
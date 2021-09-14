import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (

      <div className="container-fluid w-100 header-bg bg-light">

        <div className="container px-2">
          <div className="row">

            <div className="col-sm-12  py-4  d-flex justify-content-between">

              <div className="text-left header-home">Home

                </div>


              <div className="text-right"> <NavLink style={{ textDecoration: 'none' }}
                className="header-login header-link mr-5"
                activeClassName="header-active-link" to="/" >Login</NavLink>
                <NavLink style={{ textDecoration: 'none' }}
                  className="header-signup header-link"
                  activeClassName="header-active-link" to="/signup" >Signup</NavLink></div>
            </div>



          </div>
        </div>


      </div>




    );
  }
}

export default Header;
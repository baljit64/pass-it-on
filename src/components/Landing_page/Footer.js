import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (

      <section className="w-100 footer-sec">

        <div className="container">
          <div
            className="footer-content-box d-flex flex-lg-row flex-column justify-content-between">
            <div className="about-us">
              <h2 className="footer-heading">About us</h2>
              <div className="footer-content">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis porro doloremque
                  labore magnam dignissimos deleniti atque? Earum eius quis perspiciatis possimus
                  aliquid unde ratione labore? Repellendus debitis libero provident laudantium!</p>
                <div className="footer-icons">
                  <a href=""><span className="social-icons"><i className="fab fa-instagram"></i></span></a>
                  <a href=""><span className="social-icons"><i className="fab fa-twitter"></i></span></a>
                  <a href=""> <span className="social-icons"><i className="fab fa-facebook-f"></i></span></a>

                  <a href=""><span className="social-icons"><i className="fab fa-youtube"></i></span></a>
                </div>
              </div>
            </div>
            <div className="quick-links ">
              <h2 className="footer-heading">Quick Links</h2>
              <div className="footer-content">
                <ul className="quick-links-list">
                  <li><a href="">About</a> </li>
                  <li><a href="">FAQ</a> </li>
                  <li><a href="">Privacy Policy</a> </li>
                  <li><a href="">Help</a> </li>
                  <li><a href="">Terms & Condiions</a> </li>
                  <li><a href="">Contact</a> </li>
                </ul>
              </div>
            </div>
            <div className="contact-us">
              <h2 className="footer-heading">Contact Us</h2>
              <div className="footer-content">
                <address>

                  phase 8 , Mohali <br />
                  Industrial Area <br />
                  Chandigarh ,Punjab <br />
                  <a className="mt-1" href="tel:12345678"><i className="fas fa-phone-alt mr-1"></i>
                    12354554</a>
                </address>
              </div>
            </div>
          </div>

        </div>
        <div className="copyright  text-center  py-2 w-100">
          Copyright © 2021 Pass<em>it</em>on. All Rights Reserved.</div>
      </section>






    );
  }
}

export default Footer;
import React, { Component } from 'react';

class Banner extends Component {
  render() {
    return (

      <div className="container-fluid px-0">

        <section className="banner">

          <div className="container px-0 mx-auto">

            <div className="banner-inner-wrap">
              <div className="content-area text-center">
                <h2 className="banner-heading">Pass<i className="brand-color">It</i>on</h2>
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis porro doloremque labore magnam dignissimos deleniti atque? Earum eius quis perspiciatis possimus
                  aliquid unde ratione labore? Repellendus debitis libero provident laudantium!   </p>
              </div>

              <div className="search-form">
                <div className="search-form-header">
                  Search Your Need.
                </div>
                <form>
                  <div className="d-flex flex-column">
                    <div className="col-sm-12">
                      <label className="search-form-label">Title</label>
                      <input type="text" placeholder="Title" className="search-fields" />
                    </div>
                    <div className="col-sm-12">
                      <label className="search-form-label">Select category</label>
                      <input type="text" placeholder="Select category" className="search-fields" />
                    </div>
                    <div className="col-sm-12">
                      <label className="search-form-label">Location</label>
                      <input type="text" placeholder="Location" className="search-fields" />
                    </div>
                    <div className="col-sm-12">
                      <button type="submit" className="search-form-btn ">Search</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>



          </div>

        </section>
      </div>

    );
  }
}

export default Banner;
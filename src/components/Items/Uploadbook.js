import React, { Component } from 'react';
import './sellitem.css';
import { Redirect } from 'react-router-dom';
import img from '../../images/success.jpg'
import Sidebar from '../navbar/Sidebar';
import Footer from '../Landing_page/Footer';
import axios from 'axios'
import * as BsIcons from 'react-icons/bs'


class Uploadbook extends Component {
  constructor() {
    super();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.submitHandler = this.submitHandler.bind(this);
    const local = localStorage.getItem('data');
    const id = JSON.parse(local);

    this.state = {

      subcat: id.bookSubcat,
      cat_id: id.cat.bookid,
      sub_cat_id: null,
      title: null,
      author: null,
      Edition: null,
      university: null,

      Quantity: null,
      Price: null,
      Description: null,
      images: [],
      success: false,
      uploading: false,
      redirect: false
    }

  }


  valid() {
    if (!this.state.images.length > 0) {
      this.setState({
        success: false,
        errmsg: "Please choose Atleast One pic"
      })

      return false
    }
    else {

      return true
    }
  }

  submitHandler = e => {
    e.preventDefault()

    this.setState({
      errmsg: '',
      inputerr: ''
    })
    if (this.valid()) {
      this.setState({
        uploading: true
      })
      let formData = new FormData();
      formData.append("title", this.state.title)
      let totalimg = this.state.images.length
      for (let i = 0; i < totalimg; i++) {
        formData.append("images", this.state.images[i])
      }
      formData.append("cat_id", this.state.cat_id)
      formData.append("sub_cat_id", this.state.sub_cat_id)
      formData.append("price", this.state.Price)
      formData.append("edition", this.state.Edition)
      formData.append("quantity", this.state.Quantity)
      formData.append("author", this.state.author)
      formData.append("description", this.state.Description)
      formData.append("university", this.state.university)
      axios.post('details', formData).then(res => {

        if (res.data.message === "Your Item is stored on book section...") {
          this.setState({
            images: [],
            success: true,
            uploading: false
          })
          setTimeout(() => this.setState({ redirect: true }), 1200);
          document.getElementById("imgname").innerHTML = " ";
          var items = document.getElementsByClassName("li");
          for (var i = 0; i < 5; i++) {
            items[i].innerHTML = " ";
          }
        }
        if (res.data) {
          this.setState({
            errmsg: res.data.message,
            uploading: false
          })
        }
      }).catch(err => {
        if (err) {
          this.setState({
            errmsg: err.message,
            uploading: false
          })
        }
      })
    }
  }

  setImg = (e) => {
    if (e) {
      if (e.length > 0 && e.length <= 5) {
        for (let i = 0; i < e.length; i++) {
          this.state.images.push(e[i])
        }
      }
      document.getElementById("imgname").innerHTML = "Selected Files";
      var items = document.getElementsByClassName("li");
      for (var i = 0; i < e.length; i++) {
        items[i].innerHTML = e[i].name + " " + e[i].size + " bytes";
      }
    }
    if (e.length === 0) {
      document.getElementById("imgname").innerHTML = " ";
      var items = document.getElementsByClassName("li");
      for (var i = 0; i < 5; i++) {
        items[i].innerHTML = " ";
      }
      this.setState({
        images: []
      })
    }
  }
  show() {
    document.getElementById("imgname").innerHTML = " ";
    var items = document.getElementsByClassName("li");
    for (var i = 0; i < items.length; i++) {
      items[i].innerHTML = " ";
    }
    this.setState({
      errmsg: "you can select only 5 images "
    })
  }
  render() {
    let error = '';
    let uploading = '';
    let done = '';
    if (this.state.errmsg) {
      if (this.state.success) {
        error = (
          <div className="alert alert-success mt-4" role="alert">
            <p className="msg-text-size">{this.state.errmsg}</p>
          </div>
        )
      }
      else {
        error = (
          <div className="alert mt-4 alert-danger" role="alert">
            <p className="msg-text-size ">{this.state.errmsg}</p>
          </div>
        )
      }
    }
    if (this.state.success) {
      done = (
        <div className="height-100vh d-flex">
          <div className="col-sm-12 w-100 mx-auto">
            <div className="bg-light success-popup">
              <img className="success-img" src={img} />
              <h3 className="upload-msg text-muted py-2">Your item successfully uploaded</h3>
            </div>
          </div>
        </div>
      )
    }
    if (this.state.uploading) {
      uploading = (
        <div className="height-100vh  d-flex">
          <div className="loader">UPLOADING.....</div>
        </div >
      )
    }
    if (this.state.redirect) {
      return <Redirect to="/up" />;
    }
    return (

      <div className="wrapper">
        <Sidebar />
        {uploading}
        {done}
        <div className="container">

          <div className="col-lg-10 mx-auto">
            <div className="add-item-wrap">
              <form onSubmit={this.submitHandler}>



                <h1 className="item-name ">Add Book Detail</h1>
                {error}
                <div className="row ">
                  <div className="col-sm-12">

                    <div className="file-wrap  mt-5 mb-3 mx-auto">

                      <label id="uploadimg" className="text-uppercase  w-100 p-4  mb-3 text-muted">
                        <div className="img-box-text text-center">
                          <p>Drag 'n' drop Images here</p>
                          <BsIcons.BsCloudUpload size="3rem" />
                          <span className="btn btn-success d-block  mx-auto my-2 w-50 font-weight-bold">Click to Open Dialogue</span>

                          <p id="imgname" className="text-left text-dark"></p>
                          <ul className="filelist text-left text-dark">
                            <li className="li"></li>
                            <li className="li"></li>
                            <li className="li"></li>
                            <li className="li"></li>
                            <li className="li"></li>
                          </ul>


                        </div>

                        <input required onChange={(e) => {
                          e.target.files.length > 5 ? this.show() :
                            this.setImg(e.target.files)
                        }} multiple type="file" accept=".jpg,.png" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 mt-2 mb-4">

                    <h2 className="discription-headings pl-2 d-block">Type</h2>
                    <select className="w-100 p-3 ">
                      <option >Book</option>
                    </select>
                  </div>
                  <div className="col-sm-6 mt-2 mb-4">
                    <h2 className="discription-headings pl-2 d-block">Category</h2>
                    <select className="w-100 p-3" required onChange={(e) => this.setState({
                      sub_cat_id: e.target.value
                    })}>

                      <option value="">Select category</option>
                      <option value={this.state.subcat.engg}>Engineering</option>
                      <option value={this.state.subcat.pharmacy}>Pharmacy</option>
                      <option value={this.state.subcat.management}>Management</option>
                      <option value={this.state.subcat.agriculture}>Agriculture</option>
                      <option value={this.state.subcat.arts}>Arts</option>
                      <option value={this.state.subcat.commerce}>Commerec</option>
                      <option value={this.state.subcat.law}>Law</option>
                      <option value={this.state.subcat.sc}>Science</option>
                      <option value={this.state.subcat.nursing}>Nursing</option>

                    </select>
                  </div>
                  <div className="col-sm-6 mt-2 mb-4">
                    <h2 className="discription-headings pl-2 d-block">Title </h2>
                    <input className="sell-input w-100 d-block" required placeholder="Title"
                      onChange={(e) => this.setState({

                        title: e.target.value

                      })} type="text" />
                  </div>
                  <div className="col-sm-6  mt-2 mb-4">
                    <h2 className="discription-headings pl-2 d-block">Author </h2>
                    <input required className="sell-input w-100 d-block"
                      onChange={(e) => this.setState({

                        author: e.target.value

                      })} placeholder="Author"
                      type="text" />
                  </div>
                  <div className="col-sm-6 mt-2 mb-4  ">
                    <h2 className="discription-headings pl-2 d-block">Edition</h2>
                    <input required className="sell-input w-100 d-block"
                      onChange={(e) => this.setState({ Edition: e.target.value })}
                      placeholder="Edition"
                      type="number" /></div>
                  <div className="col-sm-6 mt-2 mb-4">
                    <h2 className="discription-headings pl-2 d-block">University</h2>

                    <input required className="sell-input d-block w-100"
                      onChange={(e) => this.setState({ university: e.target.value })}
                      placeholder="University"
                      type="text" />
                  </div>

                  <div className="col-sm-6 mt-2 mb-4">
                    <h2 className="discription-headings pl-2 d-block">Quantity</h2>
                    <input required className="sell-input d-block w-100"
                      onChange={(e) => this.setState({ Quantity: e.target.value })}
                      placeholder="Quantity"
                      type="number" />
                  </div>
                  <div className="col-sm-6 mt-2 mb-4">
                    <h2 className="discription-headings pl-2 d-block">Price</h2>
                    <input required className="sell-input d-block w-100"
                      onChange={(e) => this.setState({ Price: e.target.value })}
                      placeholder="Price"
                      type="number" />
                  </div>
                  <div className="col-sm-12 mt-2 mb-4">
                    <span className="d-flex"><h2 className="discription-headings">
                      Description  </h2> </span>
                    <textarea required className="w-100 text-area form-control" rows="3"
                      onChange={(e) => this.setState({ Description: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="col-sm-12 mx-auto my-3">
                    <button type="submit" id="uploadbtn" className="btn submit-detail btn-success">Submit</button>
                  </div>
                </div>


              </form>
            </div>
          </div>
        </div >
        {/* <Footer /> */}
      </div >
    );

  }
}

export default Uploadbook;
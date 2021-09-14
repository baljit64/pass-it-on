import React, { Component } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import Sidebar from '../navbar/Sidebar';
import Footer from '../Landing_page/Footer';
import './Discription.css';
import * as AiIcons from 'react-icons/ai'
import Spinner from '../Landing_page/spinner'

class Editbook extends Component {
  constructor() {
    super();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.state = {
      delete: false,
      loaded: false,
      errmsg: '',
      title: '',
      author: '',
      description: '',
      edition: '',
      price: '',
      quantity: '',
      university: '',
      _id: '',
      images: [],
      loaderror: '',
      imgcount: '',
      success: false
    }
  }
  totalimg = 0;
  componentDidMount() {
    this.apicall()
  }
  apicall() {
    const id = this.props.match.params.id;
    this.setState({
      images: [],
    })
    axios.get('get-detail1/' + id).then(res => {
      if (res.data) {
        let imgcount = res.data.result[0].images.length;
        this.setState({
          totalimg: imgcount
        })
        for (let i = 0; i < imgcount; i++) {
          this.state.images.push(res.data.result[0].images[i])
        }
        this.setState({
          imgcount: imgcount,
          reqimg: 5 - imgcount,
          title: res.data.result[0].title,
          author: res.data.result[0].author,
          description: res.data.result[0].description,
          edition: res.data.result[0].edition,
          price: res.data.result[0].price,
          quantity: res.data.result[0].quantity,
          university: res.data.result[0].university,
          _id: res.data.result[0]._id,
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
    document.querySelector(".update-btn").innerHTML = "Updating";
    let data = new FormData;
    data.append("title", this.state.title)
    data.append("author", this.state.author)
    data.append("edition", this.state.edition)
    data.append("university", this.state.university)
    data.append("quantity", this.state.quantity)
    data.append("price", this.state.price)
    data.append("description", this.state.description)
    data.append("detail_id", this.state._id)
    axios.post('/edit-Imagedetail1', data).then((res => {
      if (res.data) {
        if (res.data.message === "Your book is sucessfully updated") {
          this.setState({
            success: true,
            errmsg: res.data.message
          })
        }
        document.querySelector(".update-btn").innerHTML = "Update";
      }
    })).catch(err => {
      if (err) {
        document.querySelector(".update-btn").innerHTML = "Update";
        this.setState({
          errmsg: err.message
        })
      }

    })
  }
  delimg(index) {
    let remainimg = this.state.totalimg - 1;
    this.setState({
      totalimg: remainimg
    })
    this.setState({
      success: false,
      errmsg: ""
    })
    let deldata = {
      details_id: this.state._id,
      index: index
    }
    axios.post('/del-Imagedetail1', deldata).then((res => {
      if (res.data) {

        this.setState({
          success: true,
          loaded: false,
          errmsg: "Successfully Deleted Image"
        })
        this.apicall()
      }
    })).catch(err => {
      if (err) {
        this.setState({
          errmsg: err.message
        })
      }
    })
  }
  uploadimg(e) {
    this.setState({
      errmsg: ''
    })
    var imgdata = new FormData();
    imgdata.append("details_id", this.state._id)
    for (let i = 0; i < e.length; i++) {
      imgdata.append("image1", e[i])
    }
    document.querySelector(".upload-img-label").innerHTML = "Uploading Images..";
    axios.post('/add-Imagedetail1', imgdata).then((res => {
      if (res.data.message === "Added sucessfully!!") {
        this.setState({
          errmsg: res.data.message,
          success: true,
          loaded: false
        })
        this.apicall()
      }
      else {
        this.setState({
          errmsg: res.data.message
        })
        document.querySelector(".upload-img-label").innerHTML = " + Add Image " + this.state.reqimg;
      }
    })).catch(err => {
      if (err) {
        this.setState({
          errmsg: err.message
        })
      }
    })
  }
  show() {
    let img = 5 - this.state.totalimg;
    let msg = "You can select Maximum " + img + " image(s)"
    this.setState({
      success: false,
      errmsg: msg
    })
  }
  delmsg() {
    this.setState({
      success: false,
      errmsg: "Please Add another image to del this pic"
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
          <div className="alert alert-success mt-4" role="alert">
            <p className="msg-text-size">{this.state.errmsg}</p>
          </div>
        )
      }
      else {
        error = (
          <div className="alert alert-danger mt-4" role="alert">
            <p className="msg-text-size">{this.state.errmsg}</p>
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
              <h1 className="item-name">Edit Book</h1>
              {error}
              <div className="row">
                <div className="col-md-5 ">
                  <div className="img-box mx-auto">

                    <Carousel>
                      {this.state.images.map((item, i) =>
                        <Carousel.Item key={i} interval={2000}>
                          <img src={item} className="discription-img w-100" alt="book images" />
                          <div className="del-edit-icon" key={i}>
                            <span
                              onClick={(key = { i }) => {
                                this.state.totalimg === 1 ? this.delmsg() :
                                  this.delimg(i)
                              }}>
                              <AiIcons.AiFillDelete className="" /> </span></div>
                        </Carousel.Item>)
                      }
                    </Carousel>
                  </div>
                  {this.state.reqimg > 0 ?
                    <div className="Upload-img-btn-box text-center w-75 mx-auto pb-3 mr-3">
                      <label className="btn-lg upload-img-label btn btn-upload w-75">+ Add Image {this.state.totalimg}/5
                        <input multiple accept=".png,.jpg"
                          onChange={(e) => {
                            e.target.files.length > 5 - this.state.totalimg ? this.show() :
                              this.uploadimg(e.target.files)
                          }}
                          type="file" className="d-none" accept=".jpg,.png" />
                      </label>
                    </div> : ""
                  }
                </div>
                <div className="col-md-7 pt-md-5">
                  <form>
                    <div className="row">
                      <div className="col-sm-6 mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">Title </h2>
                        <input className="sell-input w-100 d-block" required placeholder="Title"
                          value={this.state.title}
                          onChange={(e) => this.setState({
                            title: e.target.value
                          })}
                          type="text" />
                      </div>
                      <div className="col-sm-6  mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">Author </h2>
                        <input required className="sell-input w-100 d-block"
                          value={this.state.author}
                          onChange={(e) => this.setState({
                            author: e.target.value
                          })} placeholder="Author"
                          type="text" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 mt-2 mb-4  ">
                        <h2 className="discription-headings pl-2 d-block">Edition</h2>
                        <input required className="sell-input w-100 d-block"
                          value={this.state.edition}
                          onChange={(e) => this.setState({
                            edition: e.target.value
                          })}
                          placeholder="Edition"
                          type="number" /></div>
                      <div className="col-sm-6 mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">University</h2>

                        <input required className="sell-input d-block w-100"
                          value={this.state.university}
                          onChange={(e) => this.setState({
                            university: e.target.value
                          })}
                          placeholder="University"
                          type="text" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">Quantity</h2>
                        <input required className="sell-input d-block w-100"
                          value={this.state.quantity}
                          onChange={(e) => this.setState({
                            quantity: e.target.value
                          })}
                          placeholder="Quantity"
                          type="number" />
                      </div>
                      <div className="col-sm-6 mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">Price</h2>
                        <input required className="sell-input d-block w-100"
                          value={this.state.price}
                          onChange={(e) => this.setState({
                            price: e.target.value
                          })}
                          placeholder="Price"
                          type="number" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 mt-2 mb-4">
                        <span className="d-flex"><h2 className="discription-headings">
                          Description  </h2> </span>
                        <textarea required className="w-100 text-area form-control" rows="3"
                          value={this.state.description}
                          onChange={(e) => this.setState({
                            description: e.target.value
                          })}
                        ></textarea>
                      </div>
                    </div>
                    <div className="discription-content-box pt-md-5 text-left mx-auto w-100">
                      <div className="msg-btn-box d-flex  justify-content-center"><button onClick={(e) => { this.update(e) }} className="btn-lg btn update-btn  w-75 btn-success mt-3">Update</button> </div>
                    </div>
                  </form>
                </div>
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

export default Editbook;
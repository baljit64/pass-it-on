import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import axios from 'axios';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Sidebar from '../navbar/Sidebar';
import Footer from '../Landing_page/Footer';
import './Discription.css';
import * as AiIcons from 'react-icons/ai'
import Spinner from '../Landing_page/spinner'



class Editnotes extends Component {
  constructor() {
    super();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.state = {
      delete: false,
      loaded: false,
      errmsg: '',
      topic: '',
      author: '',
      description: '',
      price: '',
      no_of_pages: '',
      _id: '',
      images: [],
      loaderror: '',
      imgcount: '',
      success: false
    }
  }



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

        let imgcount = res.data.result[0].images.length
        for (let i = 0; i < imgcount; i++) {
          this.state.images.push(res.data.result[0].images[i])
        }
        this.setState({
          imgcount: imgcount,
          reqimg: 5 - imgcount,
          topic: res.data.result[0].topic,
          author: res.data.result[0].author,
          description: res.data.result[0].description,
          price: res.data.result[0].price,
          no_of_pages: res.data.result[0].no_of_pages,
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
    document.querySelector(".update-btn").innerHTML = "Updating..";
    let data = new FormData;
    data.append("topic", this.state.topic)
    data.append("author", this.state.author)

    data.append("no_of_pages", this.state.no_of_pages)
    data.append("price", this.state.price)
    data.append("description", this.state.description)
    data.append("detail_id", this.state._id)
    console.log(data)
    axios.post('/edit-Imagedetail1', data).then((res => {
      if (res.data) {

        if (res.data.message === "Your Notes data is sucessfully updated") {
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
    let img = this.state.reqimg;
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
              <h1 className="item-name">Edit Notes</h1>
              {error}
              <div className="row">

                <div className="col-md-5 ">




                  <div className="img-box mx-auto">

                    <OwlCarousel items={1} margin={0} autoplay={true} >
                      {this.state.images.map((item, i) =>
                        <div key={i}>
                          <img src={item} className="discription-img w-100" alt="book images" />
                          <div className="del-edit-icon" key={i}>

                            <span onClick={(key = { i }) => {
                              this.state.imgcount === 1 ? this.delmsg() :
                                this.delimg(i)
                            }}>
                              <AiIcons.AiFillDelete className="" /> </span></div>
                        </div>


                      )
                      }
                    </OwlCarousel >

                  </div>

                  {this.state.reqimg > 0 ?
                    <div className="Upload-img-btn-box text-center w-75 mx-auto pb-3 mr-3">

                      <label className="btn-lg upload-img-label btn btn-upload w-75">+ Add Image {this.state.imgcount}/5
                        <input multiple accept=".png,.jpg"
                          onChange={(e) => {
                            e.target.files.length > this.state.reqimg ? this.show() :
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
                        <h2 className="discription-headings pl-2 d-block">Topic </h2>
                        <input className="sell-input w-100 d-block" required placeholder="Topic"
                          value={this.state.topic}
                          onChange={(e) => this.setState({

                            topic: e.target.value

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
                      <div className="col-sm-6 mt-2 mb-4">
                        <h2 className="discription-headings pl-2 d-block">Pages</h2>
                        <input required className="sell-input d-block w-100"
                          value={this.state.no_of_pages}
                          onChange={(e) => this.setState({

                            no_of_pages: e.target.value

                          })}
                          placeholder="Pages"
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

export default Editnotes;
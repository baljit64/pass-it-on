import React, { Component } from 'react'
import './Cards.css'
import { Link } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import axios from 'axios';
import Sidebar from '../navbar/Sidebar'
// import Footer from '../Landing_page/Footer'
import img from '../../images/success.jpg'
import Plus from '../Landing_page/Plus'
import Spinner from '../Landing_page/spinner'
export default class Myuploads extends Component {
  constructor() {
    super();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.state = {
      loaded: false,
      deleted: false,
      books: [],
      ppt: [],
      notes: [],
      stationary: [],
      err: '',
      nodata: false

    }

  }
  total = 0;


  componentDidMount() {
    this.setState({
      err: ''

    })
    this.api()
  }
  api() {

    this.setState({
      books: [],
      ppt: [],
      stationary: [],
      notes: []

    })

    axios.get('get_Myupload_detail').then((res => {

      if (res.data.res) {
        const total = res.data.res.length;

        this.total = total
        for (let i = 0; i < total; i++) {
          if (res.data.res[i].edition) {
            this.state.books.push(res.data.res[i])
          }

          else if (res.data.res[i].no_of_slides) {
            this.state.ppt.push(res.data.res[i])
          }
          else if (res.data.res[i].no_of_pages) {
            this.state.notes.push(res.data.res[i])
          }
          else {
            this.state.stationary.push(res.data.res[i])

          }
        }

        this.setState({
          deleted: false,
          loaded: true
        })
      }

    })).
      catch(err => {
        if (err) {
          this.setState({
            err: err.message
          })
        }
      })
  }
  delbook = (id, i) => {
    const del_id = {
      details_id: id
    }
    this.total = this.total - 1;
    var c = document.getElementsByClassName('b books-card')[i]
    c.classList.add('d-none');
    axios.post('del_Myupload-detail', del_id).then((res => {
      if (res.data.message === "Your upload is sucessfully deleted!") {

      }
    })).catch(err => {
      alert(err.message)
    })
    if (this.total === 0) {
      this.setState({
        nodata: true
      })
    }
  }
  delppt = (id, i) => {
    const del_id = {
      details_id: id
    }
    this.total = this.total - 1;
    var c = document.getElementsByClassName('p books-card')[i]
    c.classList.add('d-none');
    axios.post('del_Myupload-detail', del_id).then((res => {
      if (res.data.message === "Your upload is sucessfully deleted!") {

      }
    })).catch(err => {
      alert(err.message)
    })
    if (this.total === 0) {
      this.setState({
        nodata: true
      })
    }
  }
  delnote = (id, i) => {
    const del_id = {
      details_id: id
    }
    this.total = this.total - 1;
    var c = document.getElementsByClassName('n books-card')[i]
    c.classList.add('d-none');
    axios.post('del_Myupload-detail', del_id).then((res => {
      if (res.data.message === "Your upload is sucessfully deleted!") {

      }

    })).catch(err => {
      alert(err.message)
    })
    if (this.total === 0) {
      this.setState({
        nodata: true
      })
    }
  }
  delstationary = (id, i) => {
    const del_id = {
      details_id: id
    }
    this.total = this.total - 1;
    var c = document.getElementsByClassName('s books-card')[i]
    c.classList.add('d-none');
    axios.post('del_Myupload-detail', del_id).then((res => {
      if (res.data.message === "Your upload is sucessfully deleted!") {

      }
    })).catch(err => {
      alert(err.message)
    })
    if (this.total === 0) {
      this.setState({
        nodata: true
      })
    }
  }




  render() {

    if (this.state.deleted) {
      return (
        <div className="height-100vh d-flex">
          <div className="col-sm-12 w-100 mx-auto">
            <div className="bg-light success-popup">
              <img className="success-img" src={img} />
              <h3 className="upload-msg text-muted py-2">Your item successfully Deleted</h3>
            </div>
          </div>
        </div>
      )
    }
    if (this.state.err) {
      return (
        <div className="container">
          <div className="height-400">
            <h1 className="text-dark" >{this.state.err} <br /><br />
              Refresh Page..</h1>
          </div>
        </div>
      )
    }
    if (this.state.nodata) {
      return (
        <div className="wrapper" >
          <Sidebar />
          <Plus />
          <div className="height-400">
            <h1>There is no data in your Uploads..</h1>
          </div>
        </div>
      )
    }
    if (this.state.loaded && this.total > 0) {
      return (
        <div className="wrapper">
          <Sidebar />
          {/* <Plus /> */}
          <div className='container-fluid'>
            <div className="heading-mt"></div>
            {this.total > 0 ?
              <div className="featured-header px-5">
                <div className="row">
                  <div className="feaured-books-heading-box mt-0 py-1 w-100 px-1 col-sm-12 d-flex justify-content-betwen place-items-center">
                    <div> <h3 className="d-flex mt-3 justify-content-betwen place-items-center">
                      <span className="brand-color "> My Uploads</span>
                    </h3></div>
                  </div>
                </div>
              </div> : ""
            }
            <div className="container  pt-0 pb-5">

              <div className="books-outer-box pt-0">
                <div className={this.total > 0 ? "cards-body" : ""}>
                  {this.state.books.length > 0 ?
                    this.state.books.map((item, i) =>
                      <div key={i} className="b books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="Book-Image" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link to={'/editbook/' + item._id}
                            className="del-btn" >Edit</Link>
                        </div>
                        <div className="dell-icon" onClick={() => this.delbook(item._id, i)}><AiIcons.AiFillDelete className="wish-icon" /> </div>
                        <div className="featured-card-content pt-2 text-left">
                          <span className="line-1 d-flex justify-content-start text-left m-2 w-100 "><h3 className="width-40 text-captilize ">Title</h3> <h3 className="text-muted text-captilize text-left">: {item.title}</h3> </span>
                          <span className="line-1 d-flex justify-content-start w-100 m-2"><h3 className="width-40 text-captilize ">Author</h3> <h3 className="text-muted text-captilize text-left">: {item.author}</h3> </span>
                          <span className="line-1 d-flex justify-content-start w-100 m-2"><h3 className="width-40 text-captilize ">Edition</h3> <h3 className="text-muted text-captilize text-left ">: {item.edition}</h3> </span>
                          <span className="line-1 d-flex justify-content-start w-100 m-2"><h3 className="width-40 text-captilize ">Quantity</h3> <h3 className="text-muted text-captilize text-left ">: {item.quantity}</h3> </span>


                        </div>
                      </div>

                    ) : ""
                  }
                  {/* ppt */}
                  {this.state.ppt.length > 0 ?
                    this.state.ppt.map((item, i) =>
                      <div key={i} className="p books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">

                          <Link to={'/editppt/' + item._id}
                            className="del-btn" >Edit</Link>
                        </div>
                        <div className="dell-icon" onClick={() => this.delppt(item._id, i)}><AiIcons.AiFillDelete className="wish-icon" /> </div>
                        <div className="featured-card-content pt-2 text-left">
                          <span className="d-flex justify-content-start text-left m-2 w-100 "><h3 className="width-40 text-captilize ">Topic </h3> <h3 className="text-muted text-captilize text-left">: {item.topic}</h3> </span>
                          <span className="d-flex justify-content-start text-left m-2 w-100 "><h3 className="width-40 text-captilize">Author </h3> <h3 className="text-muted text-captilize text-left  ">: {item.author}</h3> </span>
                          <span className="d-flex justify-content-start text-left m-2 w-100 "><h3 className="width-40 text-captilize ">Price </h3> <h3 className="text-muted text-captilize text-left  ">: {item.price}</h3> </span>
                          <span className="d-flex justify-content-start text-left m-2 w-100 "><h3 className="width-40 text-captilize ">Pages</h3> <h3 className="text-muted text-captilize text-left  ">: {item.no_of_slides}</h3> </span>

                        </div>
                      </div>
                    ) : ""
                  }
                  {/* notes */}
                  {this.state.notes.length > 0 ?
                    this.state.notes.map((item, i) =>
                      <div key={i} className="n books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link to={'/editnotes/' + item._id}
                            className="del-btn" >Edit</Link>
                        </div>
                        <div className="dell-icon" onClick={() => this.delnote(item._id, i)}><AiIcons.AiFillDelete className="wish-icon" /> </div>
                        <div className="featured-card-content pt-2 text-left">
                          <span className="d-flex justify-content-start text-left m-2 w-100 "><h3 className="width-40 text-captilize ">Topic </h3> <h3 className="text-muted text-captilize text-left">: {item.topic}</h3> </span>
                          <span className="d-flex justify-content-start text-left m-2 w-100 "><h3 className="width-40 text-captilize">Author </h3> <h3 className="text-muted text-captilize text-left  ">: {item.author}</h3> </span>
                          <span className="d-flex justify-content-start text-left m-2 w-100 "><h3 className="width-40 text-captilize ">Price </h3> <h3 className="text-muted text-captilize text-left  ">: {item.price}</h3> </span>
                          <span className="d-flex justify-content-start text-left m-2 w-100 "><h3 className="width-40 text-captilize ">Pages</h3> <h3 className="text-muted text-captilize text-left  ">: {item.no_of_pages}</h3> </span>

                        </div>
                      </div>
                    ) : ""
                  }
                  {/* stationary */}
                  {this.state.stationary.length > 0 ?
                    this.state.stationary.map((item, i) =>
                      <div key={i} className="s books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link to={'/editstationary/' + item._id}
                            className="del-btn" >Edit</Link>
                        </div>
                        <div className="dell-icon" onClick={() => this.delstationary(item._id, i)}><AiIcons.AiFillDelete className="wish-icon" /> </div>
                        <div className="featured-card-content p-5 text-left">
                          <span className="d-flex justify-content-start text-left m-2 w-100"><h3 className="width-40 text-captilize ">Name</h3> <h3 className="text-muted text-captilize text-left ">: {item.item_name}</h3> </span>
                          <span className="d-flex justify-content-start text-left m-2 w-100"><h3 className="width-40 text-captilize ">Quantity</h3> <h3 className="text-muted text-captilize text-left ">: {item.quantity}</h3> </span>
                          <span className="d-flex justify-content-start text-left m-2 w-100"><h3 className="width-40 text-captilize">Price </h3> <h3 className="text-muted text-captilize text-left ">: {item.price}</h3> </span>
                        </div>
                      </div>
                    ) : ""
                  }
                </div></div></div>
          </div>
          {/* <Footer /> */}
        </div>
      )
    }
    if (this.state.loaded && !this.state.books.length > 0 && !this.state.ppt.length > 0 && !this.state.stationary.length > 0) {
      return (
        <div className="wrapper">
          <Sidebar />
          <div className="container">
            <div className="height-400">
              <h1 className="text-dark" >There is no item in your uploads</h1>
            </div>
          </div>
          <Plus />
          {/* <Footer /> */}
        </div>
      )
    }
    else {
      return (
        <Spinner />

      )
    }
  }
}

import React, { Component } from 'react';
import Sidebar from '../navbar/Sidebar'
import Footer from '../Landing_page/Footer'
import axios from 'axios';
import { Link } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai';
import Spinner from '../Landing_page/spinner'

export default class Wishlist extends Component {

  constructor() {
    super();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.state = {
      loaded: false,
      books: [],
      ppt: [],
      notes: [],
      stationary: [],
      data: '',
      loaderr: ''
    }
    this.book = this.book.bind(this);
  }
  total = 0;
  componentDidMount() {
    axios.get('/get-favorite').then(res => {
      if (res.data.message.length > 0) {
        const total = res.data.message.length;
        this.total = total
        for (let i = 0; i < total; i++) {
          if (res.data.message[i].like.edition) {
            this.state.books.push(res.data.message[i].like)
          }
          else if (res.data.message[i].like.no_of_slides) {
            this.state.ppt.push(res.data.message[i].like)
          }
          else if (res.data.message[i].like.no_of_pages) {
            this.state.notes.push(res.data.message[i].like)
          }
          else {
            this.state.stationary.push(res.data.message[i].like)
          }
          if (this.state.books.length > 0 || this.state.ppt.length > 0
            || this.state.notes.length > 0 || this.state.stationary.length > 0) {
            this.setState({
              data: 1,
            })
          }
          this.setState({
            loaded: true
          })
        }
      }
      else {
        this.setState({
          loaded: true
        })
      }

    }).catch(err => {
      if (err) {
        this.setState({
          loaderr: err.message
        })
      }
    })
  }
  book = (id, index) => {
    const data = {
      detail_id: id
    }
    var c = document.getElementsByClassName('book remove-to-cart')[index];
    c.style.backgroundColor = '#fff';
    c.getElementsByClassName("wish-icon")[0].style.color = '#000';
    axios.post('/remove-favorite', data)
    document.getElementsByClassName('book books-card')[index].classList.add("d-none");
    this.total = this.total - 1;
    if (this.total === 0) {
      this.setState({
        data: 0
      })
    }
  }
  ppt(id, index) {
    const data = {
      detail_id: id
    }
    var c = document.getElementsByClassName('ppt remove-to-cart')[index]
    c.style.backgroundColor = '#fff';
    c.getElementsByClassName("wish-icon")[0].style.color = '#000';
    axios.post('/remove-favorite', data)
    document.getElementsByClassName('ppt books-card')[index].classList.add("d-none");
    this.total = this.total - 1;
    if (this.total === 0) {
      this.setState({
        data: 0
      })
    }

  }
  notes(id, index) {
    const data = {
      detail_id: id
    }
    var c = document.getElementsByClassName('notes remove-to-cart')[index]
    c.style.backgroundColor = '#fff';
    c.getElementsByClassName("wish-icon")[0].style.color = '#000';
    axios.post('/remove-favorite', data)
    document.getElementsByClassName('notes books-card')[index].classList.add("d-none");
    this.total = this.total - 1;
    if (this.total === 0) {
      this.setState({
        data: 0
      })
    }
  }
  stationary(id, index) {
    const data = {
      detail_id: id
    }
    var c = document.getElementsByClassName('stationary remove-to-cart')[index]
    c.style.backgroundColor = '#fff';
    c.getElementsByClassName("wish-icon")[0].style.color = '#000';
    axios.post('/remove-favorite', data)
    document.getElementsByClassName('stationary books-card')[index].classList.add("d-none");
    this.total = this.total - 1;
    if (this.total === 0) {
      this.setState({
        data: 0
      })
    }
  }
  render() {
    if (this.state.loaderr) {
      return (
        <div className="height-400 alert alert-danger">
          <h1>{this.state.loaderr}</h1>
          <h3>Refresh Page..</h3>
        </div>
      )
    }
    if (this.state.loaded) {
      return (
        <div>
          <Sidebar />
          <div className='container-fluid'>
            <div className="heading-mt pt-2"></div>
            {
              this.state.data > 0 ?
                <div className="featured-header px-5">
                  <div className="row">
                    <div className="feaured-books-heading-box mt-0 py-1 w-100 px-1 col-sm-12 d-flex justify-content-betwen place-items-center">
                      <div> <h3 className="feaured-items-heading my-2"> <span className="brand-color">My</span> Favourites
                        <span></span>
                      </h3></div>
                    </div>
                  </div>
                </div>
                : ""
            }
            <div className="container  pt-0">

              <div className="books-outer-box pt-0">
                <div className="cards-body">
                  {this.state.books.length > 0 ?
                    this.state.books.map((item, i) =>
                      <div key={i} className="book books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>

                        <div className="book remove-to-cart"
                          onClick={() => { this.book(item._id, i) }}
                        ><AiIcons.AiOutlineHeart className="wish-icon" /> </div>
                        <div className="read-more-btn">
                          <Link style={{ textDecoration: 'none' }} to={"/bookdis/" + item._id}>read more</Link>
                        </div>
                        <div className="featured-card-content pt-2 text-left">
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Title </h3> <h3 className="text-muted text-captilize">: {item.title}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Author </h3> <h3 className="text-muted text-captilize  ">: {item.author}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Edition </h3> <h3 className="text-muted text-captilize">: {item.edition}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Quantity</h3> <h3 className="text-muted text-captilize">: {item.quantity}</h3> </span>


                        </div>
                      </div>
                    )
                    : ""

                  }
                  {this.state.ppt.length > 0 ?
                    this.state.ppt.map((item, i) =>
                      <div key={i} className="ppt books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link style={{ textDecoration: 'none' }} to={"/pptdis/" + item._id}>read more</Link>
                        </div>
                        <div className="ppt remove-to-cart"
                          onClick={() => { this.ppt(item._id, i) }}
                        ><AiIcons.AiOutlineHeart className="wish-icon" /> </div>
                        <div className="featured-card-content pt-2 text-left">
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Topic </h3> <h3 className="text-muted text-captilize">: {item.topic}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Author </h3> <h3 className="text-muted text-captilize  ">: {item.author}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Price </h3> <h3 className="text-muted text-captilize">: ₹ {item.price}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Slides</h3> <h3 className="text-muted text-captilize">: {item.no_of_slides}</h3> </span>


                        </div>
                      </div>

                    )
                    : ""

                  }
                  {
                    this.state.notes.length > 0 ?
                      this.state.notes.map((item, i) =>
                        <div key={i} className="notes books-card">
                          <div className="card-circle">
                            <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                            </div>
                          </div>
                          <div className="read-more-btn">
                            <Link style={{ textDecoration: 'none' }} to={"/notesdis/" + item._id}>read more</Link>
                          </div>
                          <div className="notes remove-to-cart"
                            onClick={() => { this.notes(item._id, i) }}
                          ><AiIcons.AiOutlineHeart className="wish-icon" /></div>
                          <div className="featured-card-content pt-2 text-left">
                            <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Topic </h3> <h3 className="text-muted text-captilize">: {item.topic}</h3> </span>
                            <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Author </h3> <h3 className="text-muted text-captilize  ">: {item.author}</h3> </span>
                            <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Price </h3> <h3 className="text-muted text-captilize">: ₹ {item.price}</h3> </span>
                            <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Pages</h3> <h3 className="text-muted text-captilize">: {item.no_of_pages}</h3> </span>


                          </div>
                        </div>

                      )
                      : ""
                  }
                  {this.state.stationary.length > 0 ?
                    this.state.stationary.map((item, i) =>
                      <div key={i} className="stationary books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link style={{ textDecoration: 'none' }} to={"/stationarydis/" + item._id}>read more</Link>
                        </div>
                        <div className="stationary remove-to-cart"
                          onClick={() => { this.stationary(item._id, i) }}
                        ><AiIcons.AiOutlineHeart className="wish-icon" /> </div>
                        <div className="featured-card-content pt-2 text-left">
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Name </h3> <h3 className="text-muted text-captilize">:{item.item_name}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Quantity </h3> <h3 className="text-muted text-captilize  ">:{item.quantity}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Price </h3> <h3 className="text-muted text-captilize">:{item.price}</h3> </span>



                        </div>
                      </div>

                    )
                    : ""

                  }

                </div>
              </div>
            </div>


            {
              !this.state.data ?
                <div className="container height-400">
                  <h1>Your Favourite List is Empty..</h1>
                </div>
                : ""
            }

          </div>
          <Footer />
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

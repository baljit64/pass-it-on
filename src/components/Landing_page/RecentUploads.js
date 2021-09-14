import React, { Component } from 'react'
import * as AiIcons from 'react-icons/ai';
import Spinner from '../Landing_page/spinner'
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class RecentUploads extends Component {
  constructor() {
    super();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.state = {
      books: [],
      ppt: [],
      stationary: [],
      notes: [],
      loaderr: '',
      loaded: false,
      total: 0
    }
  }
  componentDidMount() {
    axios.get('recently-added').then(res => {
      // console.log(res.data.Data[0])
      if (res.data.Data) {
        const total = res.data.Data.length;
        this.state.total = total
        for (let i = 0; i < total; i++) {
          if (res.data.Data[i].edition) {
            this.state.books.push(res.data.Data[i])
          }
          else if (res.data.Data[i].no_of_slides) {
            this.state.ppt.push(res.data.Data[i])
          }
          else if (res.data.Data[i].no_of_pages) {
            this.state.notes.push(res.data.Data[i])
          }
          else {
            this.state.stationary.push(res.data.Data[i])
          }
        }
        this.setState({
          loaded: true
        })
      }

    }).catch(err => {
      console.log(err)
    })
  }

  render() {

    if (this.state.loaderr) {
      return (
        <div className="height-400 flex-column">
          <h3>{this.state.loaderr}</h3>
          <p className="d-block">Refresh Page</p>
        </div>
      )
    }
    else {
      return (
        <div className="recent-box-wrap">
          <div className="container">

            <div className="row ">
              <div className="py-1 w-100 px-1 col-sm-12 ">
                <div>  <h3 className="recent-heading">Recent Uploads</h3>

                </div>

              </div>
            </div>



            <div className="books-outer-box  pt-0">
              <div className={this.state.total > 0 ? "cards-body " : ""}>
                {
                  this.state.books.length > 0 ?
                    this.state.books.map((item, i) =>
                      <div key={i} className="books-card  ">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link style={{ textDecoration: 'none' }} to={"/bookdis/" + item._id}>read more</Link>
                        </div>
                        {/* <div className={item.favorite === 0 ? "ab add-to-cart" : "ab remove-to-cart"} onClick={() => { this.addtofav(item._id, i) }} ><AiIcons.AiOutlineHeart className="wish-icon" /> </div> */}
                        <div className="featured-card-content p-5 text-left slideanim">
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Title </h3> <h3 className="text-muted text-captilize">: {item.title}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Author </h3> <h3 className="text-muted text-captilize  ">: {item.author}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Edition </h3> <h3 className="text-muted text-captilize">: {item.edition}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Quantity</h3> <h3 className="text-muted text-captilize">: {item.quantity}</h3> </span>
                        </div>
                      </div>
                    )
                    : ""

                }

                {
                  this.state.notes.length > 0 ?
                    this.state.notes.map((item, i) =>
                      <div key={i} className="books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link style={{ textDecoration: 'none' }} to={"/notesdis/" + item._id}>read more</Link>
                        </div>
                        {/* <div className={item.favorite === 0 ? "an add-to-cart" : "an remove-to-cart"} onClick={() => { this.addtofav(item._id, i) }}><AiIcons.AiOutlineHeart className="wish-icon" /></div> */}
                        <div className="featured-card-content p-5 text-left slideanim">
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Topic </h3> <h3 className="text-muted text-captilize">: {item.topic}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Author </h3> <h3 className="text-muted text-captilize  ">: {item.author}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Price </h3> <h3 className="text-muted text-captilize">: ₹ {item.price}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Pages</h3> <h3 className="text-muted text-captilize">: {item.no_of_pages}</h3> </span>


                        </div>
                      </div>

                    )
                    : ""

                }
                {
                  this.state.ppt.length > 0 ?
                    this.state.ppt.map((item, i) =>
                      <div key={i} className="books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link style={{ textDecoration: 'none' }} to={"/pptdis/" + item._id}>read more</Link>
                        </div>
                        {/* <div className={item.favorite === 0 ? "ap add-to-cart" : "ap remove-to-cart"} onClick={() => { this.addtofav(item._id, i) }}><AiIcons.AiOutlineHeart className="wish-icon" /> </div> */}
                        <div className="featured-card-content p-5 text-left slideanim">
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
                  this.state.stationary.length > 0 ?
                    this.state.stationary.map((item, i) =>
                      <div key={i} className="books-card ">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link style={{ textDecoration: 'none' }} to={"/stationarydis/" + item._id}>read more</Link>
                        </div>
                        {/* <div className={item.favorite === 0 ? "as add-to-cart" : "as remove-to-cart"} onClick={() => { this.addtofav(item._id, i) }}><AiIcons.AiOutlineHeart className="wish-icon" /> </div> */}
                        <div className="featured-card-content p-5 text-left slideanim">
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
        </div>
      )
    }

  }
}

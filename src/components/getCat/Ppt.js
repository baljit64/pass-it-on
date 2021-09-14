import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../navbar/Sidebar';
// import Footer from '../Landing_page/Footer';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import './Cards.css';
import Spinner from '../Landing_page/spinner'

export default class Ppt extends Component {


  constructor(props) {
    super(props);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.state = {
      loaded: false,
      ppts: [],
      loaderr: ''
    }

  }

  api() {
    this.setState({
      loaded: false,
      ppts: []
    })
    const id = this.props.match.params.id;
    const localdata = localStorage.getItem('data')
    const getdata = JSON.parse(localdata)
    const pptid = getdata.cat.pptid;
    axios.get('get_detail/' + pptid + "/" + id).then(res => {
      const totalppts = res.data.data[0].book.length;
      for (let i = 0; i < totalppts; i++) {
        this.state.ppts.push(res.data.data[0].book[i])
      }
      this.setState({
        loaded: true
      })
    }
    ).catch(err => {
      if (err) {
        this.setState({
          loaderr: err.message
        })
      }
    })
  }
  componentDidMount() {
    this.api()
  }
  componentDidUpdate(pP, pS, sS) {
    if (pP.match.params.id !== this.props.match.params.id) {
      this.api()
    }
    else {
      return false
    }

  }
  addtofav(id, index) {
    const like = {
      detail_id: id,
      like_status: 1
    };
    const dislike = {
      detail_id: id
    }
    var c = document.getElementsByClassName('p')[index];
    if (c.classList.contains("add-to-cart")) {

      c.classList.remove('add-to-cart');
      c.classList.add('remove-to-cart');
      axios.post('/favorite', like);
    }
    else {
      c.classList.remove('remove-to-cart');
      c.classList.add('add-to-cart');
      axios.post('/remove-favorite', dislike);
    }
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
    if (this.state.loaded) {

      return (
        <div className="wrapper">
          <Sidebar />
          {this.state.ppts.length > 0 ?



            <div className="featured-header px-5">
              <div className="row">
                <div className="feaured-books-heading-box  py-1 w-100 px-1 col-sm-12 d-flex justify-content-betwen place-items-center">
                  <div> <h3 className="d-flex  justify-content-betwen place-items-center my-2"> <span className="brand-color "><Link style={{ textDecoration: 'none' }} to="/allppt">Ppt </Link> <BsIcons.BsChevronDoubleRight /> {this.props.match.params.name}</span>

                  </h3></div>
                </div>
              </div>
            </div> : ""
          }
          <div className="container ">

            <div className="books-outer-box pt-1">
              <div className={this.state.ppts.length > 0 ? "cards-body" : ""}>
                {
                  this.state.ppts.length > 0 ?
                    this.state.ppts.map((item, i) =>
                      <div key={i} className="books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link style={{ textDecoration: 'none' }} to={"/pptdis/" + item._id}>read more</Link>
                        </div>
                        <div className={item.favorite === 0 ? "p add-to-cart" : "p remove-to-cart"} onClick={() => { this.addtofav(item._id, i) }}><AiIcons.AiOutlineHeart className="wish-icon" /> </div>
                        <div className="featured-card-content pt-2 text-left">
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Topic </h3> <h3 className="text-muted text-captilize">: {item.topic}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Author </h3> <h3 className="text-muted text-captilize  ">: {item.author}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Price </h3> <h3 className="text-muted text-captilize">: ₹  {item.price}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Slides</h3> <h3 className="text-muted text-captilize">: {item.no_of_slides}</h3> </span>


                        </div>
                      </div>
                    )
                    : <div className="height-400">
                      <h1 className="text-dark" > Sorry.... No Items Available in this category..</h1>
                    </div>
                }




              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      );
    }
    else {
      return <Spinner />
    }
  }
}


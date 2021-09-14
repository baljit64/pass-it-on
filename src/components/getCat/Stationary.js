import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Sidebar from '../navbar/Sidebar';
// import Footer from '../Landing_page/Footer';
import * as AiIcons from 'react-icons/ai';
import './Cards.css';
import axios from 'axios'
import * as BsIcons from 'react-icons/bs';
import Spinner from '../Landing_page/spinner'


class Stationary extends Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.state = {
      loaded: false,
      stationary: [],
      loaderr: ''
    }

  }

  api() {
    this.setState({
      loaded: false,
      stationary: []
    })
    const id = this.props.match.params.id;
    const localdata = localStorage.getItem('data')
    const getdata = JSON.parse(localdata)
    const Sid = getdata.cat.stationaryid;
    axios.get('get_detail/' + Sid + "/" + id).then(res => {

      const total = res.data.data[0].book.length;
      for (let i = 0; i < total; i++) {
        this.state.stationary.push(res.data.data[0].book[i])
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
    var c = document.getElementsByClassName('s')[index];
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
          {this.state.stationary.length > 0 ?



            <div className="featured-header px-5">
              <div className="row">
                <div className="feaured-books-heading-box  py-1 w-100 px-1 col-sm-12 d-flex justify-content-betwen place-items-center">
                  <div> <h3 className="d-flex  justify-content-betwen place-items-center my-2"> <span className="brand-color "><Link style={{ textDecoration: 'none' }} to="/allstationary">Stationary </Link> <BsIcons.BsChevronDoubleRight /> {this.props.match.params.name}</span>

                  </h3></div>

                </div>
              </div>
            </div> : ""
          }
          <div className="container ">

            <div className="books-outer-box pt-0">
              <div className={this.state.stationary.length > 0 ? "cards-body" : ""}>
                {
                  this.state.stationary.length > 0 ?
                    this.state.stationary.map((item, i) =>
                      <div key={i} className="books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link style={{ textDecoration: 'none' }} to={"/stationarydis/" + item._id}>read more</Link>
                        </div>
                        <div className={item.favorite === 0 ? "s add-to-cart" : "s remove-to-cart"} onClick={() => { this.addtofav(item._id, i) }}><AiIcons.AiOutlineHeart className="wish-icon" /> </div>
                        <div className="featured-card-content p-5  text-left">
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Name </h3> <h3 className="text-muted text-captilize">:{item.item_name}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Quantity </h3> <h3 className="text-muted text-captilize  ">: {item.quantity}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Price </h3> <h3 className="text-muted text-captilize">: ₹ {item.price}</h3> </span>
                          {/* <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">No. Of Pages</h3> <h3 className="text-muted text-captilize">:{item.No_of_Pages}</h3> </span> */}


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

export default Stationary;
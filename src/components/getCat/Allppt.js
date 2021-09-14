import React, { Component } from 'react'
import Sidebar from '../navbar/Sidebar';
// import Footer from '../Landing_page/Footer';
import * as AiIcons from 'react-icons/ai';
import './Cards.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../Landing_page/spinner'
export default class Allppt extends Component {

  constructor(props) {
    super(props);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.state = {
      loaded: false,
      loaderr: ''
    }

  }
  ppt = []
  api() {
    this.setState({
      loaded: false

    })
    const localdata = localStorage.getItem('data')
    const getdata = JSON.parse(localdata)
    const id = getdata.cat.notesid;
    const pptsub = getdata.pptSubcat;


    let engg = axios.get('get_detail/' + id + "/" + pptsub.engg);
    let management = axios.get('get_detail/' + id + "/" + pptsub.management);
    let pharmacy = axios.get('get_detail/' + id + "/" + pptsub.pharmacy);
    let law = axios.get('get_detail/' + id + "/" + pptsub.law);
    let arts = axios.get('get_detail/' + id + "/" + pptsub.arts);
    let commerce = axios.get('get_detail/' + id + "/" + pptsub.commerce);
    let sc = axios.get('get_detail/' + id + "/" + pptsub.sc);
    let ft = axios.get('get_detail/' + id + "/" + pptsub.ft);
    let nursing = axios.get('get_detail/' + id + "/" + pptsub.nursing);

    axios.all([engg, management, pharmacy, law, arts, commerce, sc, ft, nursing]).then(axios.spread((...responses) => {
      const totalEngg = responses[0].data.data[0].book.length
      const totalmanagement = responses[1].data.data[0].book.length
      const totalpharmacy = responses[2].data.data[0].book.length
      const totallaw = responses[3].data.data[0].book.length
      const totalarts = responses[4].data.data[0].book.length
      const totalcommerce = responses[5].data.data[0].book.length
      const totalsc = responses[6].data.data[0].book.length
      const totalft = responses[7].data.data[0].book.length
      const totalnursing = responses[8].data.data[0].book.length
      if (totalEngg > 0) {
        for (let i = 0; i < totalEngg; i++) {
          this.ppt.push(responses[0].data.data[0].book[i])
        }
      }
      if (totalmanagement > 0) {
        for (let i = 0; i < totalmanagement; i++) {
          this.ppt.push(responses[1].data.data[0].book[i])
        }
      }
      if (totalpharmacy > 0) {
        for (let i = 0; i < totalpharmacy; i++) {
          this.ppt.push(responses[2].data.data[0].book[i])
        }
      }
      if (totallaw > 0) {
        for (let i = 0; i < totallaw; i++) {
          this.ppt.push(responses[3].data.data[0].book[i])
        }
      }
      if (totalarts > 0) {
        for (let i = 0; i < totalarts; i++) {
          this.ppt.push(responses[4].data.data[0].book[i])
        }
      }
      if (totalcommerce > 0) {
        for (let i = 0; i < totalcommerce; i++) {
          this.ppt.push(responses[5].data.data[0].book[i])
        }
      }
      if (totalsc > 0) {
        for (let i = 0; i < totalsc; i++) {
          this.ppt.push(responses[6].data.data[0].book[i])
        }
      }
      if (totalft > 0) {
        for (let i = 0; i < totalft; i++) {
          this.ppt.push(responses[7].data.data[0].book[i])
        }
      }
      if (totalnursing > 0) {
        for (let i = 0; i < totalnursing; i++) {
          this.ppt.push(responses[8].data.data[0].book[i])
        }
      }
      this.setState({
        loaded: true
      })
    })).catch(errors => {
      if (errors) {
        this.setState({
          loaderr: errors.message
        })
      }
    })
  }
  componentDidMount() {
    this.api()
  }
  addtofav(id, index) {
    const like = {
      detail_id: id,
      like_status: 1
    };
    const dislike = {
      detail_id: id
    }
    var c = document.getElementsByClassName('ap')[index];
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
          <div className='container-fluid' >
            {this.ppt.length > 0 ?
              <div className="featured-header px-5">
                <div className="row">
                  <div className="feaured-books-heading-box  py-1 w-100 px-1 col-sm-12 d-flex justify-content-betwen place-items-center">
                    <div> <h3 className="d-flex  justify-content-betwen place-items-center my-2">
                      <span className="brand-color "> All PPT</span>
                    </h3></div>
                  </div>
                </div>
              </div> : ""
            }
          </div>
          <div className="container pt-3">
            <div className="books-outer-box pt-3">
              <div className={this.ppt.length > 0 ? "cards-body" : ""}>
                {
                  this.ppt.length > 0 ?
                    this.ppt.map((item, i) =>
                      <div key={i} className="books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link style={{ textDecoration: 'none' }} to={"/pptdis/" + item._id}>read more</Link>
                        </div>
                        <div className={item.favorite === 0 ? "ap add-to-cart" : "ap remove-to-cart"} onClick={() => { this.addtofav(item._id, i) }}><AiIcons.AiOutlineHeart className="wish-icon" /> </div>
                        <div className="featured-card-content pt-2 text-left">
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Topic </h3> <h3 className="text-muted text-captilize">: {item.topic}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Author </h3> <h3 className="text-muted text-captilize  ">: {item.author}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Price </h3> <h3 className="text-muted text-captilize">: ₹ {item.price}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Slides</h3> <h3 className="text-muted text-captilize">: {item.no_of_slides}</h3> </span>

                        </div>
                      </div>
                    )
                    :
                    <div className="height-400">
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
      return (<Spinner />)
    }
  }
}


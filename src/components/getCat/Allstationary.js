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
  list = []
  api() {
    this.setState({
      loaded: false,
      list: []
    })
    const localdata = localStorage.getItem('data')
    const getdata = JSON.parse(localdata)
    const id = getdata.cat.stationaryid;
    const subCat = getdata.stationarySubcat;

    let ac = axios.get('get_detail/' + id + "/" + subCat.ac);
    let calc = axios.get('get_detail/' + id + "/" + subCat.calc);
    let decoration = axios.get('get_detail/' + id + "/" + subCat.decoration);
    let Do = axios.get('get_detail/' + id + "/" + subCat.do);
    let electronic = axios.get('get_detail/' + id + "/" + subCat.electronic);
    let file = axios.get('get_detail/' + id + "/" + subCat.file);
    let ps = axios.get('get_detail/' + id + "/" + subCat.ps);



    axios.all([ac, calc, decoration, Do, electronic, file, ps]).then(axios.spread((...responses) => {
      const totalac = responses[0].data.data[0].book.length
      const totalcalc = responses[1].data.data[0].book.length
      const totaldecoration = responses[2].data.data[0].book.length
      const totalDo = responses[3].data.data[0].book.length
      const totalelectronic = responses[4].data.data[0].book.length
      const totalfile = responses[5].data.data[0].book.length
      const totalps = responses[6].data.data[0].book.length
      console.log(totalps)
      if (totalac > 0) {
        for (let i = 0; i < totalac; i++) {
          console.log(responses[0].data.data[0].book[i])
          this.list.push(responses[0].data.data[0].book[i])
        }
      }
      if (totalcalc > 0) {
        for (let i = 0; i < totalcalc; i++) {
          console.log(responses[1].data.data[0].book[i])
          this.list.push(responses[1].data.data[0].book[i])
        }
      }
      if (totaldecoration > 0) {
        for (let i = 0; i < totaldecoration; i++) {
          this.list.push(responses[2].data.data[0].book[i])
        }
      }
      if (totalDo > 0) {
        for (let i = 0; i < totalDo; i++) {
          this.list.push(responses[3].data.data[0].book[i])
        }
      }
      if (totalelectronic > 0) {
        for (let i = 0; i < totalelectronic; i++) {
          this.list.push(responses[4].data.data[0].book[i])
        }
      }
      if (totalfile > 0) {
        for (let i = 0; i < totalfile; i++) {
          this.list.push(responses[5].data.data[0].book[i])
        }
      }
      if (totalps > 0) {
        for (let i = 0; i < totalps; i++) {
          console.log(responses[6].data.data[0].book[i])
          this.list.push(responses[6].data.data[0].book[i])
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
    var c = document.getElementsByClassName('as')[index];
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
            {this.list.length > 0 ?
              <div className="featured-header px-5">
                <div className="row">
                  <div className="feaured-books-heading-box  py-1 w-100 px-1 col-sm-12 d-flex justify-content-betwen place-items-center">
                    <div> <h3 className="d-flex  justify-content-betwen place-items-center my-2">
                      <span className="brand-color "> All Stationary</span>
                    </h3></div>
                  </div>
                </div>
              </div> : ""
            }
          </div>
          <div className="container pt-3">

            <div className="books-outer-box pt-3">
              <div className={this.list.length > 0 ? "cards-body" : ""}>
                {
                  this.list.length > 0 ?
                    this.list.map((item, i) =>
                      <div key={i} className="books-card">
                        <div className="card-circle">
                          <div className="card-img"><img className="w-100" src={item.images[0]} alt="" />
                          </div>
                        </div>
                        <div className="read-more-btn">
                          <Link style={{ textDecoration: 'none' }} to={"/stationarydis/" + item._id}>read more</Link>
                        </div>
                        <div className={item.favorite === 0 ? "as add-to-cart" : "as remove-to-cart"} onClick={() => { this.addtofav(item._id, i) }}><AiIcons.AiOutlineHeart className="wish-icon" /> </div>
                        <div className="featured-card-content pt-2 text-left">
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Name </h3> <h3 className="text-muted text-captilize">:{item.item_name}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40">Quantity </h3> <h3 className="text-muted text-captilize  ">:{item.quantity}</h3> </span>
                          <span className="d-flex justify-content-start w-100 m-2"><h3 className=" text-captilize width-40 ">Price </h3> <h3 className="text-muted text-captilize">:{item.price}</h3> </span>
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


import React, { Component } from 'react';
import * as RiIcons from 'react-icons/ri';
import Carousel from 'react-bootstrap/Carousel'
import Sidebar from '../navbar/Sidebar';
import Footer from '../Landing_page/Footer';
import { Link } from 'react-router-dom';
import './Discription.css';
import axios from 'axios'
import Spinner from '../Landing_page/spinner';
class Notedis extends Component {
  constructor() {
    super();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    this.state = {
      myid: '',
      loaded: false
    }
  }
  images = []
  list = []
  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get('get-detail1/' + id).then(res => {

      if (res.data) {
        this.setState({
          myid: res.data.my_id
        })
        for (let i = 0; i < res.data.result[0].images.length; i++) {
          this.images.push(res.data.result[0].images[i])
        }
        this.setState({
          list: res.data.result[0],
          loaded: true
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    if (this.state.loaded) {
      return (
        <div>
          <Sidebar />
          <div className="container">
            <div className="outer-box-discription">
              <div className="row">
                <div className="col-md-5 ">


                  <h1 className="item-name">Notes Detail</h1>
                  <div className="img-box ">

                    <Carousel>
                      {this.images.map((item, i) =>
                        <Carousel.Item key={i} interval={2000}>
                          <img src={item} className="discription-img w-100" alt="book images" />
                        </Carousel.Item>)
                      }
                    </Carousel>
                  </div>

                </div>

                <div className="col-md-7 pt-md-5">

                  <div className="discription-content-box pt-md-5 text-left mx-auto w-100">
                    <span className="d-flex justify-content-start place-items-baseline"><h2 className="discription-headings">Topic </h2><h3 className="enter-data">: {this.state.list.topic}</h3>  </span>
                    <span className="d-flex justify-content-start place-items-baseline"><h2 className="discription-headings">Author  </h2><h3 className="enter-data">: {this.state.list.author}</h3>  </span>
                    <span className="d-flex"><h2 className="discription-headings">No. of Pages  </h2><h3 className="enter-data">: {this.state.list.no_of_pages}</h3> </span>
                    <span className="d-flex"><h2 className="discription-headings">Price  </h2><h3 className="enter-data"> : ???	{this.state.list.price}</h3> </span>
                    <span className="d-flex"><h2 className="discription-headings ">Description  </h2> </span>
                    <p className="product-detail ">{this.state.list.description}</p>
                    <div className="msg-btn-box d-flex text-center "><Link
                      to={"/newchat/" + this.state.myid + "/" + this.state.list.user_id} style={{ textDecoration: 'none' }} className="send-msg-btn mt-3"><RiIcons.RiChat4Fill className="mr-2" size="1.8rem" /> Send Message</Link></div>
                  </div>



                </div>
              </div>
            </div>
          </div>


          <Footer />
        </div>


      );
    }
    else {
      return <Spinner />
    }
  }
}

export default Notedis;
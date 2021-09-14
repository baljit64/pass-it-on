import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './plus.css'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import * as RiIcons from 'react-icons/ri';

import * as BsIcons from 'react-icons/bs';



export default class Plus extends Component {


  constructor() {
    super();
    this.state = {
      show: false
    }
  }
  book() {
    // alert('book');
  }

  render() {
    return (
      <div>
        <div className="">
          <div className="add-items-circle ">

            <span onClick={() => {
              this.setState({
                show: !this.state.show
              });
            }} className="sell-fixed-circle pb-2"> {this.state.show ? <AiIcons.AiOutlineClose className="pt-2" /> : "+"}</span>
            <ul className={this.state.show ? "show" : ""}>
              <li><Link onMouseOver={this.book} to={"/uploadbook"}><FaIcons.FaBook /></Link>
                <h3>Book</h3>
              </li>
              <li><Link to={"/uploadppt"}> <RiIcons.RiProjector2Fill /></Link>
                <h3>PPT</h3></li>
              <li><Link to={"/uploadnotes"}><BsIcons.BsBook /></Link>
                <h3>Note</h3></li>
              <li><Link to={"/uploadstationary"}> <FaIcons.FaPencilRuler /></Link>
                <h3>Stationary</h3></li>
            </ul>
          </div>
        </div >
      </div >
    )
  }
}

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';
import * as CgIcons from 'react-icons/cg';
import Mydp from './Mydp'

import { IconContext } from 'react-icons/lib';
import './Navbar.css'
const Logo = '/images/logo.svg';




const SidebarNav = styled.nav`
  background: #153759;
  width: 25rem;
  height:100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  overflow-y:scroll;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 9999;
  
  
`;

const SidebarWrap = styled.div`
  width: 100%;
  background:#153759;

`;

const Sidebar = () => {

  const localdata = localStorage.getItem('data');
  const id = JSON.parse(localdata)
  const [sidebar, setSidebar] = useState(false);
  const [books, setBooks] = useState(false);
  const [ppt, setPpt] = useState(false);
  const [notes, setNotes] = useState(false);
  const [stationary, setStationary] = useState(false);
  const [sell, setSell] = useState(false);
  const [account, setAccount] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  function togglebook() {
    setBooks(!books)
  }
  function toggleppt() {
    setPpt(!ppt)
  }
  function togglenotes() {
    setNotes(!notes)
  }
  function togglestationary() {
    setStationary(!stationary)
  }
  function toggleSell() {
    setSell(!sell)
  }
  function toggleAccount() {
    setAccount(!account)
  }


  return (

    <div className="navbar-box ">


      <div className="hamburger-box">  <Link to='#' className='d-lg-none menu-bars'>
        <FaIcons.FaBars className="text-dark" onClick={showSidebar} />
      </Link></div>
      <div className="navbar navbar-fixed-top w-100 py-0 px-3 d-lg-flex justify-content-lg-center place-items-lg-center  navbar-expand-lg">
        <Link className="navbar-brand mx-auto" to="/home"> <img src={Logo} className="logo" alt="Logo-img" /> </Link>
        <div className="collapse   navbar-collapse" id="navbarSupportedContent">
          <IconContext.Provider value={{ size: '1.4rem' }} >
            <ul className="navbar-nav  mx-auto">
              <li className="nav-item  dropdown animation">
                <a href="#" style={{ textDecoration: 'none' }} className="nav-link mb-0 dropdown-toggle" href="#" id="navbarDropdown" role="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <FaIcons.FaBook className="mr-1" />BOOKS

                </a>
                <div className="dropdown-menu branch-links animation" aria-labelledby="navbarDropdown">

                  <Link className="dropdown-item" to={'/books/Engineering/' + id.bookSubcat.engg} > <FaIcons.FaTools className="mr-3" />Engineering</Link>
                  <Link className="dropdown-item" to={'/books/Management/' + id.bookSubcat.management}> <FaIcons.FaUserAlt className="mr-3" />Management</Link>
                  <Link className="dropdown-item" to={'/books/Pharmacy/' + id.bookSubcat.pharmacy}> <FaIcons.FaMedkit className="mr-3" />Pharmacy</Link>
                  <Link className="dropdown-item" to={'/books/Law/' + id.bookSubcat.law}> <FaIcons.FaBalanceScale className="mr-3" /> Law </Link>
                  <Link className="dropdown-item" to={'/books/Arts/' + id.bookSubcat.arts}><IoIcons.IoMdColorPalette className="mr-3" />Arts</Link>
                  <Link className="dropdown-item" to={'/books/Commerce' + id.bookSubcat.commerce}><MdIcons.MdAttachMoney className="mr-3" />Commerce</Link>
                  <Link className="dropdown-item" to={'/books/Agriculture/' + id.bookSubcat.agriculture}><RiIcons.RiPlantFill className="mr-3" /> Agriculture</Link>
                  <Link className="dropdown-item" to={'/books/Science/' + id.bookSubcat.sc}><FaIcons.FaFlask className="mr-3" />Science</Link>
                  <Link className="dropdown-item" to={'/books/Fashion Technology/' + id.bookSubcat.ft}> <FaIcons.FaUserTie className="mr-3" />Fashion Technology</Link>

                </div>
              </li>
              <li className="nav-item   dropdown animation">
                <a className="nav-link mb-0 dropdown-toggle" href="#" id="navbarDropdown" role="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <RiIcons.RiProjector2Fill className="mr-1" /> PPT
                </a>
                <div className="dropdown-menu branch-links animation" aria-labelledby="navbarDropdown">

                  <Link className="dropdown-item" to={'/ppt/Engineering/' + id.pptSubcat.engg}><FaIcons.FaTools className="mr-3" />Engineering</Link>
                  <Link className="dropdown-item" to={'/ppt/Management/' + id.pptSubcat.management}><FaIcons.FaUserAlt className="mr-3" />Management</Link>
                  <Link className="dropdown-item" to={'/ppt/Pharmacy/' + id.pptSubcat.pharmacy}> <FaIcons.FaMedkit className="mr-3" />Pharmacy</Link>
                  <Link className="dropdown-item" to={'/ppt/Law/' + id.pptSubcat.law}><FaIcons.FaBalanceScale className="mr-3" />Law</Link>
                  <Link className="dropdown-item" to={'/ppt/Arts/' + id.pptSubcat.arts}><FaIcons.FaBrush className="mr-3" />Arts</Link>
                  <Link className="dropdown-item" to={'/ppt/Commerce/' + id.pptSubcat.commerce}><MdIcons.MdAttachMoney className="mr-3" />Commerce</Link>
                  <Link className="dropdown-item" to={'/ppt/Agriculture/' + id.pptSubcat.agriculture}><RiIcons.RiPlantFill className="mr-3" />Agriculture</Link>
                  <Link className="dropdown-item" to={'/ppt/Science/' + id.pptSubcat.sc}><FaIcons.FaFlask className="mr-3" />Science</Link>
                  <Link className="dropdown-item" to={'/ppt/Fashion Technology/' + id.pptSubcat.ft}> <FaIcons.FaUserTie className="mr-3" />Fashion Technology</Link>
                </div>
              </li>
              <li className="nav-item dropdown animation">
                <a className="nav-link mb-0 dropdown-toggle" href="#" id="navbarDropdown" role="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <BsIcons.BsBook className="mr-1" />  NOTES
                </a>
                <div className="dropdown-menu branch-links animation" aria-labelledby="navbarDropdown">

                  <Link className="dropdown-item" to={'/notes/Engineering/' + id.notesSubcat.engg}> <FaIcons.FaTools className="mr-3" />Engineering</Link>
                  <Link className="dropdown-item" to={'/notes/Management/' + id.notesSubcat.management}> <FaIcons.FaUserAlt className="mr-3" />Management</Link>
                  <Link className="dropdown-item" to={'/notes/Pharmacy/' + id.notesSubcat.pharmacy}> <FaIcons.FaMedkit className="mr-3" />Pharmacy</Link>
                  <Link className="dropdown-item" to={'/notes/Law/' + id.notesSubcat.law}> <FaIcons.FaBalanceScale className="mr-3" /> Law</Link>
                  <Link className="dropdown-item" to={'/notes/Arts/' + id.notesSubcat.arts}><IoIcons.IoMdColorPalette className="mr-3" />Arts</Link>
                  <Link className="dropdown-item" to={'/notes/Commerce/' + id.notesSubcat.commerce}><MdIcons.MdAttachMoney className="mr-3" />Commerce</Link>
                  <Link className="dropdown-item" to={'/notes/Agriculture/' + id.notesSubcat.agriculture}><RiIcons.RiPlantFill className="mr-3" />Agriculture</Link>
                  <Link className="dropdown-item" to={'/notes/Science/' + id.notesSubcat.sc}><FaIcons.FaFlask className="mr-3" />Science</Link>
                  <Link className="dropdown-item" to={'/notes/Fashion Technology/' + id.notesSubcat.ft}><FaIcons.FaUserTie className="mr-3" /> Fashion Technology</Link>
                </div>

              </li>
              <li className="nav-item  dropdown animation">
                <a className="nav-link mb-0 dropdown-toggle" href="#" id="navbarDropdown" role="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                  <FaIcons.FaPencilRuler className="mr-1" /> STATIONARY
                </a>

                <div className="dropdown-menu branch-links animation" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={'/stationary/Pen And Scale/' + id.stationarySubcat.ps}><FaIcons.FaPencilAlt className="mr-3" />Pens and scales</Link>
                  <Link className="dropdown-item" to={'/stationary/Arts and Crafts/' + id.stationarySubcat.ac}><IoIcons.IoMdColorPalette className="mr-3" />Art and Crafts</Link>
                  <Link className="dropdown-item" to={'/stationary/Desk Organizer/' + id.stationarySubcat.do}><GiIcons.GiTable className="mr-3" />Desk Organizer</Link>
                  <Link className="dropdown-item" to={'/stationary/Calculator/' + id.stationarySubcat.calc}><FaIcons.FaCalculator className="mr-3" />Calculator</Link>
                  <Link className="dropdown-item" to={'/stationary/File And Folders/' + id.stationarySubcat.file}><AiIcons.AiFillFolder className="mr-3" />File and Folders</Link>
                  <Link className="dropdown-item" to={'/stationary/Electronics/' + id.stationarySubcat.electronic}><GiIcons.GiGamepad className="mr-3" />Electronics</Link>
                  <Link className="dropdown-item" to={'/stationary/Hostel and Room Decor/' + id.stationarySubcat.decoration}> <FaIcons.FaHotel className="mr-3" />Hostel Room Decor</Link>
                </div>
              </li>
            </ul>
          </IconContext.Provider>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item m-auto dropdown animation">
              <Link to="/chat" className="nav-msg-btn" variant="primary">
                <FaIcons.FaFacebookMessenger size="2.6rem" color="#153759" />
                {/* <sup style={{ textDecoration: 'none' }} className="msg-sup bg-light text-info">{"0"}</sup> */}
              </Link> </li>
            <li className="nav-item m-auto dropdown animation">
              <a className="mydp nav-link user-profile" href="#" id="navbarDropdown"
                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span
                  className="mydp user-profile my-auto">
                  <Mydp /></span></a>

              <div className="dropdown-menu user-circle pt-0 mt-0 animation" aria-labelledby="navbarDropdown">

                <Link style={{ textDecoration: 'none' }} className="user-link dropdown-item px-3 py-3" to={"/profile"}
                ><CgIcons.CgProfile className="mr-3" />Profile</Link>
                {/* <a className="user-link dropdown-item px-3 py-3" href=""><RiIcons.RiMessage2Fill className="mr-3" />Message</a> */}
                <Link className="user-link dropdown-item px-3 py-3" to="/edit"><FaIcons.FaPencilAlt className="mr-3" />Edit Profile</Link>
                <Link className="user-link dropdown-item px-3 py-3" to="/favourite"><AiIcons.AiFillHeart className="mr-3" />Favourites</Link>
                <Link className="user-link dropdown-item px-3 py-3" to="/up" ><GiIcons.GiShoppingBag className="mr-3" />My Uploads</Link>
                <Link
                  to={"/Logout"}
                  className="user-link dropdown-item px-3 py-3"> <CgIcons.CgLogOut className="mr-3" />
                  Logout</Link>
              </div>
            </li>

            {/* <a href="#sell " className="sell-books  d-flex justify-content-start place-items-center">
                <BsIcons.BsFillPlusCircleFill size='2rem' className=" pb-1 mr-2" />
                sell Item
                              </a> */}


          </ul>


        </div>
      </div>

      <SidebarNav className="d-lg-none" sidebar={sidebar}>
        <SidebarWrap>
          <Link style={{ textDecoration: 'none' }} className="navicon" to='#'>
            <AiIcons.AiOutlineClose onClick={showSidebar} />
          </Link>
          <ul className="ul-1">
            <li ><Link to="/home" ><AiIcons.AiFillHome className="mb-1 mr-2" /> Home  </Link></li>
            <li ><Link to="#" onClick={togglebook} href="#"> <FaIcons.FaBook className="mb-1 mr-3" />Books <span><RiIcons.RiArrowDownSFill className={books ? "rotate" : ""} /></span></Link>
              <ul className={books ? "show" : ""}>
                <li><Link to={"/books/Engineering/" + id.bookSubcat.engg}><FaIcons.FaTools className="mb-1 mr-2" /> Engineering</Link></li>
                <li><Link to={'/books/Mangement/' + id.bookSubcat.management}><FaIcons.FaUserAlt className="mb-1 mr-2" />Management</Link></li>
                <li><Link to={'/books/Pharmacy/' + id.bookSubcat.pharmacy}><FaIcons.FaMedkit className="mb-1 mr-2" />Pharmacy</Link></li>
                <li><Link to={'/books/Law/' + id.bookSubcat.law}><FaIcons.FaBalanceScale className="mb-1 mr-2" />Law</Link></li>
                <li><Link to={'/books/Arts/' + id.bookSubcat.arts}><IoIcons.IoMdColorPalette className="mb-1 mr-2" />Arts</Link></li>
                <li><Link to={'/books/Agriculture/' + id.bookSubcat.agriculture}><RiIcons.RiPlantFill className="mb-1 mr-2" />Agriculture</Link></li>
                <li><Link to={'/books/Commerce/' + id.bookSubcat.commerce}><MdIcons.MdAttachMoney className="mb-1 mr-2" />Commerce</Link></li>
                <li><Link to={'/books/Science/' + id.bookSubcat.sc}><FaIcons.FaFlask className="mb-1 mr-2" />Science</Link></li>
                <li><Link to={'/books/Fashion Technology/' + id.bookSubcat.ft}><FaIcons.FaUserTie className="mb-1 mr-2" />Fashion Technology</Link></li>

              </ul></li>
            <li><a href="#" onClick={toggleppt}> <RiIcons.RiProjector2Fill className="mb-1 mr-3" />Ppt <span><RiIcons.RiArrowDownSFill className={ppt ? "rotate" : ""} /></span></a>
              <ul className={ppt ? "show" : ""}>
                <li><Link to={"/ppt/Engineering/" + id.pptSubcat.engg}><FaIcons.FaTools className="mb-1 mr-2" /> Engineering</Link></li>
                <li><Link to={'/ppt/Management/' + id.pptSubcat.management}><FaIcons.FaUserAlt className="mb-1 mr-2" />Management</Link></li>
                <li><Link to={'/ppt/Pharmacy/' + id.pptSubcat.pharmacy}><FaIcons.FaMedkit className="mb-1 mr-2" />Pharmacy</Link></li>
                <li><Link to={'/ppt/Law/' + id.pptSubcat.law}><FaIcons.FaBalanceScale className="mb-1 mr-2" />Law</Link></li>
                <li><Link to={'/ppt/Arts/' + id.pptSubcat.arts}><IoIcons.IoMdColorPalette className="mb-1 mr-2" />Arts</Link></li>
                <li><Link to={'/ppt/Agriculture/' + id.pptSubcat.agriculture}><RiIcons.RiPlantFill className="mb-1 mr-2" />Agriculture</Link></li>
                <li><Link to={'/ppt/Commerce/' + id.pptSubcat.commerce}><MdIcons.MdAttachMoney className="mb-1 mr-2" />Commerce</Link></li>
                <li><Link to={'/ppt/Science/' + id.pptSubcat.sc}><FaIcons.FaFlask className="mb-1 mr-2" />Science</Link></li>
                <li><Link to={'/ppt/Fashion Technology/' + id.pptSubcat.ft}><FaIcons.FaUserTie className="mb-1 mr-2" />Fashion Technology</Link></li>
              </ul></li>
            <li><a href="#" onClick={togglenotes}> <BsIcons.BsBook className="mb-1 mr-3" />Notes <span><RiIcons.RiArrowDownSFill className={notes ? "rotate" : ""} /></span></a>
              <ul className={notes ? "show" : ""}>
                <li><Link to={"/notes/Engineering/" + id.notesSubcat.engg}><FaIcons.FaTools className="mb-1 mr-2" /> Engineering</Link></li>
                <li><Link to={'/notes/Mangement/' + id.notesSubcat.management}><FaIcons.FaUserAlt className="mb-1 mr-2" />Management</Link></li>
                <li><Link to={'/notes/Pharmacy/' + id.notesSubcat.pharmacy}><FaIcons.FaMedkit className="mb-1 mr-2" />Pharmacy</Link></li>
                <li><Link to={'/notes/Law/' + id.notesSubcat.law}><FaIcons.FaBalanceScale className="mb-1 mr-2" />Law</Link></li>
                <li><Link to={'/notes/Arts/' + id.notesSubcat.arts}><IoIcons.IoMdColorPalette className="mb-1 mr-2" />Arts</Link></li>
                <li><Link to={'/notes/Agriculture/' + id.notesSubcat.agriculture}><RiIcons.RiPlantFill className="mb-1 mr-2" />Agriculture</Link></li>
                <li><Link to={'/notes/Commerce/' + id.notesSubcat.commerce}><MdIcons.MdAttachMoney className="mb-1 mr-2" />Commerce</Link></li>
                <li><Link to={'/notes/Science/' + id.notesSubcat.sc}><FaIcons.FaFlask className="mb-1 mr-2" />Science</Link></li>
                <li><Link to={'/notes/Fashion Technology/' + id.notesSubcat.ft}><FaIcons.FaUserTie className="mb-1 mr-2" />Fashion Technology</Link></li>
              </ul></li>
            <li><a href="#" onClick={togglestationary}> <FaIcons.FaPencilRuler className="mb-1 mr-3" />Stationary <span><RiIcons.RiArrowDownSFill className={stationary ? "rotate" : ""} /></span></a>
              <ul className={stationary ? "show" : ""}>
                <li><Link to={'/stationary/Pen and Scale/' + id.stationarySubcat.ps}><FaIcons.FaPencilAlt className="mb-1 mr-3" />Pens an Scales</Link></li>
                <li><Link to={'/stationary/Arts and Crafts/' + id.stationarySubcat.ac}><FaIcons.FaBrush className="mb-1 mr-3" />Art and Crafts</Link></li>
                <li><Link to={'/stationary/Desk Organizer/' + id.stationarySubcat.do}><GiIcons.GiTable className="mb-1 mr-3" />Desk Organizer</Link></li>
                <li><Link to={'/stationary/Calculator/' + id.stationarySubcat.calc}><FaIcons.FaCalculator className="mb-1 mr-3" />Calculator</Link></li>
                <li><Link to={'/stationary/File and Folders/' + id.stationarySubcat.file}><AiIcons.AiFillFolder className="mb-1 mr-3" />File and Folders</Link></li>
                <li><Link to={'/stationary/Electronics/' + id.stationarySubcat.electronic}><GiIcons.GiGamepad className="mb-1 mr-3" />Electronics</Link></li>
                <li><Link to={'/stationary/Hostel and Room Decor/' + id.stationarySubcat.decoration}><FaIcons.FaHotel className="mb-1 mr-3" />Hostel Room Decor</Link></li>

              </ul></li>

            <li><Link to="/chat"><MdIcons.MdMessage className="mb-1 mr-3" />Message</Link></li>
            <li><a href="#" onClick={toggleAccount}><RiIcons.RiAccountBoxFill className="mb-1 mr-3" />Account <span><RiIcons.RiArrowDownSFill className={account ? "rotate" : ""} /></span></a>
              <ul className={account ? "show" : ""}>
                <li><Link to="/profile"><CgIcons.CgProfile className="mb-1 mr-3" />Profile</Link></li>
                <li><Link to="/edit"><FaIcons.FaPencilAlt className="mb-1 mr-3" />Edit</Link></li>
                <li><Link to="/changePassword"><AiIcons.AiFillLock className="mb-1 mr-3" />change Password</Link></li>
                <li><Link to="/favourite"><AiIcons.AiFillHeart className="mb-1 mr-3" />Favourites</Link></li>
                <li><Link to="/up"><GiIcons.GiShoppingBag className="mb-1 mr-3" />My Added Items</Link></li>

              </ul></li>

            <li>  <Link style={{ textDecoration: 'none' }} to="/" onClick={() => {
              localStorage.clear()

            }}
            ><CgIcons.CgLogOut className="mb-1 mr-2" /> Logout</Link></li>
          </ul>
        </SidebarWrap>
      </SidebarNav>

    </div>
  );
};

export default Sidebar;
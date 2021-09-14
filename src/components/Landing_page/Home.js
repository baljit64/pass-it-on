import React, { Component } from 'react';
import Sidebar from '../navbar/Sidebar'
import Banner from './Banner';
import RecentUploads from './RecentUploads';
import Plus from './Plus'
import Footer from './Footer';
import Contact from './Contact'

class Home extends Component {

  render() {
    return (
      <div className="wrappper">
        <Sidebar />
        <Plus />
        <Banner />
        {/* <div className="" style={{ height: '90px', backgroundColor: '#DEDEDE' }}></div> */}
        <RecentUploads />
        <Contact />
        <div className="slideanim">
          <Footer />
        </div>
      </div >
    );
  }

}


export default Home;

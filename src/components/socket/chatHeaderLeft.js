import * as GiIcons from 'react-icons/gi';

import * as IoIcons from 'react-icons/io';
// import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom'

export default function ChatHeaderLeft({ mypic, history }) {

  return (
    <div className="chat-left-header">
      <IconContext.Provider value={{ color: '#fff', size: '2rem' }}>
        <Link to={'/home'}
          className="chat-left-back-btn my-auto"><IoIcons.IoIosArrowRoundBack /> </Link>
      </IconContext.Provider>
      <div className="chat-left-img">

        <div className="chat-right-profile-img">
          <img className="chat-profile-image"
            src={mypic} /></div>
      </div>
      <IconContext.Provider value={{ color: '#fff', size: '2rem' }}>
        <div className="chat-right-options ">
          <GiIcons.GiHamburgerMenu />
        </div>
      </IconContext.Provider>
    </div>
  )
}


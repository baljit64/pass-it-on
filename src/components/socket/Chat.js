import { useState, useEffect, useRef } from 'react'
import './chat.css';
import * as GiIcons from 'react-icons/gi';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import HeaderLeft from './chatHeaderLeft';
import ChatList from './ChatList';
import Messages from './Message';
import Spinner from '../Landing_page/spinner'
const io = require("socket.io-client/lib/index");
let url = "https://chat-pass123.herokuapp.com";
export default function Chat() {
  const [message, setMessage] = useState('');
  const [pic, setPic] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [not, setNot] = useState(false);
  const [chat_id, setChat_id] = useState(null);
  const [connection, setConnection] = useState(false);
  const [messages, setMessages] = useState([]);
  const sender_id = localStorage.getItem('userId');
  const [receiver_id, setReceiver_id] = useState('')
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([])
  const myPic = localStorage.getItem('mydp');
  const [socket, setSocket] = useState(null);
  const emptyfunc = (e) => {
    e.preventDefault();
  };
  let d = {
    sender_id: sender_id
  }
  useEffect(() => {
    try {
      setSocket(() => io(url))
      setConnection(true);
    }
    catch {
      setNot(true)
    }
  }, []);
  useEffect(() => {
    if (!connection) {
      return;
    }
    socket.emit('join', d);
    socket.on('join', res => {
      if (res.message === "Sucessfully Joined.") {
        socket.emit('Getall_chat', d);
        socket.on('Getall_chat', res => {
          if (res.description) {
            setLoaded(true);
            setUsers(res.description)
          }
        })
      }
    })
  }, [connection]);
  useEffect(() => {
    if (socket === null) {
      return
    }
    socket.once('send_message', res => {
      console.log("send_message", res);
    })
  }, [socket])
  useEffect(() => {
    if (chat_id === null) {
      return;
    }
    let c = {
      chat_id: chat_id
    }
    socket.emit('Getall_message', c);
    socket.on('Getall_message', res => {
      if (res.description.length > 0) {
        setMessages(res.description)
      }
    })
  }, [chat_id])
  useEffect(() => {
    if (chat_id === null) {
      return
    }
    var element = document.getElementsByClassName('chat-right-body')[0];
    element.scrollTop = element.scrollHeight
  }, [messages]);

  const showList = () => {
    document.querySelector(".chat-right").classList.remove('d-block');
    document.querySelector(".chat-left").classList.remove('d-none');
    document.querySelector(".chat-right-back-btn").classList.remove('d-block');
  }
  const showOff = () => {
    document.querySelector(".chat-right").classList.add('d-block');
    document.querySelector(".chat-left").classList.add('d-none');
    document.querySelector(".chat-right-back-btn").classList.add('d-block');
  }
  const submitMsg = (e) => {
    e.preventDefault();
    let Message = {
      chat_id: chat_id,
      message: message,
      sender_id: sender_id,
      receiver_id: receiver_id
    }
    console.log("my message", Message)
    socket.emit('send_message', Message);

    setMessages([...messages, Message]);
    document.querySelector('.chat-input').value = '';
    setMessage('');
  }
  const newchat = (index, name, chat_id, pic, rc_id) => {
    var e = document.querySelector('.chat-right').getBoundingClientRect();
    if (e.width === 0) {
      showOff();
    }
    var z = document.querySelectorAll('.nc');
    for (let i = 0; i < z.length; i++) {
      if (z[i].classList.contains('new-user1')) {
        z[i].classList.remove('new-user1');
      }
    }
    var c = document.getElementsByClassName('nc')[index].classList.add('new-user1')
    setShow(true);
    setPic(pic)
    setChat_id(chat_id)
    setCurrentUser(name)
    setReceiver_id(rc_id)
  }
  if (!loaded) {
    return <Spinner />
  }
  if (not === true) {
    return (
      <>        <h1>Socket Not Connecetd..</h1>
        <br />
        <h4>Please Refresh Page..</h4>
      </>
    )
  }
  return (
    <div className="chat-outer-wrap">
      <div className="container-fluid px-0">
        <div className="chat-inner-wrap">
          <div className="chat-left">
            <HeaderLeft mypic={myPic} />
            <div className="search-box">
              <div className="input-wrapper">
                <IconContext.Provider value={{ color: '#777', size: '2rem' }}>
                  <AiIcons.AiOutlineSearch className="search-icon" />
                </IconContext.Provider>
                <input placeholder="Search here" type="text" />
              </div>
            </div>
            <div className="chat-user-list">
              {users.length > 0 ? users.map((m, i) => (
                <div key={i} onClick={() => newchat(i, m.sender_id === sender_id ? m.name_receiver : m.name_sender,
                  m._id, m.sender_id === sender_id ? m.image_receiver : m.image_sender,
                  m.sender_id === sender_id ? m.receiver_id : m.sender_id)}>
                  <ChatList name={m.sender_id === sender_id ? m.name_receiver : m.name_sender}
                    pic={m.sender_id === sender_id ? m.image_receiver : m.image_sender} />
                </div>
              )) : <div>
                <h2>No conversations....</h2>
              </div>
              }
            </div>
          </div>
          <div className="chat-right">
            <div className={show === false ? "d-none" : ""}>
              <div className="chat-right-header">
                <IconContext.Provider value={{ color: '#fff', size: '2rem' }}>
                  <div className="chat-right-img">
                    <div onClick={(e) => showList(e)} className="chat-right-back-btn"><IoIcons.IoIosArrowRoundBack /> </div>
                    <div className="chat-right-profile-img">
                      <img className="chat-profile-image"
                        src={pic} />
                    </div>
                  </div>
                  <div className="chat-right-name-box">
                    <div>{currentUser}</div>
                    <div>{"Last seen at 10:30pm"}</div>
                  </div>
                  <div className="chat-right-options"><GiIcons.GiHamburgerMenu /></div>
                </IconContext.Provider>
              </div>
              <div className="chat-right-body">
                {messages.map(m => (
                  <Messages msg={m} id={sender_id} />
                ))}
              </div>
              <div className="chat-right-footer">
                <form className="d-flex flex-row">

                  <div className="type-msg"><input type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    className='chat-input' /></div>
                  <div className="send btn w-25">
                    <button onClick={e => message !== "" ? submitMsg(e) : emptyfunc(e)} type="submit"
                      className="chat-send-btn"><FaIcons.FaTelegramPlane />
                    </button> </div>
                </form>
              </div>
            </div>
            <div className={show === true ? "d-none" : ""}>
              <div className="height-400">
                <h3 className="text-muted">Tap to open Conversation.....</h3>
              </div>
            </div>
            {/* chat ends here */}
          </div>
        </div>
      </div >
    </div >
  )
};

import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import './Newchat.css';
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons/lib';
import * as IoIcons from 'react-icons/io'
import Messages from './NewMessages'
import io from 'socket.io-client';
import dp from '../../images/mydp.png'
import Spinner from '../Landing_page/spinner'
const url = "https://chat-pass123.herokuapp.com";
// const url = "http://192.168.1.82:5000";


export default function NewPerson(props) {
  let history = useHistory()
  const [message, setMessage] = useState('');
  const [not, setNot] = useState(false);
  const [rcName, setRcName] = useState('User Name');
  const [rcPic, setRcPic] = useState(dp);
  const [messages, setMessages] = useState([]);
  let [connection, setConnection] = useState(false);
  let [joined, setJoined] = useState(false);
  const [socket, setSocket] = useState(null);
  const [chat_id, setChat_id] = useState('');
  const sender_id = props.match.params.myid;
  const receiver_id = props.match.params.userid;

  const data = {
    sender_id: sender_id,
    receiver_id: receiver_id

  }
  const sendMsg = (id) => {
    let d = {
      chat_id: id
    }
    socket.emit('Getall_message', d);
    socket.on('Getall_message', res => {
      if (res.description) {
        setMessages(res.description);
      }
    })
  }
  useEffect(() => {
    try {
      setSocket(() => io(url))
      setConnection(true);
    }
    catch {
      setNot(true)
    }
  }, [])
  useEffect(() => {
    if (connection === false) {
      return;
    }
    let c = {
      sender_id: sender_id
    }
    socket.emit('join', c);
    socket.on('join', res => {
      if (res) {
        setJoined(true);
      }
    })
  }, [connection])
  useEffect(() => {
    if (joined === false) {
      return;
    }

    socket.emit('intialize_chat', data)
    socket.on('intialize_chat', res => {
      console.log(res)
      // setChat_id(res.data._id)
      if (res) {
        setChat_id(res.data[0]._id)
        sendMsg(res.data[0]._id);
        if (res.data[0].sender_id === sender_id) {
          setRcName(res.data[0].name_receiver);
          setRcPic(res.data[0].image_receiver);
        }
        else {
          setRcName(res.data[0].name_sender);
          setRcPic(res.data[0].image_sender);
        }
      }
    })
  }, [joined]);
  useEffect(() => {
    if (chat_id === '') {
      return;
    }
    let d = {
      chat_id: chat_id
    }
    socket.emit('Getall_message', d);
    socket.on('Getall_message', res => {
      if (res.description.length > 0) {
        setMessages(res.description)
      }
    }
    )
  }, [chat_id])
  useEffect(() => {
    if (chat_id === '') {
      return;
    }
    var element = document.getElementsByClassName('chat-messages')[0];
    element.scrollTop = element.scrollHeight
  }, [messages]);
  const submitMSg = (e) => {
    e.preventDefault()
    let Message = {
      sender_id: sender_id,
      chat_id: chat_id,
      receiver_id: receiver_id,
      message: message
    };
    console.log(Message)
    socket.emit('send_message', Message);
    setMessages([...messages, Message]);
    setMessage('');
  }
  const emptyfunc = (e) => {
    e.preventDefault();
  };
  if (!joined) {
    return (
      <Spinner />
    )
  }
  if (not === true) {
    return (
      <h1 className="text-muted">Server Connection time Out</h1>
    )
  }
  return (
    <div className="newchat-body">
      <div className="chat-header">
        <IconContext.Provider value={{ color: '#fff', size: '3rem' }}>
          <span onClick={() => history.goBack()} style={{ textDecoration: 'none' }} className="header-back-link ">
            <IoIcons.IoIosArrowRoundBack /> </span>
        </IconContext.Provider>
        <div className="header-profile-box">
          <div className="chat-dp">
            <img className="user-image w-100"
              src={rcPic}
              alt="Profile img" />
          </div>
          <div className="receiver-name-box">
            <div className="user-name">{rcName}</div>
            <div className="last-time-active">{ }</div>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <Messages msg={m} id={sender_id} />
        ))
        }

      </div>
      <form>
        <div className="new-chat-footer">

          <div className="new-chat-input">
            <input className="chat-inputbox" onChange={(e) => setMessage(e.target.value)}
              value={message} placeholder="Type a message" type="text" />

          </div>
          <div className="new-chat-send-btn">
            <button onClick={e => message !== "" ? submitMSg(e) : emptyfunc(e)} type="submit">
              Send</button></div>
        </div>
      </form>
    </div>
  )
  // }

}

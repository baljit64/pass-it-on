import * as TiIcons from 'react-icons/ti'
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import '../../App.css'
export default function Contact() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  const [message, setMessage] = useState(null)
  const [subject, setSubject] = useState(null)
  const [response, setResponse] = useState('')
  const [sucs, setSucs] = useState(false)


  const submitForm = (e) => {
    e.preventDefault();
    setSucs(false)
    setResponse('')
    if (message !== null && subject !== null) {
      let data = {
        message: message,
        subject: subject
      }
      axios.get('recently-added').then(res => {
        console.log(res)
      })
      axios.post('/contact', data).then(res => {
        if (res.data.message === "Message send sucessfully...") {
          setSubject('')
          setMessage('')
          setResponse(res.data.message);
          setSucs(true)
        }
        else {
          setResponse(res.data.message);
        }
      }).catch(err => {
        console.log(err)
        setResponse(err.message);
      })
    }
  }
  let success = '';
  if (response !== '') {
    if (sucs) {
      success = (
        <div className=" text-left my-2 " role="alert">
          <p className="msg-text-size text-success">{response}</p>
        </div>
      )
    }
    else {
      success = (
        <div className="  text-left   my-2" role="alert">
          <p className="msg-text-size  text-danger">{response}</p>
        </div>
      )
    }
  }
  return (
    <div>
      <div id="contact" className="container-fluid bg-grey">
        <h2 className="text-center">CONTACT</h2>
        <div className="row remove-padding px-5">
          <div className="col-sm-5">
            <p>Contact us and we'll get back to you within 24 hours.</p>
            <p ><MdIcons.MdLocationOn className="contact-icons" />  Phase 8, Mohali</p>
            <p> <FaIcons.FaPhoneAlt className="contact-icons" /> +00 1515151515</p>
            <p><TiIcons.TiMail className="contact-icons" />  sunfocus@gmail.com</p>
          </div>
          <div className="col-sm-7 slideanim">
            <form onSubmit={(e) => submitForm(e)}>
              <div className="row">
                <div className="col-sm-12 form-group">
                  <input className="c form-control" id="email" name="Subject"
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                    placeholder="Subject" type="text" required />
                </div>
              </div>
              <textarea className="c form-control" id="message" name="message" required
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Message" rows={5} defaultValue={""} /><br />
              <div className="row">
                <div className="col-sm-12  form-group">
                  {success}
                  <button className="btn  btn-success" type="submit">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

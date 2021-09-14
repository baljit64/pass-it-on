import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios';
import Loader1 from '../Landing_page/Loader1';
import Spinner from '../Landing_page/spinner';

export default class Apicall extends Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    this.state = {
      cat: {
        bookid: null,
        pptid: null,
        notesid: null,
        stationaryid: null,
        loaded: false
      },
      bookSubcat: {
        engg: null,
        management: null,
        pharmacy: null,
        law: null,
        arts: null,
        commerce: null,
        agriculture: null,
        sc: null,
        ft: null,
        nursing: null,
        loaded: false
      },
      pptSubcat: {
        engg: null,
        management: null,
        pharmacy: null,
        law: null,
        arts: null,
        commerce: null,
        agriculture: null,
        sc: null,
        ft: null,
        nursing: null,
        loaded: false
      },
      notesSubcat: {
        engg: null,
        management: null,
        pharmacy: null,
        law: null,
        arts: null,
        commerce: null,
        agriculture: null,
        sc: null,
        ft: null,
        nursing: null,
        loaded: false
      },
      stationarySubcat: {
        ps: null,
        ac: null,
        do: null,
        calc: null,
        file: null,
        electronic: null,
        decoration: null,
        loaded: false
      },
      loaded: {
        ok: false

      }
    }

  }

  componentDidMount() {
    axios.get('get-cat').then(res => {

      if (res.data) {
        localStorage.setItem('userId', res.data.current_user);
        localStorage.setItem("userName", res.data.current_user_name);
        this.setState({
          cat: {
            bookid: res.data.result[0]._id,
            notesid: res.data.result[1]._id,
            pptid: res.data.result[2]._id,
            stationaryid: res.data.result[3]._id,
            loaded: true
          }
        })
        if (this.state.cat.loaded) {
          this.getdata()
        }
        this.status()
      }
    }).catch(err => {
      alert(err.message)
    })

    axios.get('View_profile').then(res => {
      if (res) {
        localStorage.setItem('mydp', res.data.message)
      }
    })

  }
  getdata() {
    if (this.state.cat.loaded) {
      this.books()
      this.ppts()
      this.notes()
      this.stationary()

    }

  }

  books() {

    axios.get('get_sub/' + this.state.cat.bookid).then(res => {

      const totalSubid = res.data.data.length;
      for (let i = 0; i < totalSubid; i++) {

        this.setState({
          bookSubcat: {
            engg: res.data.data.[0].user._id,
            management: res.data.data.[1].user._id,
            pharmacy: res.data.data.[2].user._id,
            law: res.data.data.[3].user._id,
            arts: res.data.data.[4].user._id,
            commerce: res.data.data.[5].user._id,
            agriculture: res.data.data.[6].user._id,
            sc: res.data.data.[7].user._id,
            ft: res.data.data.[8].user._id,
            nursing: res.data.data.[9].user._id,
            loaded: true
          }
        })
      }

    }).catch(err => {
      if (err) {
        alert(err.message)

      }
    })
  }
  ppts() {
    axios.get('get_sub/' + this.state.cat.pptid).then(res => {
      const pptSubid = res.data.data.length;
      for (let i = 0; i < pptSubid; i++) {

        this.setState({
          pptSubcat: {
            engg: res.data.data.[0].user._id,
            management: res.data.data.[1].user._id,
            pharmacy: res.data.data.[2].user._id,
            law: res.data.data.[3].user._id,
            arts: res.data.data.[4].user._id,
            commerce: res.data.data.[5].user._id,
            agriculture: res.data.data.[6].user._id,
            sc: res.data.data.[7].user._id,
            ft: res.data.data.[8].user._id,
            nursing: res.data.data.[9].user._id,
            loaded: true
          }
        })
      }
    }).catch(err => {
      alert(err.message)
    })
  }
  notes() {
    axios.get('get_sub/' + this.state.cat.notesid).then(res => {
      const notesSubid = res.data.data.length;
      for (let i = 0; i < notesSubid; i++) {
        this.setState({
          notesSubcat: {
            engg: res.data.data.[0].user._id,
            management: res.data.data.[1].user._id,
            pharmacy: res.data.data.[2].user._id,
            law: res.data.data.[3].user._id,
            arts: res.data.data.[4].user._id,
            commerce: res.data.data.[5].user._id,
            agriculture: res.data.data.[6].user._id,
            sc: res.data.data.[7].user._id,
            ft: res.data.data.[8].user._id,
            nursing: res.data.data.[9].user._id,
            loaded: true
          }
        })

      }
    }).catch(err => {
      alert(err.message)
    })
  }
  stationary() {
    axios.get('get_sub/' + this.state.cat.stationaryid).then(res => {

      const stationarySubid = res.data.data.length;
      for (let i = 0; i < stationarySubid; i++) {
        this.setState({
          stationarySubcat: {
            ps: res.data.data.[0].user._id,
            ac: res.data.data.[1].user._id,
            do: res.data.data.[2].user._id,
            calc: res.data.data.[3].user._id,
            file: res.data.data.[4].user._id,
            electronic: res.data.data.[5].user._id,
            decoration: res.data.data.[6].user._id,
            loaded: true
          }
        })
      }
    }).catch(err => {
      alert(err.message)
    })
  }
  componentDidUpdate(pP, pS, sS) {


    if (pS.bookSubcat.loaded && pS.pptSubcat.loaded
      && pS.notesSubcat.loaded && pS.stationarySubcat.loaded) {

      return this.status();
    }
    else {
      return false
    }
  }

  status() {

    if (this.state.bookSubcat.loaded && this.state.pptSubcat.loaded
      && this.state.notesSubcat.loaded && this.state.stationarySubcat.loaded) {
      const data = JSON.stringify(this.state)
      localStorage.setItem('data', data)
      this.setState({
        loaded: {
          ok: true
        }
      })
    }
  }
  render() {


    if (this.state.loaded.ok) {
      return (
        <Redirect to={"/home"} />
      )
    }
    else {

      return (


        <Spinner />
      )
    }
  }
}


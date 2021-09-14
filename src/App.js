import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import Login from './components/Login/Login';
import Forget from './components/Login/Forget';
import Signup from './components/Login/Signup';
import Otp from './components/Login/Otp';
import SetPassword from './components/Login/SetPassword';

import Home from './components/Landing_page/Home';
import Apicall from './components/Store.js/Apicall';

import Books from './components/getCat/Books';
import Notes from './components/getCat/Notes';
import Ppt from './components/getCat/Ppt';
import Stationary from './components/getCat/Stationary';
import Myuploads from './components/getCat/Myuploads';

import Allbooks from './components/getCat/Allbooks'
import Allnotes from './components/getCat/Allnotes'
import Allppt from './components/getCat/Allppt'
import Allstationary from './components/getCat/Allstationary'


import Bookdis from './components/Items/Bookdis';
import Pptdis from './components/Items/Pptdis';
import Notedis from './components/Items/Notedis';
import Stationarydis from './components/Items/Stationarydis';

import Editbook from './components/Items/Editbook';
import Editppt from './components/Items/Editppt';
import Editnotes from './components/Items/Editnotes';
import Editstationary from './components/Items/Editstationary';


import Uploadbook from './components/Items/Uploadbook';
import Uploadppt from './components/Items/Uploadppt';
import Uploadnotes from './components/Items/Uploadnotes';
import Uploadstationary from './components/Items/Uploadstationary';



import Profile from './components/Profile/Profile';
import Favourite from './components/Profile/Favourite';
import Editprofile from './components/Profile/Editprofile';
import Logout from './components/Landing_page/Logout'
import Protected from './components/Landing_page/Protected';
// chat pages
import Chat from './components/socket/Chat'
import NewChat from './components/NewChat/NewPerson'

import ProtectedEmail from './components/Login/ProtectedEmail';
import NotFound from './components/NotFound/NotFound';






function App() {

    return (

        <Router>
            < div className="wrapper">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/notfound" component={NotFound} />
                    <Route exact path="/forget" component={Forget} />
                    <Route exact path="/signup" component={Signup} />
                    <ProtectedEmail exact path="/otp" component={Otp} />
                    <ProtectedEmail exact path="/set" component={SetPassword} />

                    <Protected exact path="/apicall" component={Apicall} />
                    <Protected exact path="/home" component={Home} />
                    <Protected exact path="/books/:name/:id" component={Books} />
                    <Protected exact path="/ppt/:name/:id" component={Ppt} />
                    <Protected exact path="/notes/:name/:id" component={Notes} />
                    <Protected exact path="/stationary/:name/:id" component={Stationary} />

                    <Protected exact path="/bookdis/:id" component={Bookdis} />
                    <Protected exact path="/pptdis/:id" component={Pptdis} />
                    <Protected exact path="/notesdis/:id" component={Notedis} />
                    <Protected exact path="/stationarydis/:id" component={Stationarydis} />


                    <Protected exact path="/editbook/:id" component={Editbook} />
                    <Protected exact path="/editppt/:id" component={Editppt} />
                    <Protected exact path="/editnotes/:id" component={Editnotes} />
                    <Protected exact path="/editstationary/:id" component={Editstationary} />

                    <Protected exact path="/uploadbook" component={Uploadbook} />
                    <Protected exact path="/uploadnotes" component={Uploadnotes} />
                    <Protected exact path="/uploadppt" component={Uploadppt} />
                    <Protected exact path="/uploadstationary" component={Uploadstationary} />
                    <Protected exact path="/up" component={Myuploads} />

                    <Protected exact path="/allbooks" component={Allbooks} />
                    <Protected exact path="/allnotes" component={Allnotes} />
                    <Protected exact path="/allppt" component={Allppt} />
                    <Protected exact path="/allstationary" component={Allstationary} />
                    <Protected exact path="/chat" component={Chat} />
                    <Protected exact path="/newchat/:myid/:userid" component={NewChat} />



                    <Protected exact path="/profile" component={Profile} />
                    <Protected exact path="/favourite" component={Favourite} />
                    <Protected exact path="/edit" component={Editprofile} />
                    <Protected exact path="/Logout" component={Logout} />
                    <Redirect to="/notfound" />
                </Switch>


            </div>
        </Router >
    )


};
export default App;


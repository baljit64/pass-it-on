import React from 'react';
import { Redirect, Route } from 'react-router-dom'
const ProtectedEmail = ({ component: Cmp, ...rest }) => (

  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('myemail') ? (
        <Cmp {...props} />
      ) :
        <Redirect to={"/forget"} />
    }
  />
)

export default ProtectedEmail;
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../core/Layout';
import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';
import Activate from '../auth/Activate';
import Private from '../core/Private';
import PrivateRoute from '../auth/PrivateRoute';
import Admin from '../core/Admin';
import AdminRoute from '../auth/AdminRoute';
import Forgot from '../auth/Forgot';
import Reset from '../auth/Reset';
import PageNotFound from '../auth/PageNotFound';

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Layout />}>
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/signin" exact element={<SignIn />} />
            <Route path="/auth/activate/:token" exact element={<Activate />} />
            {/* <Route path="/private" exact element={<Private/>}/> */}
            <Route path="/private" element={<PrivateRoute />}>
              <Route index element={<Private />} />
            </Route>
            {/* <Route path="/admin" exact element={<Admin/>}/> */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<Admin />} />
            </Route>
            <Route path='/auth/password/forgot' exact element={<Forgot />} />
            <Route path='/auth/password/reset/:token' exact element={<Reset />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default MyRoutes
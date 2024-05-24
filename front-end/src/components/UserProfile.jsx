import React from 'react'
import Navbar from './Navbar'
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import Property from './Lands';
import Requests from './LandRequests';
import Requested from './RequestedLands';
import Explore from './Explore';
import './init'
import LandOwnershipHistory from './LandOwnershipHistory';
const UserProfile = (props) => {
  return (
    <>
      <Navbar isAdmin={false} />
      <Routes>
        <Route path='/' element={<Profile myWeb3Api={props.myWeb3Api} account={props.account} />} />
        <Route path='/property' element={<Property myWeb3Api={props.myWeb3Api} account={props.account} />} />
        <Route path='/requests' element={<Requests myWeb3Api={props.myWeb3Api} account={props.account} />} />
        <Route path='/requested' element={<Requested myWeb3Api={props.myWeb3Api} account={props.account} />} />
        <Route path='/explore' element={<Explore myWeb3Api={props.myWeb3Api} account={props.account} />} />
        <Route path='/landownership' element={<LandOwnershipHistory myWeb3Api={props.myWeb3Api} account={props.account} />} />
      </Routes>
    </>
  )
}

export default UserProfile
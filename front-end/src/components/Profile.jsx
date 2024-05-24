import React, { useState, useEffect } from 'react';
import DisplayExploreResult from './DisplayExploreResult';
import Explore from './Explore';

const Profile = (props) => {
  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [userInfo, setUserInfo] = useState({
    address: "", fullName: "", gender: "", email: "", contact: "", residential_addr: ""
  })

  const [update, setUpdate] = useState(false);


  const handleUpdate = async () => {

    await contract.setUserProfile(userInfo.fullName, userInfo.gender, userInfo.email, userInfo.contact, userInfo.residential_addr, {
      from: account
    });

    console.log(userInfo);
    setUpdate(false);
  }

  const onChangeFunc = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value })
  }


  useEffect(() => {

    const getUserInfo = async () => {
      const response = await contract.getUserProfile({ from: account });

      setUserInfo({
        address: account,
        fullName: (response[0]) ? response[0] : "NA",
        gender: (response[1]) ? response[1] : "NA",
        email: (response[2]) ? response[2] : "NA",
        contact: (response[3].words[0]) ? response[3].words[0] : "NA",
        residential_addr: (response[4]) ? response[4] : "NA"
      });
    }

    getUserInfo();
  }, [])



  return (
    <div className='mx-auto mt-20 p-8 h-500 w-8/12 bg-teal-400 rounded-lg shadow-md'>
      {/* Display user profile information */}
      <div className='flex flex-col-2 '>
        <div className=' w-6/12 h-500 grid grid-row-3 px-3'>
          <label className="text-white-500"><b>Owner Address</b></label>
          <p className="text-white">{userInfo.address}</p>
          <label className="text-white-500"><b>Full Name</b></label>
          {update ? (
            <input
              className="input-box py-1 px-1 rounded-md "
              type="text"
              name="fullName"
              value={userInfo.fullName}
              onChange={onChangeFunc}
            />
          ) : (
            <p className="text-white">{userInfo.fullName}</p>
          )}
          <label className="text-white-500"><b>Gender</b></label>
          {update ? (
            <select
              className="input-box py-1 px-1 rounded-md "
              name="gender"
              defaultValue={userInfo.gender}
              onChange={onChangeFunc}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-white">{userInfo.gender}</p>
          )}
        </div>
        <div className=' grid grid-row-3  w-6/12 px-3'>
          <label className="text-white-500"><b>Email</b></label>
          {update ? (
            <input
              className="input-box py-1 px-1 rounded-md "
              type="text"
              name="email"
              value={userInfo.email}
              onChange={onChangeFunc}
            />
          ) : (
            <p className="text-white">{userInfo.email}</p>
          )}
          <label className="text-white-500"><b>Contact Number</b></label>
          {update ? (
            <input
              className="input-box py-1 px-1 rounded-md "
              type="text"
              name="contact"
              value={userInfo.contact}
              onChange={onChangeFunc}
            />
          ) : (
            <p className="text-white">{userInfo.contact}</p>
          )}
          <label className="text-white-500"><b>Residential Address</b></label>
          {update ? (
            <input
              className="input-box py-1 px-1 rounded-md "
              type="text"
              name="residential_addr"
              value={userInfo.residential_addr}
              onChange={onChangeFunc}
            />
          ) : (
            <p className="text-white">{userInfo.residential_addr}</p>
          )}
        </div>
      </div>
      {/* Button to update profile */}
      {!update && (
        <button className='update-btn mt-6 bg-blue-500 hover:bg-blue-700 mr-6 text-white font-bold py-2 px-4 rounded' onClick={() => { setUpdate(true) }}>Update Profile</button>
      )}
      {update && (
        <button className='update-btn mt-6 bg-green-500 hover:bg-green-700 mr-6 text-white font-bold py-2 px-4 rounded' onClick={handleUpdate}>Save Changes</button>
      )}
      {update && (
        <button className='update-btn mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => { setUpdate(false) }}>Cancel</button>
      )}


    </div>
  );
}

export default Profile;



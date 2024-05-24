import React, { useState } from 'react'

import './init';

const RegisterLand = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [landDetails, setLandDetails] = useState({
    state: "", district: "", city: "", propertyId: "", surveyNo: "", owner: "", marketValue: "", size: ""
  });

  const onChangeFunc = (event) => {
    const { name, value } = event.target;
    setLandDetails({ ...landDetails, [name]: value });
  };

  const handleOnClick = async () => {
    await contract.registerLand(
      landDetails.state,
      landDetails.district,
      landDetails.city,
      landDetails.propertyId,
      landDetails.surveyNo,
      landDetails.owner,
      landDetails.marketValue,
      landDetails.size,
      { from: account }
    );
    console.log(landDetails);
    setLandDetails({ state: "", district: "", city: "", propertyId: "", surveyNo: "", owner: "", marketValue: "", size: "" });
  };

  return (
    <div className='mt-10 container mx-auto w-8/12 bg-teal-400 p-8 rounded-lg'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>

        {/* Left form */}
        <div>
          <form method='POST' className='admin-form'>
            <div className='form-group'>
              <label className='block mb-2 font-bold'>Division</label>
              <input
                type="text"
                className="form-control block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                name="state"
                placeholder="Enter Division"
                autoComplete="off"
                value={landDetails.state}
                onChange={onChangeFunc}
              />
            </div>
            <div className='form-group'>
              <label className='block mb-2 font-bold'>District</label>
              <input
                type="text"
                className="form-control block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                name="district"
                placeholder="Enter district"
                autoComplete="off"
                value={landDetails.district}
                onChange={onChangeFunc}
              />
            </div>
            <div className='form-group'>
              <label className='block mb-2 font-bold'>City</label>
              <input
                type="text"
                className="form-control block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                name="city"
                placeholder="Enter city"
                autoComplete="off"
                value={landDetails.city}
                onChange={onChangeFunc}
              />
            </div>
            <div className='form-group'>
              <label className='block mb-2 font-bold'>Land ID</label>
              <input
                type="number"
                className="form-control block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                name="propertyId"
                placeholder="Enter property ID"
                autoComplete="off"
                value={landDetails.propertyId}
                onChange={onChangeFunc}
              />
            </div>
          </form>
        </div>

        {/* Right form */}
        <div>
          <form method='POST' className='admin-form'>
            <div className='form-group'>
              <label className='block mb-2 font-bold'>Survey Number</label>
              <input
                type="number"
                className="form-control block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                name="surveyNo"
                placeholder="Enter survey number"
                autoComplete="off"
                value={landDetails.surveyNo}
                onChange={onChangeFunc}
              />
            </div>
            <div className='form-group'>
              <label className='block mb-2 font-bold'>Owner Address</label>
              <input
                type="text"
                className="form-control block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                name="owner"
                placeholder="Enter owner address"
                autoComplete="off"
                value={landDetails.owner}
                onChange={onChangeFunc}
              />
            </div>
            <div className='form-group'>
              <label className='block mb-2 font-bold'>Market Value</label>
              <input
                type="number"
                className="form-control block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                name="marketValue"
                placeholder="Enter market value"
                autoComplete="off"
                value={landDetails.marketValue}
                onChange={onChangeFunc}
              />
            </div>
            <div className='form-group'>
              <label className='block mb-2 font-bold'>Size</label>
              <input
                type="number"
                className="form-control block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                name="size"
                placeholder="Enter size (sq. ft.)"
                autoComplete="off"
                value={landDetails.size}
                onChange={onChangeFunc}
              />
            </div>
          </form>
        </div>
      </div>
      <button className='admin-form-btn bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600' onClick={handleOnClick}>Submit</button>
    </div>
  );
};

export default RegisterLand;

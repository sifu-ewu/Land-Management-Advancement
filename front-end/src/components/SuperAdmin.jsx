import React, { useState } from 'react';
import emblem from '../images/govt.png';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loadContract } from '../utils/loadContract';
import { Alert } from 'flowbite-react'
const SuperAdmin = (props) => {
  const { provider, web3 } = props.myWeb3Api;
  const account = props.account;
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [adminData, setAdminData] = useState({
    address: '',
    state: '',
    district: '',
    city: '',
  });

  const onChangeFunc = (event) => {
    const { name, value } = event.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = async () => {
    const contract = await loadContract('Registry', provider);
    await contract.addAdmin(
      adminData.address,
      adminData.state,
      adminData.district,
      adminData.city,
      {
        from: account,
      }
    );

    console.log('admin details submitted');
    setAdminData({ address: '', state: '', district: '', city: '' });
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-400">
      <div className="bg-white p-8 rounded-lg w-8/12">
        <div className="text-center">
          <NavLink to="/">
            <img src={emblem} alt="emblem" className="h-12 mb-4 mx-auto" />
          </NavLink>
          <h1 className="text-2xl font-semibold mb-4">Super Admin</h1>
        </div>

        <p className="text-center mb-4">Add an Admin</p>

        <div className="w-full max-w-lg mx-auto">
          <form className="space-y-4">
            <div>
              <label htmlFor="address" className="block font-semibold">
                Admin Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-input py-2 px-1 w-full rounded-md border border-gray-300 focus:border-teal-400 focus:ring focus:ring-teal-200"
                placeholder="Enter admin address"
                autoComplete="off"
                value={adminData.address}
                onChange={onChangeFunc}
              />
            </div>
            <div>
              <label htmlFor="state" className="block font-semibold">
                Division
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="form-input py-2 px-1 w-full rounded-md border border-gray-400  focus:border-teal-400 focus:ring focus:ring-teal-200"
                placeholder="Enter Division"
                autoComplete="off"
                value={adminData.state}
                onChange={onChangeFunc}
              />
            </div>
            <div>
              <label htmlFor="district" className="block font-semibold">
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                className="form-input w-full py-2 px-1 rounded-md border border-gray-300 focus:border-teal-400 focus:ring focus:ring-teal-200"
                placeholder="Enter district"
                autoComplete="off"
                value={adminData.district}
                onChange={onChangeFunc}
              />
            </div>
            <div>
              <label htmlFor="city" className="block font-semibold">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-input w-full  py-2 px-1 rounded-md border border-gray-300 focus:border-teal-400 focus:ring focus:ring-teal-200"
                placeholder="Enter city"
                autoComplete="off"
                value={adminData.city}
                onChange={onChangeFunc}
              />
            </div>
          </form>
        </div>
        <div className="text-center">

          <button
            className="mt-4 px-8 py-2 bg-teal-500 text-white font-semibold rounded-md"
            onClick={() => {
              if (adminData.address === '' || adminData.city === '') {
                setShowAlert(true); // Show alert if fields are empty
              } else {
                handleSubmit(); // Otherwise, submit the form
              }
            }}
          >
            Submit
          </button>
          {showAlert && (
            <Alert color="warning" className='ml-56'>
              <span className="font-medium">Info alert!</span> Fillup the input Feild before Submitting.
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;

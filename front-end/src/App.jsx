import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import emblem from './images/govt.png';
import Web3 from 'web3';
import detectEtherumProvider from '@metamask/detect-provider';
import { loadContract } from './utils/loadContract';
import SuperAdmin from './components/SuperAdmin';
import Admin from './components/LandAdmin.jsx';
import UserProfile from './components/UserProfile';
import image1 from './backgroundStyle/contract.png';

function App() {
  const [userName, setUsername] = useState('')
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  });

  const [account, setAccount] = useState(null);
  let navigate = useNavigate();

  const connectToEthereum = async () => {
    const provider = await detectEtherumProvider();
    const contract = await loadContract('Registry', provider);

    if (provider) {
      console.log("provider:", provider);
      provider.request({ method: 'eth_requestAccounts' });
      setWeb3Api({
        web3: new Web3(provider),
        provider,
        contract
      });
    } else {
      console.error('Please install metamask!');
    }
  }

  useEffect(() => {
    const getAccount = async () => {
      const { web3, contract } = web3Api;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
    web3Api.web3 && getAccount();
  }, [web3Api]);

  useEffect(() => {
    const checkAccount = async () => {
      const { web3, contract } = web3Api;
      const superAdmin = await contract.superAdmin();
      console.log(account);
      if (account === superAdmin) {

        navigate('/superadmin');
      } else if (await contract.isAdmin({ from: account })) {

        navigate('/admin');
      } else {

        navigate('./userprofile')
      }
    }
    account && checkAccount();
  }, [web3Api, account])

  // useEffect(() => {
  //   const fetchAccountName = async () => {
  //     if (account && web3Api.contract) {
  //       const name = await web3Api.contract.getAccountName(account);
  //       setUsername(name || 'Super Admin');
  //     }
  //   };

  //   fetchAccountName();
  // }, [account, web3Api]);

  return (
    <Routes>
      <Route path='/superadmin' element={<SuperAdmin myWeb3Api={web3Api} account={account} />} />
      <Route path='/admin/*' element={<Admin myWeb3Api={web3Api} account={account} />} />
      <Route path='/userprofile/*' element={<UserProfile myWeb3Api={web3Api} account={account} />} />

      <Route path='/' element={
        <div className="App h-full w-full">
          <div className=" h-screen w-screen mx-auto px-4 py-8 md:flex md:items-center md:justify-between bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            <div className="md:w-1/2">
              <div className="landingPage-heading-div">
                <img src={emblem} alt="emblem" className="emblem w-20" />
                <h1 className="text-3xl font-bold text-gray-800">Decentralized Land Management</h1>
              </div>
              <p className="welcome-p text-lg text-gray-700 mt-4">Turning Dreams into Reality: Effortlessly Register Your Land and Transact with Confidence and Transparency.</p>
              <button className="landingPage-btn mt-8 px-8 py-4 bg-orange-400 hover:bg-green-500 text-white font-semibold rounded-md" onClick={connectToEthereum}>Connect To Ethereum</button>
            </div>
            <div className="flex-1 ">
              <div className='w-[500px] h-[600px] bg-[#1C1C62] rounded-md rounded-tl-3xl rounded-br-3xl mb-4 mr-4 ml-[20px] mt-[40px]' />
              <div className="w-[500px] h-[600px] border-4 border-gray-500 rounded-md rounded-tl-3xl rounded-br-3xl sm:mt-[-86%] md:mt-[-640px]">
                <img
                  src={'https://assets.awwwards.com/awards/submissions/2022/10/633be36694e76625876735.png'}
                  alt=""
                  className="w-full h-full rounded-tl-3xl rounded-br-3xl shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

      } />
    </Routes>
  );
}

export default App;

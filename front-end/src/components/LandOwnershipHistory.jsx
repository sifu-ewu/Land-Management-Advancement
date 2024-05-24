import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import RegistryContract from '../../public/contracts/Registry.json';
import '../css/LandOwnership.css';

const LandOwnershipHistory = () => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [landDetails, setLandDetails] = useState({
        state: '',
        district: '',
        city: '',
        surveyNo: ''
    });
    const [previousOwners, setPreviousOwners] = useState([]);
    const [currentOwner, setCurrentOwner] = useState('');

    useEffect(() => {
        const loadBlockchainData = async () => {
            try {
                // Connect to MetaMask or other provider
                if (window.ethereum) {
                    const web3 = new Web3(window.ethereum);
                    await window.ethereum.enable();
                    setWeb3(web3);
                    const accounts = await web3.eth.getAccounts();
                    setAccounts(accounts);

                    // Load contract
                    const networkId = await web3.eth.net.getId();
                    const networkData = RegistryContract.networks[networkId];
                    if (networkData) {
                        const contract = new web3.eth.Contract(RegistryContract.abi, networkData.address);
                        setContract(contract);
                    } else {
                        window.alert('Contract not deployed to detected network.');
                    }
                } else {
                    window.alert('Please install MetaMask to use this dApp!');
                }
            } catch (error) {
                console.error('Error loading blockchain data:', error);
            }
        };

        loadBlockchainData();
    }, []);

    // Function to get land details and ownership history
    const getLandDetails = async () => {
        try {
            const { state, district, city, surveyNo } = landDetails;
            const landContract = contract.methods;
            const landDetailsResult = await landContract.getLandDetails(state, district, city, surveyNo).call();
            const ownerHistory = await landContract.getOwnerHistory(state, district, city, surveyNo).call();

            setPreviousOwners(ownerHistory);
            setCurrentOwner(landDetailsResult[0]);
        } catch (error) {
            console.error('Error getting land details:', error);
        }
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        await getLandDetails();
    };

    // Function to handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLandDetails({ ...landDetails, [name]: value });
    };

    return (
        <div className="container mx-auto p-4 flex justify-center">
            <div className="flex">
                <div className="form-container bg-teal-400 mr-4 p-6">
                    <h1>Land Ownership History</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            State:
                            <input type="text" name="state" value={landDetails.state} onChange={handleInputChange} />
                        </label>
                        <label>
                            District:
                            <input type="text" name="district" value={landDetails.district} onChange={handleInputChange} />
                        </label>
                        <label>
                            City:
                            <input type="text" name="city" value={landDetails.city} onChange={handleInputChange} />
                        </label>
                        <label>
                            Survey Number:
                            <input type="text" name="surveyNo" value={landDetails.surveyNo} onChange={handleInputChange} />
                        </label>
                        <button type="submit" className='hover:bg-green-700 bg-green-300'>Get Ownership History</button>
                    </form>
                </div>

                {currentOwner && (
                    <div className="result-container bg-gray-200 p-4">
                        <h2 className="text-xl font-bold text-blue-700">Current Owner: {currentOwner}</h2>
                        <h2>Previous Owners:</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {previousOwners.length === 0 ? (
                                    <tr>
                                        <td className='text-red-500'>This land has no previous owner.</td>
                                    </tr>
                                ) : (
                                    previousOwners.map((owner, index) => (
                                        <tr key={index}>
                                            <td >{`Owner ${index + 1} is: `}<span className='text-green-500 ml-2 text-xl'>{owner}</span></td>
                                        </tr>
                                    ))
                                )}

                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandOwnershipHistory;

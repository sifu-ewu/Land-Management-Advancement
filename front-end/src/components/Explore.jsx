import React, { useEffect, useState } from 'react';
import DisplayExploreResult from './DisplayExploreResult';

const Explore = (props, { userInfo }) => {
  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [explore, setExplore] = useState({
    state: '', district: '', city: '', surveyNo: ''
  });

  const [landDetail, setLandDetail] = useState({
    owner: '', propertyId: '', index: '', marketValue: '', sqft: ''
  });

  const [didIRequested, setDidIRequested] = useState(false);
  const [available, setAvailable] = useState(false);
  const [noResult, setNoResult] = useState(0);
  const [isOwner, setIsOwner] = useState(false);

  const onChangeFunc = (event) => {
    const { name, value } = event.target;
    setExplore({ ...explore, [name]: value });
  };

  const handleSurveyClick = async () => {
    const landDetails = await contract.getLandDetailsBySurveyNo(explore.surveyNo);
    const owner = landDetails[0];
    const propertyId = landDetails[1].words[0];
    const index = landDetails[2].words[0];
    const marketValue = landDetails[3].words[0];
    const sqft = landDetails[4].words[0];
    const available = landDetails[5];
    const noOfRequests = landDetails[6];

    setLandDetail({ owner, propertyId, index, marketValue, sqft, surveyNo: explore.surveyNo });
    setAvailable(available);
    setNoResult(1);
};


  const handleOnClick = async () => {
    const landDetails = await contract.getLandDetails(explore.state, explore.district, explore.city, explore.surveyNo, {
      from: account
    });

    const isAvailable = await contract.isAvailable(explore.state, explore.district, explore.city, explore.surveyNo, {
      from: account
    });

    const owner = landDetails[0];
    const propertyId = landDetails[1].words[0];
    const index = landDetails[2].words[0];
    const marketValue = landDetails[3].words[0];
    const sqft = landDetails[4].words[0];
    const surveyNo = explore.surveyNo;

    if (account === owner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
      if (isAvailable) {
        const didIRequested = await contract.didIRequested(explore.state, explore.district, explore.city, explore.surveyNo, {
          from: account
        });

        setDidIRequested(didIRequested);
      }
    }

    setLandDetail({ owner, propertyId, index, marketValue, sqft, surveyNo });
    setAvailable(isAvailable);
    setNoResult(1);
  };

  const requestForBuy = async () => {
    await contract.RequestForBuy(explore.state, explore.district, explore.city, explore.surveyNo, {
      from: account
    });

    setDidIRequested(true);
  };

  useEffect(() => {
    console.log(landDetail);
  }, [landDetail]);

  return (
    <div className="container mx-auto rounded-md p-4 w-8/12 mt-10 bg-teal-400 border-2 border-gray-400">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Explore Land</h2>
          <div className=" p-4 rounded-md ">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Division</label>
              <input type="text" className="form-input w-full py-2 px-2 rounded-md " name="state" placeholder="Enter State" autoComplete="off" value={explore.state} onChange={onChangeFunc} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">District</label>
              <input type="text" className="form-input w-full py-2 px-2 rounded-md" name="district" placeholder="Enter district" autoComplete="off" value={explore.district} onChange={onChangeFunc} />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">&nbsp;</h2>
          <div className=" p-4 rounded-md ">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 ">City</label>
              <input type="text" className="form-input w-full py-2 px-2 rounded-md" name="city" placeholder="Enter city" autoComplete="off" value={explore.city} onChange={onChangeFunc} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Survey number</label>
              <input type="text" className="form-input w-full py-2 px-2 rounded-md" name="surveyNo" placeholder="Enter survey number" autoComplete="off" value={explore.surveyNo} onChange={onChangeFunc} />
            </div>
          </div>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4" onClick={handleOnClick}>Explore</button>

      <DisplayExploreResult
        owner={landDetail.owner}
        propertyId={landDetail.propertyId}
        surveyNo={landDetail.surveyNo}
        marketValue={landDetail.marketValue}
        sqft={landDetail.sqft}
        available={available}
        isAdmin={props.isAdmin}
        didIRequested={didIRequested}
        requestForBuy={requestForBuy}
        noResult={noResult}
        isOwner={isOwner}
        userInfo={userInfo}
      />
    </div>
  );
};

export default Explore;

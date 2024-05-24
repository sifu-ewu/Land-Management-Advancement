import React, { useState, useEffect } from 'react'
import DisplayRequested from './DisplayRequested';
import './init';
import '../css/NotFound.css'

const Requested = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  const reqArr = [];
  const [thank, setThank] = useState(null);

  const [requestedList, setRequestedList] = useState([]);
  const [length, setLength] = useState(0);

  useEffect(() => {

    const getRequested = async () => {

      const _indices = await contract.getIndices({ from: account });
      const _reqIndices = _indices[1].words[0];

      for (let i = 0; i <= _reqIndices; i++) {

        const reqLand = await contract.getRequestedLands(i, { from: account });

        // if surveyNo. != 0
        if (reqLand[3].words[0] != 0) {
          const landDetails = await contract.getLandDetails(reqLand[0], reqLand[1], reqLand[2], reqLand[3].words[0], {
            from: account
          })

          const landDetails2 = { state: reqLand[0], district: reqLand[1], city: reqLand[2], surveyNo: reqLand[3].words[0] }
          let allDetails = { ...landDetails, ...landDetails2 }
          reqArr.push(allDetails);
        }
      }
      setRequestedList(reqArr);
      setLength(reqArr.length);
      console.log(reqArr);
    }

    getRequested();

  }, [])


  return (
    <div className='container'>
      {
        (length === 0) ?
          <div className="no-result-div">

            <div className="no-result-div">
              <div class="notifications-container">
                <div class="success">
                  <div class="flex">
                    <div class="flex-shrink-0">
                    </div>
                    <div class="success-prompt-wrap">
                      <p class="success-prompt-heading">No pending requests.
                      </p><div class="success-prompt-prompt">
                        {
                          thank
                            ? (<p>{thank}</p>) : (<p>There are no requests from buyer!.</p>)
                        }

                      </div>
                      <div class="success-button-container">
                        <button type="button" class="success-button-main" onClick={(e) => setThank('Sifat Ullah Biye Korbe')}>Thank You</button>
                        <button type="button" class="success-button-secondary">Help</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          :
          requestedList.map((details, index) => {
            return (
              <DisplayRequested

                key={index}
                owner={details[0]}
                propertyId={details[1].words[0]}
                index={details[2].words[0]}
                marketValue={details[3].words[0]}
                sqft={details[4].words[0]}
                state={details.state}
                district={details.district}
                city={details.city}
                surveyNo={details.surveyNo}

              />
            )
          })
      }
    </div>
  )
}

export default Requested
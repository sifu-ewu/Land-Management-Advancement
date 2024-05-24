import React, { useState, useEffect } from 'react';

const DisplayExploreResult = (props) => {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (props.propertyId !== "") {
      setShowResult(true);
    }
  }, [props.propertyId]);

  return (
    <>
      {showResult && (
        <div className="bg-white rounded-md shadow-md border-2 border-gray-400 p-4 mb-2 mt-4">
          <h2 className="text-xl font-bold text-blue-700">Current Owner: {props.owner}</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-teal-600">Survey Number</th>
                <th className="px-4 py-2 text-left text-teal-600">Land ID</th>
                <th className="px-4 py-2 text-left text-teal-600">Market Value</th>
                <th className="px-4 py-2 text-left text-teal-600">Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">{props.surveyNo}</td>
                <td className="px-4 py-2">{props.propertyId}</td>
                <td className="px-4 py-2">{props.marketValue}</td>
                <td className="px-4 py-2">{props.sqft} sq. ft.</td>
              </tr>
            </tbody>
          </table>
          {props.available ? (
            (props.isAdmin || props.isOwner) ? (
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md mt-2">
                <b>Marked for sale</b>
              </button>
            ) : (
              (props.didIRequested) ? (
                <button className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-md mt-2 cursor-not-allowed" disabled>
                  <b>Request Pending</b>
                </button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-2" onClick={props.requestForBuy}>
                  <b>Request for buy</b>
                </button>
              )
            )
          ) : (
            <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md mt-2 cursor-not-allowed" disabled>
              <b>Not for sale</b>
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default DisplayExploreResult;

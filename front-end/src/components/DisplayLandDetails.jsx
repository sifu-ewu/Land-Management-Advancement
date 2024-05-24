import React from 'react';

const DisplayLandDetails = (props) => {
  return (
    <div className="display_lands ml-60 bg-teal-400">
      <div className="overflow-x-auto">
        <span className='flex gap-2 justify-center text-2xl py-2 mb-2'>Owner:<h1 className=' text-l items-center grid-cols-2 gap-2'>{props.owner}</h1></span>
        <table className="w-full table-fixed border-collapse border border-gray-200">
          <thead className="bg-white">
            <tr>

              <th className="px-4 py-2 w-1/8">Survey Number</th>
              <th className="px-4 py-2 w-1/8">Land ID</th>
              <th className="px-4 py-2 w-1/8">Market Value</th>
              <th className="px-4 py-2 w-1/8">Division</th>
              <th className="px-4 py-2 w-1/8">District</th>
              <th className="px-4 py-2 w-1/8">City</th>
              <th className="px-4 py-2 w-1/8">Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>

              <td className="border px-4 py-4">{props.surveyNo}</td>
              <td className="border px-4 py-4">{props.propertyId}</td>
              <td className="border px-4 py-4">{props.marketValue}</td>
              <td className="border px-4 py-4">{props.state}</td>
              <td className="border px-4 py-4">{props.district}</td>
              <td className="border px-4 py-4">{props.city}</td>
              <td className="border px-4 py-4">{props.sqft} sq. ft.</td>
            </tr>
          </tbody>
        </table>
      </div>
      {props.available ? (
        <button className="marked-available bg-blue-500 hover:bg-red-400 text-white font-bold py-2 px-4 mt-4 rounded cursor-not-allowed " >
          <b>Marked Available</b>
        </button>
      ) : (
        <button className="mark-available-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded" onClick={() => { props.markAvailable(props.index) }}>
          <b>Mark Available</b>
        </button>
      )}
    </div>
  );
};

export default DisplayLandDetails;

import React from 'react';
import './init';

const DisplayRequests = (props) => {
  return (
    <div className='explore-result container border-2 border-gray-400 mx-auto p-4 flex flex-col items-center justify-center w-8/12 h-full bg-teal-400 mt-20 rounded-md'>
      <table className="min-w-full">
        <thead className='bg-white'>
          <tr>
            <th className="px-4 py-2">Survey Number</th>
            <th className="px-4 py-2">Land ID</th>
            <th className="px-4 py-2 justify-center items-center">Requested By</th>
            <th className="px-4 py-2">Division</th>
            <th className="px-4 py-2">District</th>
            <th className="px-4 py-2">City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-4 text-x font-semibold">{props.surveyNo}</td>
            <td className="border px-4 py-4 text-x font-semibold">{props.propertyId}</td>
            <td className="border px-4 py-4 text-x font-semibold">{props.requester}</td>
            <td className="border px-4 py-4 text-x font-semibold">{props.state}</td>
            <td className="border px-4 py-4 text-x font-semibold">{props.district}</td>
            <td className="border px-4 py-4 text-x font-semibold">{props.city}</td>


          </tr>
        </tbody>
      </table>
      <button
        className='accept-req bg-green-500 hover:bg-green-600 text-white px-9 py-2 rounded mt-4  '
        onClick={() => { props.acceptReq(props.index, props.reqNo) }}
      >
        <b>Accept Request</b>
      </button>
    </div>
  );
};

export default DisplayRequests;

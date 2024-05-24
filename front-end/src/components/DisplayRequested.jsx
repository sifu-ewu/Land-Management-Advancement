import React from 'react'
import './init'
import '../css/DisplayLand.css'
const DisplayRequested = (props) => {
  return (
    <>
      <div className='explore-result container mx-auto p-4 flex flex-col items-center border-2 border-gray-400 justify-center w-8/12 h-full bg-teal-400 mt-20 rounded-md'>
      <h3 className="text-xl font-bold text-blue-700 mb-3">Current Owner: {props.owner}</h3>

        <table className="min-w-full">
          <thead className='bg-white'>
            <tr>
              <th className="px-4 py-2">Survey Number</th>
              <th className="px-4 py-2">Land ID</th>
              <th className="px-4 py-2">Market Value</th>
              <th className="px-4 py-2">Size</th>
              <th className="px-4 py-2">Division</th>
              <th className="px-4 py-2">District</th>
              <th className="px-4 py-2">City</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-4 text-x font-semibold">{props.surveyNo}</td>
              <td className="border px-4 py-4 text-x font-semibold">{props.propertyId}</td>
              <td className="border px-4 py-4 text-x font-semibold">{props.marketValue}</td>
              <td className="border px-4 py-4 text-x font-semibold">{props.sqft}</td>
              <td className="border px-4 py-4 text-x font-semibold">{props.state}</td>
              <td className="border px-4 py-4 text-x font-semibold">{props.district}</td>
              <td className="border px-4 py-4 text-x font-semibold">{props.city}</td>


            </tr>
          </tbody>
        </table>

        <button className='bg-gray-500 hover:bg-red-500  text-white font-semibold cursor-not-allowed px-9 py-2 rounded mt-4'><b>Request Pending</b></button>
      </div>
    </>
  )
}

export default DisplayRequested
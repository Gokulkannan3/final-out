import React, { useEffect, useState } from "react";
import Navbar from '../Nav'
import './fetch.css'
import { Link } from "react-router-dom";
import left from '../../components/images/left-arrow-angle-big-gross-symbol.png'


function Content({ data }) {
  
  return (
    <body>
      <div className="tab overflow-x-auto mt-8 shadow-black  md:w-auto md:h-auto">
      <table className="table table-zebra mx-auto w-1/2 text-2xl">
        <thead className="bg-yellow-400 text-black text-2xl">
          <tr>
            <th className="text-center w-1/4">AWB</th>
            <th className="text-center w-1/4">Sender</th>
            <th className="text-center w-1/4">Origin</th>
            <th className="text-center w-1/4">Destination</th>
            <th className="text-center w-1/4">Tracking</th>
          </tr>
        </thead>
        <tbody className='tboby'>
          {data && data.map((item, index) => (
            <tr key={index}>
              <td className="text-center align-middle w-1/4">{item.awb}</td>
              <td className="text-center align-middle w-1/4">{item.sender_data}</td> 
              <td className="text-center align-middle w-1/4">{item.origin_data}</td>
              <td className="text-center align-middle w-1/4">{item.destination_data}</td>
              <td>
                {/* Link to Shipping component with data */}
                <Link
                  to={{
                    pathname: `/shipping/${item.awb}`,
                    state: {
                      awb: item.awb,
                      sender_data: item.sender_data,
                      origin_data: item.origin_data,
                      destination_data: item.destination_data,
                    },
                  }}
                >
                  <button className="btn hover:bg-yellow-400 hover:text-black">
                    Track
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </body>
  );
}

function Fetch() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.43.119:8080/rfid/getall");
        const actualData = await response.json();
        setData(actualData);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();

    const refreshInterval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Content data={data} /> 
       <Link to="/login" ><button className="arrow flex flex-start w-12 -translate-y-60 mt-2 ml-7"><img  src={left} alt="img" /></button></Link>  
    </div>
  );
}

export default Fetch;

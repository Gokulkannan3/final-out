import React, { useState, useEffect } from 'react';
import './ProgressBar.css';
import Navbar from '../Nav';
import { Link, useParams, useLocation } from 'react-router-dom';
import employee from '../../components/images/empl.png'
import './ship.css'
import "react-step-progress-bar/styles.css";
import { ProgressBar,Step } from 'react-step-progress-bar';

const Progress = () => {
  const [apiData, setApiData] = useState({ status: '' });
  const { awbNumber } = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.43.119:8080/rfid/getprod?awb=${awbNumber}`);
        const actualData = await response.json();
        setData(actualData);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchData();
  }, [awbNumber]);
  useEffect(() => {
    const refreshInterval = setInterval(() => {
    console.log("Received Data:", location.state);
    fetch(`http://192.168.43.119:8080/rfid/getstat/${awbNumber}`)
      .then((response) => response.text())
      .then((data) => {
        setApiData({ status: data.trim() });
      })
      .catch((err) => {
        console.log(err);
      });
    }, 1000);

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(refreshInterval);
    };
  }, [awbNumber, location.state]);

  const labels = ['Registered', data.origin_data, data.destination_data, 'Out for delivery'];
  const labelsSt = ['Registered',data.origin_data, data.destination_data, 'Out for delivery'];
  let st=labels[0];
  if(apiData.status==="REGISTERED")st=labels[0];
  else if(apiData.status==="DISPATCHED_1")st=labels[1];
  else if(apiData.status==="DISPATCHED_2")st=labels[2];
  else if(apiData.status==="OUT FOR DELIVERY")st=labels[3];
  

  return (
    <html>
      <body>
      <div className='min-h-screen md:w-auto md:h-auto'>
    
    <Navbar />
    <div className="box w-full ">
    <div className="container ">
    <p className='bus text-white text-7xl mt-32 ml-56'>Business Shipping Tools
      <p className='underline text-yellow-400 -translate-y-14 ml-2'>_____</p>
    </p>
        </div>
        <div>
          
        </div>
<img src={employee} alt="employee" className="im float-right -translate-y-60 -mt-10 w-10 h-10"/>

               
    </div>

      <div className='pro -translate-y-10 md:w-2/4 ms:w-24 ml-96 mt-52 translate-x-96 max-lg:-translate-y-72 '>
      <ProgressBar
        percent={labels.indexOf(st) * 35} // Assumes each step corresponds to 25% progress
        filledBackground="linear-gradient(to right, #5e1b08, #351c15)"
      >
        {labels.map((label, index) => (
          <Step transition="scale">
            {({ accomplished }) => (
              <button
                style={{
                  filter: accomplished ? 'none' : 'grayscale(60%)',
                }}
                
                key={label}
                className={`progress-label ${label === st ? 'active' : ''} text-3xl w-80 h-24 rounded-full`}
                width="90"
                heigth="30"
              >
              {labelsSt[index]}
              </button>
            )}
      
    </Step>
  ))}

</ProgressBar>
{apiData.status === 'OUT FOR DELIVERY' && (
        <Link to='/map'>
          <button className="track bg-amber-400 hover:bg-amber-300 text-4xl ml-96 translate-x-72 h-20 w-auto px-20 rounded-full h-11 w-24 text-black font-semibold mt-80  -translate-y-28">
            Track-Realtime
          </button>
          
        </Link>
      )}

      </div>
    </div>
    </body>
    </html>
  );
};

export default Progress;

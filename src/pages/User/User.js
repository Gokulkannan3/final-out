import React, { useState } from 'react';
import Navbar from '../unav';
import ReactModal from 'react-modal';
import  Axios  from 'axios';
import close from '../../components/images/remove.png'
import './user.css'
/* import Res from './res'; */
/* import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`; */

function User() {
  const [variable, setVariable] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const url ="http://192.168.43.119:8080/rfid/registerproduct"
  /* const [pdfData, setPdfData] = useState(null); */
/*   function onDocumentLoadSuccess({ numPages }) {
    console.log(`Document loaded: ${numPages} pages`);
  } */
  function openModal() {
    setModalIsOpen(true); // Function to open the modal
  }

  function closeModal() {
    setModalIsOpen(false); // Function to close the modal
  }

  const [formData, setFormData] = useState({
    origin_data: '',
    destination_data: '',
    dimensions: '',
    sender_data: '',
    receiver_data: '',
    sender_phone: '',
    receiver_phone: '',
    product_details: '',
  });

  function submit(e){
    e.preventDefault();
    Axios.post(url,formData)
    .then((response) => {
      console.log(response.data);
      setVariable(response.data);
      openModal(); 
      // Handle the response from the backend
    })
    .catch((error) => {
      console.error("Error while sending data:", error);
    });
    }

  function handle(e){
    const newdata={...formData}
    newdata[e.target.id]=e.target.value
    setFormData(newdata)
    console.log(newdata)
  }

  return (
    <div>
      <Navbar />
      <div>
        <h1 className='text-5xl flex justify-center mt-16'>Consignment Details</h1>
        <p className='text-6xl flex justify-center -mt-9 -translate-y-5 -ml-80 text-yellow-400'>____</p>
        <form
          className='grid grid-cols-2 gap-x-24 place-content-center gap-y-20 place-items-center'
          onSubmit={(e)=>submit(e)}
        >
        <div>
          <p className='txt text-2xl'>
            Origin
          </p>
          <input
            type="text"
            id='origin_data'
            name='origin_data'
            placeholder='Sender Origin'
            className='border border-black rounded-lg h-14 w-96 flex text-center text-xl'
            onChange={(e)=>handle(e)}
            value={formData.origin_data}
          />
        </div>
        <div>
          <p className='text-2xl'>
            Destination
          </p>
          <input
            type="text"
            name='destination_data'
            id='destination_data'
            placeholder='Destination'
            className='border border-black rounded-lg h-14 w-96 flex text-center text-xl'
            onChange={(e)=>handle(e)}
            value={formData.destination_data}
          />
        </div>
        <div>
          <p className='text-2xl'>
            Sender Name
          </p>
          <input
            type="text"
            id='sender_data'
            name='sender_data'
            placeholder='Sender Name'
            className='border border-black rounded-lg h-14 w-96 flex text-center text-xl'
            onChange={(e)=>handle(e)}
            value={formData.sender_data}
          />
        </div>
        <div>
          <p className='text-2xl'>
            Receiver Name
          </p>
          <input
            type="text"
            id='receiver_data'
            name='receiver_data'
            placeholder='Receiver Name'
            className='border border-black rounded-lg h-14 w-96 flex text-center text-xl'
            onChange={(e)=>handle(e)}
            value={formData.receiver_data}
          />
        </div>
        <div>
          <p className='text-2xl'>
            Sender phone number
          </p>
          <input
            type="number"
            id='sender_phone'
            name='sender_phone'
            placeholder='Sender phone number'
            className='border border-black rounded-lg h-14 w-96 flex text-center text-xl'
            onChange={(e)=>handle(e)}
            value={formData.sender_phone}
          />
        </div>
        <div>
          <p className='text-2xl'>
            Receiver phone number
          </p>
          <input
            type="number"
            id='receiver_phone'
            name='receiver_phone'
            placeholder='Receiver phone number'
            className='border border-black rounded-lg h-14 w-96 flex text-center text-xl'
            onChange={(e)=>handle(e)}
            value={formData.receiver_phone}
          />
        </div>
        <div>
          <p className='text-2xl'>
            Dimensions (mm)
          </p>
          <input
            type="text"
            id='dimensions'
            name='dimensions'
            placeholder='Dimensions'
            className='border border-black rounded-lg h-14 w-96 flex text-center text-xl'
            onChange={(e)=>handle(e)}
            value={formData.dimensions}
          />
        </div>
        <div>
          <p className='text-2xl'>
            Product details
          </p>
          <input
            type="text"
            id='product_details'
            name='product_details'
            placeholder='Product details'
            className='border border-black rounded-lg h-14 w-96 flex text-center text-xl'
            onChange={(e)=>handle(e)}
            value={formData.product_details}
          />
        </div>
        <div className='submit col-span-2 flex justify-center items-center'>
        <div className='text-center'>
          <button type='submit' className='border-4 text-2xl font-bold rounded-full flex justify-center items-center bg-yellow-400 mt-10 w-36 h-12'>
            Submit
          </button>
          </div>
        </div>

        </form>

        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='PDF Viewer Modal'
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '1000px',
            },
          }}
        >
        <div className='flex justify-end p-3'>
          <button onClick={closeModal} className=''>
            <img src={close} alt='close'/>
          </button>
        </div>
          <iframe
            title='PDF Viewer'
            src={`http://192.168.43.119:8080/rfid/getlabel/${variable}`}
            width='100%'
            height='800px'
            className='fra'
          >
            This browser does not support PDFs. Please download the PDF to view it.
          </iframe>
          
        </ReactModal>
        
      </div>
    </div>
  );
}

export default User;

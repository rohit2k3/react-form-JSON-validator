import React, { useState } from 'react';
import Nav from './components/Nav';
import { AiOutlineMail } from 'react-icons/ai';
import { GrDocumentUpload } from 'react-icons/gr';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Modal from 'react-modal'; // Import react-modal

function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [jsonContent, setJsonContent] = useState(null);
  const [checking, setChecking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal

  const { enqueueSnackbar } = useSnackbar(); // Use the notistack hook

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '2rem', // Use camelCase here
    },
  };
  

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  

  // Initialize react-modal
  Modal.setAppElement('#root');

  function isJSONValid(jsonString) {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setChecking(true);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setTimeout(() => {
          if (isJSONValid(content)) {
            setChecking(false);
            setJsonContent(JSON.parse(content));
          } else {
            setChecking(false);
            setJsonContent({ error: 'Invalid JSON file' });
          }
        }, 2000); // Wait for 2 seconds
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim() || !jsonContent || jsonContent.error) {
      enqueueSnackbar('Please fill in all fields and validate the JSON file.', { variant: 'error' });
      return;
    }

    // Open the modal when everything is correct
    setIsModalOpen(true);
    openModal();
  };

  return (
    <>
      <SnackbarProvider />

      <Nav />
      <div className="mx-4">
        <label
          htmlFor="full-name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Full Name
        </label>
        <input
          placeholder="Full Name"
          type="text"
          id="full-name"
          className="p-2 outline-none bg-gray-50 border h-10 w-full border-gray-300 text-gray-900 text-sm rounded-md"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="mx-4 mt-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <div className="flex justify-center items-center bg-gray-50 border h-10 w-full rounded-md">
          <input
            placeholder="Email"
            type="email"
            id="email"
            className="bg-transparent p-2 w-full outline-none text-gray-900 text-sm rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AiOutlineMail className="text-xl m-2" />
        </div>
      </div>
      {checking ? (
        <div className="mx-4 mt-4">
          <label className="mb-2 text-sm font-medium text-gray-900">
            Upload JSON File
          </label>
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 bg-gray-50 border-dashed cursor-pointer rounded-md">
            <BiLoaderCircle className="text-3xl animate-spin" />
            <p className="m-3 text-gray-500">Validating</p>
          </label>
        </div>
      ) : (
        <div className="mx-4 mt-4">
          <label className="mb-2 text-sm font-medium text-gray-900">
            Upload JSON File
          </label>
          <label
            htmlFor="file-input"
            className="flex flex-col items-center justify-center w-full h-40 border-2 bg-gray-50 border-dashed cursor-pointer rounded-md"
          >
            <GrDocumentUpload className="text-3xl" />
            <p className="m-3 text-gray-500">Browse File</p>
          </label>
          <input
            placeholder="Full Name"
            type="file"
            id="file-input"
            className="sr-only"
            onChange={handleFileUpload}
          />
        </div>
      )}
      <div className="mx-4">
        <label
          htmlFor="file-contents"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          File Contents
        </label>
        <div className="w-full h-40 border-2 bg-gray-50 border-dashed cursor-pointer rounded-md">
          {jsonContent && (
            <pre className="p-4 overflow-auto">
              {JSON.stringify(jsonContent, null, 2)}
            </pre>
          )}
        </div>
        <div className="flex justify-center items-center">
          <button
            data-modal-target="modal"
            data-modal-toggle="modal"
            className="rounded-full bg-blue-800 m-4 text-white h-10 w-full py-2 px-10"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div>
          <Modal  isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Success Modal">
            <div className='w-full h-auto flex flex-col justify-center items-center'>
              <FaCheckCircle className='text-6xl text-blue-800'/>
            <h2 className='text-blue-800 m-2'>Success!</h2>
            <p>524 entries successfully uploaded</p>
            <button className='w-full  h-10 bg-blue-800 text-white m-2 rounded-full' >Go to My Entries</button>
            <button className='w-full  h-10 bg-blue-100 text-blue-800 m-2 rounded-full' onClick={closeModal}>Close</button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
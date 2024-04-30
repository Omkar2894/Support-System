import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [attachmentBase64, setAttachmentBase64] = useState('');

  const userData=JSON.parse(localStorage.getItem("userData"))

  let navigate= useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = { title, description, attachment: attachmentBase64, status: "open", email: userData.email, assignedTo:null };

      const response = await axios.post('http://localhost:3001/tickets', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Ticket saved:', response.data);
      navigate("/ticketlist")
    } catch (error) {
      console.error('Error saving ticket:', error);
    }
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAttachmentBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setAttachment(file);
    }
  };

  return (
    <div className="mx-auto p-4">
      <section className="bg-gray-50">
      <div className='flex justify-between mx-4 my-4 '>
        <Link to="/userpage" className='border-b border-black'>Dashboard</Link>
        
    </div> 
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create Ticket
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Description"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 h-32"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="attachment"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Attachment
                  </label>
                  <input
                    type="file"
                    onChange={handleAttachmentChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit Ticket
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateTicket;

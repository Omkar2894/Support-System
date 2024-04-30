import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [techEmail, setTechEmail] = useState("");


  const userData = JSON.parse(localStorage.getItem("userData"))

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tickets');
      console.log(response.data)
      if (userData.role === "user") {
        let myTickets = response.data.filter((item) => {
          return item.email === userData.email;
        });
        setTickets(myTickets);
      } else if (userData.role === "techsupport") {
        let myTickets = response.data.filter((item) => {
          return item.assignedTo === userData.email;
        });
        setTickets(myTickets);
      } else {
        setTickets(response.data)
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };



  useEffect(() => {
    fetchTickets();

  }, []);

  const handleClose = async (ticket) => {
    console.log("ticket data", ticket);
    try {
      let formData = { title: ticket.title, description: ticket.description, attachment: ticket.attachment, status: "closed", email: ticket.email, assignedTo: ticket.assignedTo };
      const response = await axios.put(`http://localhost:3001/tickets/${ticket.id}`, formData);
      console.log("Response", response.data)
      fetchTickets()
    } catch (error) {
      console.log('Error updating ticket');
      console.error(error);
    }


  }

  const handleAssignTechSupport = async (ticket) => {

    console.log("ticket", ticket);

    try {
      let formData = { title: ticket.title, description: ticket.description, attachment: ticket.attachment, status: "closed", email: ticket.email, assignedTo: techEmail };
      const response = await axios.put(`http://localhost:3001/tickets/${ticket.id}`, formData);
      console.log("Response", response.data)
      fetchTickets()
    } catch (error) {
      console.log('Error updating ticket');
      console.error(error);
    }

  }

  return (
    <div className="mx-auto p-4">
      <div className='flex justify-between mx-4 my-4 '>
        {userData && userData.role === "user" ? (
          <Link to="/userpage" className='border-b border-black'>Dashboard</Link>
        ) : userData && userData.role === "admin" ? (
          <Link to="/adminpage" className='border-b border-black'>Dashboard</Link>
        ) : (
          <Link to="/techsupportpage" className='border-b border-black'>Dashboard</Link>
        )}


      </div>
      <h2 className="text-xl font-bold mb-4">Tickets</h2>
      <ul className="space-y-4">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="bg-white rounded-lg shadow-md p-4">
            <div className='flex justify-between px-4'>
              <h3 className="text-lg font-semibold">{ticket.title}</h3>
              {ticket.status.toLowerCase() === "open" ? <p className='text-red-500'>Open</p> : <p className='text-green-500'>Closed</p>}
            </div>
            <div className='flex justify-end w-full'>
              {ticket.status.toLowerCase() === "open" ? <button className=' border-black bg-slate-300 rounded-sm text-sm px-2' onClick={() => { handleClose(ticket) }}>Close Ticket</button> : null}
            </div>
            <p className="text-gray-700">{ticket.description}</p>
            {ticket.attachment && (
              <img
                src={ticket.attachment}
                alt="Attachment"
                className="mt-2"
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
            )}

            {userData.role === "admin" ?
              <div className="space-y-4 md:space-y-6 flex justify-evenly">
                <div className='w-8/12 mx-2'>
                  <label
                    htmlFor="techSupport"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tech Support Name
                  </label>
                  <input
                    type="email"
                    value={techEmail}
                    onChange={(e) => setTechEmail(e.target.value)}
                    placeholder="Enter Email"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  />
                </div>
                <button
                  onClick={()=> handleAssignTechSupport(ticket)}
                  className="w-44 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Assign Tech Support
                </button>
              </div>
              : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;

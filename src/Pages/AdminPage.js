import React from 'react'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div className='h-screen'>
     
    
    <div className='flex justify-center items-center my-auto h-full'>
      
        <Link to="/ticketlist">
        <button className='mx-4 p-5 border border-black h-24'>
            <p className='text-lg'>List of Tickets</p>
        </button>
        </Link>
    </div>
    </div>
  )
}

export default AdminPage
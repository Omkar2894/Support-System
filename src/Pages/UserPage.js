import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserPage = () => {

    const navigate= useNavigate()
    const handleLogout=()=>{
        localStorage.clear()
        navigate("/")
    }
  return (
    <div className='h-screen'>
     
    
    <div className='flex justify-center items-center my-auto h-full'>
        <Link to="/createticket">
        <button className='mx-4 p-5 border border-blue-600 h-24'>
            <p className='text-lg'>Create New Ticket</p>
        </button>
        </Link>
        <Link to="/ticketlist">
        <button className='mx-4 p-5 border border-black h-24'>
            <p className='text-lg'>List of Tickets</p>
        </button>
        </Link>
    </div>
    </div>
  )
}

export default UserPage
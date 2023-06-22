import React from 'react'
import './success.css'

const Success = () => {
  // await Promise.all(selectedRooms.map((roomId) => {
  //     // const res = axios.put(`http://localhost:8000/api/rooms/availability/${roomId}`, { dates: alldates });
  //     // return res.data;
  // }));

  return (
    <div className='mainS'>
      <div className='cont'>
        Payment Success
      </div>
    </div>
  )
}

export default Success
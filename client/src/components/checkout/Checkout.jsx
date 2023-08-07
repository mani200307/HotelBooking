import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './checkout.css';

const Checkout = () => {
  const location = useLocation();
  const [rooms] = useState(location.state.rooms);
  const [dayCnt] = useState(location.state.dayCnt);
  const [alldates] = useState(location.state.alldates);
  const [selectedRooms] = useState(location.state.selectedRooms);

  console.log(rooms);

  const handleClick = async () => {
    console.log(dayCnt);
    await Promise.all(selectedRooms.map((roomId) => {
      const res = axios.put(`http://localhost:8000/api/rooms/availability/${roomId}`, { dates: alldates });
      return res.data;
    }));
    const res = await axios.post(`https://hotel-app-lp4j.onrender.com/api/payment/gateway`, { rooms, dayCnt });
    console.log(res.data.url);
    window.location = res.data.url;
  }

  return (
    <div className='cart'>
      <div className='cartContainer'>
        <h1 className='titleTxt'>Summary</h1>
        <ul>
          {rooms.map((room) =>
            <li><span className='rName'>{room.roomName[0]}</span>    <span className='price'>{room.cost}$</span><br></br></li>
          )}
        </ul>
        <button className='btn' onClick={handleClick}>Checkout</button>
      </div>
    </div>
  )
}

export default Checkout;
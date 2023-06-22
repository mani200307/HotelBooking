import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './checkout.css';

const Checkout = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState(location.state.rooms);
  const [dayCnt, setDayCnt] = useState(location.state.dayCnt);

  console.log(rooms);

  const handleClick = async () => {
    console.log(dayCnt);
    const res = await axios.post(`http://localhost:8000/api/payment/gateway`, {rooms, dayCnt});
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
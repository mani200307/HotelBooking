import React, { useState } from 'react'
import axios from 'axios';
import Navbar from '../../../components/navbar/Navbar'
import FormInput from '../../../components/formInput/FormInput';
import './deleteHotel.css'
import Header from '../../../components/adminHeader/Header';
import Reserve from '../../../components/reserve/Reserve';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

const DeleteHotel = () => {

  const [name, setName] = useState("");

  const navigate = useNavigate();
  const handleChange = async (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    const resId = await axios.get(`https://hotel-app-lp4j.onrender.com/api/hotels/findHotel/${name}`);
    console.log("Hotel id is ", resId.data);
    const res = await axios.delete(`https://hotel-app-lp4j.onrender.com/api/hotels/${resId.data}`);
    console.log(res);
    window.alert('Hotel deleted Successfully!');
  }

  return (
    <div className='main'>
      <Navbar />
      <Header />
      <div className='appDel'>
        <form onSubmit={handleSubmit}>
          <h1 className='formTitle'>Delete Hotel</h1>
          <label>Hotel name: </label>
          <input type='text' className='inputText' onChange={handleChange} />
          <button className='btn'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default DeleteHotel
import React, { useState } from 'react'
import axios from 'axios';
import Navbar from '../../../components/navbar/Navbar'
import FormInput from '../../../components/formInput/FormInput';
import './addHotel.css'
import Header from '../../../components/adminHeader/Header';
import Reserve from '../../../components/reserve/Reserve';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

const AddHotel = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Enter hotel name",
      label: "Hotel name",
      errorMessage: "It should not include special characters",
      pattern: '^[A-Za-z0-9]{3,15}$',
      required: true
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('https://hotel-app-lp4j.onrender.com/api/hotels', { values });
    window.alert('Data inserted');
    navigate('/admin');
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div className='main'>
      <Navbar />
      <Header />
      <div className='app'>
        <form onSubmit={handleSubmit}>
          <h1 className='formTitle'>Add Hotel</h1>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))}
          <button className='btn'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddHotel
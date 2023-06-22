import React, { useState } from 'react'
import axios from 'axios';
import Navbar from '../../../components/navbar/Navbar'
import FormInput from '../../../components/formInput/FormInput';
import Header from '../../../components/adminHeader/Header';
import Reserve from '../../../components/reserve/Reserve';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import './modifyHotel.css'

const ModifyHotel = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: 0,
    title: "",
    desc: "",
    cheapestPrice: 0
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Enter hotel name",
      label: "Hotel name",
      errorMessage: "It should not include special characters",
      required: true
    },
    {
      id: 2,
      name: "type",
      type: "text",
      placeholder: "Enter hotel type",
      label: "Hotel type"
    },
    {
      id: 3,
      name: "city",
      type: "text",
      placeholder: "Enter city name",
      label: "City"
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Enter address",
      label: "Address"
    },
    {
      id: 5,
      name: "distance",
      type: "text",
      placeholder: "Enter distance",
      label: "Distance"
    },
    {
      id: 6,
      name: "title",
      type: "text",
      placeholder: "Enter title",
      label: "Title"
    },
    {
      id: 7,
      name: "desc",
      type: "text",
      placeholder: "Enter description",
      label: "Desc"
    },
    {
      id: 8,
      name: "cheapestPrice",
      type: "text",
      placeholder: "Enter price",
      label: "CheapestPrice"
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    var newValues = {};
    for(let key in values) {
        if(values[key] != "" && values[key] != 0) {
            newValues[key] = values[key];
        }
    }
    console.log(values.name);
    console.log(newValues);
    const resId = await axios.get(`http://localhost:8000/api/hotels/findHotel/${values.name}`);
    console.log(resId);
    const res = await axios.put(`http://localhost:8000/api/hotels/${resId.data}`, {values});
    console.log(res);
    window.alert('Data updated');
    navigate('/admin');
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value});
  }


  return (
    <div className='main'>
      <Navbar />
      <Header />
      <div className='app'>
        <form onSubmit={handleSubmit}>
          <h1 className='formTitle'>Modify Hotel</h1>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))}
          <button className='btn'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ModifyHotel
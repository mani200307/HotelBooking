import React from 'react'
import './formInput.css'

const FormInput = (props) => {
    const {label, errorMessage, onChange, id, ...inputProps} = props;
    return (
        <div className='formInput'>
            <label className='inputLabel'>{label}</label>
            <input {...inputProps} onChange={onChange} className='inputText'/>
{/* errorMessage: "It should not include special characters", */}
              </div>
    )
}

export default FormInput
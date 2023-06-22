import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './register.css';

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        email: undefined
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://hotel-app-lp4j.onrender.com/api/auth/register', credentials);
            navigate('/login');
        } catch (err) {
            console.log('Registration unsuccessfull');
        }
    }

    return (
        <div className='register'>
            <div className="lContainer">
                <input type='text' placeholder='username' id='username' onChange={ handleChange } className='lInput' />
                <input type='password' placeholder='password' id='password' onChange={ handleChange } className='lInput' />
                <input type="email" placeholder='email' id="email" onChange={ handleChange } className='lInput'/>
                <button onClick={handleClick} className='lButton'>Register</button>
            </div>
        </div>
    );
}


export default Register;
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {

    const { user } = useContext(AuthContext);

    const { dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'LOGOUT' });
            navigate('/');
        } catch (err) {
            console.log('Logout failure!');
        }
    }


    return (
        <div className='navbar'>
            <div className='navContainer'>
                <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
                    <span className='logo'>BookingApp</span>
                </Link>
                {user ? (<div>{user.username} <button onClick={handleClick} className='navButton'>Logout</button></div>)
                 : (<div className='navItems'>
                    <Link to='/register'><button className='navButton'>Register</button></Link>
                    <Link to='/login'><button className='navButton'>Login</button></Link>
                </div>)}
            </div>
        </div>
    )
}

export default Navbar
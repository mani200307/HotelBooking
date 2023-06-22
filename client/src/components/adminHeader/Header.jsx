import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => {
    return (
        <div className="header">
            <div className="items">
                <Link to='/admin' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className='titleAdmin'>
                        <span>Home</span>
                    </div>
                </Link>
                <Link to='/hotel/add' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="item">
                        <span>Add Hotel</span>
                    </div>
                </Link>
                <Link to='/hotel/delete' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="item">
                        <span>Delete Hotel</span>
                    </div>
                </Link>
                <Link to='/hotel/modify' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="item">
                        <span>Modify Hotel</span>
                    </div>
                </Link>
                <Link to='/room/add' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="item">
                        <span>Add Room</span>
                    </div>
                </Link>
                <Link to='/room/delete' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="item">
                        <span>Delete Room</span>
                    </div>
                </Link>
                <Link to='/room/modify' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="item">
                        <span>Modify Room</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}


export default Header
import React from 'react'
import Navbar from '../../../components/navbar/Navbar';
import Header from '../../../components/adminHeader/Header';
import Footer from '../../../components/footer/Footer';
import './adminHome.css'

const AdminHome = () => {
    return (
        <div className='adminMain'>
            <Navbar />
            <Header />
            <div className='homeContainer'>
                {/* Homecontainer */}
            </div>
            <Footer />
        </div>
    );
}


export default AdminHome
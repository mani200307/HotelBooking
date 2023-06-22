import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/client/home/Home';
import Hotel from './pages/client/hotel/Hotel';
import List from './pages/client/list/List';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Checkout from './components/checkout/Checkout';
import Success from './pages/client/paymentStatus/Success';
import Failure from './pages/client/paymentStatus/Failure';
import AdminHome from './pages/admin/home/AdminHome';
import AddHotel from './pages/admin/AddHotel/AddHotel';
import DeleteHotel from './pages/admin/DeleteHotel/deleteHotel';
import ModifyHotel from './pages/admin/ModifyHotel/ModifyHotel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<AdminHome />}/>
        <Route path='/hotel/add' element={<AddHotel />}/>
        <Route path='/hotel/delete' element={<DeleteHotel />}/>
        <Route path='/hotel/modify' element={<ModifyHotel />} />
        <Route path='/room/add' element={<AddHotel />}/>
        <Route path='/room/delete' element={<DeleteHotel />}/>
        <Route path='/room/modify' element={<ModifyHotel />} />
        <Route path='/hotels' element={<List />} />
        <Route path='/hotels/:id' element={<Hotel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Failure />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

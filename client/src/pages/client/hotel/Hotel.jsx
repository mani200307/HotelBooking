import './hotel.css'
import Navbar from '../../../components/navbar/Navbar'
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { SearchContext } from '../../../context/SearchContext'
import { AuthContext } from '../../../context/AuthContext'
import Reserve from '../../../components/reserve/Reserve'

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [openModal, setOpenModal] = useState(false);

  const { data, loading } = useFetch(`https://hotel-app-lp4j.onrender.com/api/hotels/find/${id}`)
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    if (date1 === undefined || date2 === undefined)
      return 0;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(new Date(dates[0]?.endDate), new Date(dates[0]?.startDate));

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate('/login');
    }
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      {
        loading ? ('loading') : (
          <div className='hotelContainer'>
            <div className='hotelWrapper'>
              <button onClick={handleClick} className='bookNow'>Reserve or Book Now!</button>
              <h1 className='hotelTitle'>{data.name}</h1>
              <div className='hotelAddress'>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className='hotelDistance'>
                Excellent location - {data.distance}m from center
              </span>
              <span className='hotelPriceHighlight'>
                Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
              </span>
              <div className='hotelImages'>
                {data.photos?.map(photo => (
                  <div className='hotelImgWrapper'>
                    <img src={photo} alt='' className='hotelImg' />
                  </div>
                ))}
              </div>
              <div className='hotelDetails'>
                <div className='hotelDetailsTexts'>
                  <h1 className='hotelTitle'>{data.title}</h1>
                  <p className='hotelDesc'>
                    {data.desc}
                  </p>
                </div>
                <div className='hotelDetailsPrice'>
                  <h1>Perfect for {days}-night stay!</h1>
                  <span>
                    Located in thereal heart of Krakov, this is an excellent location of score 9.8!
                  </span>
                  <h2>
                    <b>${days * data.cheapestPrice}</b> ({days} nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  )
}

export default Hotel
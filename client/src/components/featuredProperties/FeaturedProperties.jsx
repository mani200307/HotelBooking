import './featuredProperties.css'
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const FeaturedProperties = () => {

    const { data, loading } = useFetch("https://hotel-app-lp4j.onrender.com/api/hotels?featured=true");

    return (
        <div className='fp'>
            {loading ? ('Loading please wait') :
                (
                    <>
                        {
                            data.map((item, index) => (
                                <Link key={index} to={`/hotels/${item._id}`} style={{color: 'inherit', textDecoration: 'none'}}>
                                    <div className='fpItem' key={item._id}>
                                        <img className='fpImg' src={item.photos[0]} alt='' />
                                        <span className='fpName'>{item.name}</span>
                                        <span className='fpCity'>{item.city}</span>
                                        <span className='fpPrice'>Starting from ${item.cheapestPrice}</span>
                                        {item.rating && <div className='fpRating'>
                                            <button>{item.rating}</button>
                                            <span>Excellent</span>
                                        </div>}
                                    </div>
                                </Link>
                            ))}
                    </>
                )}
        </div>
    )
}

export default FeaturedProperties
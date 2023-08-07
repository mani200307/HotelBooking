import { Link, useNavigate } from 'react-router-dom'
import './searchItem.css'
import { useEffect } from 'react'

const SearchItem = ({ item, dates }) => {
    const navigate = useNavigate();

    const gotoHotel = (itemId) => {
        console.log(itemId);
        navigate(`/hotels/${itemId}`, { state: { dates } })
    }

    useEffect(() => {
        console.log(dates);
    }, [])

    return (
        <div className='searchItem'>
            <img
                src={item.photos[0]}
                alt=''
                className='siImg'
            />
            <div className='siDesc'>
                <h1 className='siTitle'>{item.name}</h1>
                <span className='siDistance'>{item.distance}m from center</span>
                <span className='siTaxiOp'>Free airport taxi</span>
                <span className='siSubtitle'>Studio Apartment with Air conditioning</span>
                <span className='siFeatures'>{item.desc}</span>
                <span className='siCancelOp'>Free cancellation</span>
                <span className='siCancelOpSubtitle'>
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className='siDetails'>
                {item.rating && <div className='siRating'>
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>}
                <div className='siDetailTexts'>
                    <span className='siPrice'>${item.cheapestPrice} <span style={{ fontSize: '15px' }}>per night</span></span>
                    <span className='siTaxOp'>Includes taxes and fees</span>
                    <div onClick={() => { gotoHotel(item._id) }}>
                        <button className='siCheckButton'>See availability</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchItem
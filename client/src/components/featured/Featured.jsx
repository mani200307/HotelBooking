import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './featured.css'

const Featured = () => {

    const { data, loading } = useFetch("https://hotel-app-lp4j.onrender.com/api/hotels/findCities");

    return (
        <div className='featured'>
            {loading ? ('Loading please wait') :
                (
                    <>
                        {
                            data.map((cities, index) => (
                                <div key={index} className='featuredItem'>
                                    <Link to='/hotels' state={{ "destination": cities.city }} style={{ color: 'inherit' }}>
                                        <img
                                            src='https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
                                            alt=''
                                            className='featuredImg'
                                        />
                                        <div className='featuredTitles'>
                                            <h1>{cities.city}</h1>
                                            <h1>{cities.count} properties</h1>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </>
                )}
        </div>
    )
}

export default Featured
import './propertyList.css'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom';

const PropertyList = () => {

    const { data, loading, error } = useFetch("https://hotel-app-lp4j.onrender.com/api/hotels/countByType");

    const images = [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/a1/9c/80/essentia-luxury-hotel.jpg?w=700&h=-1&s=1',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsnvObE3Slo5N5HSLuC_h5XAqNTCnjL6dzaQ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr5iR6Ux9sVC3pO517IDDmWe4WmI40yP_RDQ&usqp=CAU',
        'https://media.cntraveler.com/photos/53da60a46dec627b149e66f4/master/pass/hilton-moorea-lagoon-resort-spa-moorea-french-poly--110160-1.jpg'
    ];

    return (
        <div className='pList'>
            {loading ?
                ("Loading please wait") : (
                    <>
                        {data &&
                            images.map((img, i) => (
                                <Link key={i} to='/hotels' state={{ "type": data[i]?.type }} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <div key={i + 43} className='pListItem'>
                                        <img key={i + 5} className='pListImg' src={img} alt='' />
                                        <div key={i + 12} className='pListTitles'>
                                            <h1 key={i}>{data[i]?.type}</h1>
                                            <h2 key={i + 15}>{data[i]?.count} {data[i]?.type}</h2>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}

export default PropertyList
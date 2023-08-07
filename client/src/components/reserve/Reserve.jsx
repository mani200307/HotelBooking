import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './reserve.css';

const Reserve = ({ setOpen, hotelId }) => {
    const { data } = useFetch(`https://hotel-app-lp4j.onrender.com/api/hotels/room/${hotelId}`);

    const [selectedRooms, setSelectedRooms] = useState([]);
    const { dates } = useContext(SearchContext);

    const navigate = useNavigate();

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = [];

        let startTime = start.getTime();
        const endTime = end.getTime();
        while (startTime <= endTime) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
            startTime = date.getTime();
        }

        return dates;
    }

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
    const dayCnt = alldates.length;
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date =>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
    }


    const handleClick = async (e) => {
        // var cost = 0;
        var rooms = [];
        try {
            await Promise.all(selectedRooms.map(async (roomId) => {
                const room = await axios.get(`https://hotel-app-lp4j.onrender.com/api/rooms/roomnum/${roomId}`);
                console.log(room.data);
                rooms.push(room.data);
            }));
            navigate('/checkout', { state: { rooms, dayCnt, alldates, selectedRooms } });
        } catch (err) {
            console.log(err);
        }
        console.log(rooms);
        setOpen(false);
    }

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => setOpen(false)} />
                <span>Select your rooms:</span>
                {data.map((item, i) => (
                    <div key={i} className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item?.title}</div>
                            <div className="rDesc">{item?.desc}</div>
                            <div className="rMax">Max People: <b>{item?.maxPeople}</b></div>
                            <div className="rPrice">{item?.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item?.roomNumbers.map((roomNumber, j) => (
                                <div key={j} className="room">
                                    <label>{roomNumber?.number}</label>
                                    <input type='checkbox' value={roomNumber?._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>
        </div>
    );
}

export default Reserve;
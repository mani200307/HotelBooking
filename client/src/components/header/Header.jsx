import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Link, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'

const Header = ({ type }) => {
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(null)
    const [dates, setDates] = useState([{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openOptions, setOpenOptions] = useState(null)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        navigate('/hotels', { state: { destination, dates, options } })
    }

    
    return (
        <div className='header'>
            <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
                <div>
                    {user!=null && user.isAdmin && <Link to='/admin'><button className='headerBtn'>Admin Panel</button></Link>}
                </div>
                {
                    type !== 'list' &&
                    <>
                        <h1 className='headerTitle'>Discover your dream vacation</h1>
                        <p className='headerDesc'>
                            Get rewarded by 10% discounts on 1st Purchase. Cash on delivery applicable.
                        </p>
                        {!user && <Link to='/login'><button className='headerBtn'>Sign In / Register</button></Link>}
                        <div className='headerSearch'>
                            <div className='headerSearchItem'>
                                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                                <input
                                    type='text'
                                    placeholder='Where are you going?'
                                    className='headerSearchInput'
                                    onChange={e => setDestination(e.target.value)}
                                />
                            </div>
                            <div className='headerSearchItem'>
                                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                                <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(dates[0].endDate, 'dd/MM/yyyy')}`}</span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => {setDates([item.selection]);}}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className='date'
                                />
                                }
                            </div>
                            <div className='headerSearchItem'>
                                <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                                <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>
                                {openOptions && <div className='options'>
                                    <div className='optionItem'>
                                        <span className='optionText'>Adult</span>
                                        <div className='optionCounter'>
                                            <button className='optionCounterButton' disabled={options.adult <= 1} onClick={() => { handleOption('adult', 'd') }}>-</button>
                                            <span className='optionCounterNumber'>{options.adult}</span>
                                            <button className='optionCounterButton' onClick={() => { handleOption('adult', 'i') }}>+</button>
                                        </div>
                                    </div>
                                    <div className='optionItem'>
                                        <span className='optionText'>Children</span>
                                        <div className='optionCounter'>
                                            <button className='optionCounterButton' disabled={options.children <= 0} onClick={() => { handleOption('children', 'd') }}>-</button>
                                            <span className='optionCounterNumber'>{options.children}</span>
                                            <button className='optionCounterButton' onClick={() => { handleOption('children', 'i') }}>+</button>
                                        </div>
                                    </div>
                                    <div className='optionItem'>
                                        <span className='optionText'>Room</span>
                                        <div className='optionCounter'>
                                            <button className='optionCounterButton' disabled={options.room <= 1} onClick={() => { handleOption('room', 'd') }}>-</button>
                                            <span className='optionCounterNumber'>{options.room}</span>
                                            <button className='optionCounterButton' onClick={() => { handleOption('room', 'i') }}>+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className='headerSearchItem'>
                                <button onClick={handleSearch} className='headerBtn'>Search</button>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default Header
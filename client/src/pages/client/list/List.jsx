import './list.css'
import Header from '../../../components/header/Header'
import Navbar from '../../../components/navbar/Navbar'
import { useFetcher, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../../components/searchItem/SearchItem'
import useFetch from '../../../hooks/useFetch'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state == null || location.state.type != null ? "" : location.state.destination);
  const [dates, setDates] = useState(location.state == null || location.state.destination != null || location.state.type != null ? [{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }
  ] : location.state.dates);
  const [type, setType] = useState(location.state == null || location.state.type == null ? "" : location.state.type);
  const [options, setOptions] = useState(location.state == null || location.state.destination != null || location.state.type != null ? {
    adult: 1,
    children: 0,
    room: 1
  } : location.state.options);
  const [openDate, setOpenDate] = useState(null);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  let url = `https://hotel-app-lp4j.onrender.com/api/hotels?city=${destination}&min=${min || 0}&max=${max || 900}`;
  if (location.state.destination == null)
    url = `https://hotel-app-lp4j.onrender.com/api/hotels/type/${type}`

  const { data, loading, error, reFetch } = useFetch(url);

  const handleClick = () => {
    reFetch();
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label>Destination</label>
              <input type='text' placeholder={destination} onChange={e => setDestination(e.target.value)} />
            </div>
            <div className='lsItem'>
              <label>Check In Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(dates[0].endDate, 'dd/MM/yyyy')}`}
              </span>
              {openDate && <DateRange
                onChange={item => setDates([item.selection])}
                ranges={dates}
                minDate={new Date()}
              />}
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Min price <small>per night</small>
                  </span>
                  <input type='number' onChange={e => setMin(e.target.value)} className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Max price <small>per night</small>
                  </span>
                  <input type='number' onChange={e => setMax(e.target.value)} className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Adult
                  </span>
                  <input type='number' min={1} className='lsOptionInput' placeholder={options.adult} />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Children
                  </span>
                  <input type='number' min={0} className='lsOptionInput' placeholder={options.children} />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Room
                  </span>
                  <input type='number' min={1} className='lsOptionInput' placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className='listResult'>
            {
              loading ? 'Loading!' :
                <>
                  {data.map((item) => (
                    <SearchItem item={item} key={item._id} />
                  ))}
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;
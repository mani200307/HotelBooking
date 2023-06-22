import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

export const createHotel = async (req, res, next) => {
    try {
        const newHotel = new Hotel(req.body.values);
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    } catch (error) {
        console.log(error);
        res.status(200).send('Error');
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        console.log(req.body.values);
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body.values }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel deleted successfully!")
    } catch (error) {
        next(error)
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}

export const getHotelByName = async (req, res, next) => {
    try {
        const hotel = await Hotel.find({name: req.params.name});
        const hotelName = hotel[0]._id;
        res.status(200).send(hotelName);
    } catch (error) {
        res.status(200).send("Hotel not found");
        next(error);
    }
}

export const getHotelsByType = async (req, res, next) => {
    try {
        const hotel = await Hotel.find({type: req.params.type});
        res.status(200).json(hotel);
    } catch (error) {
        res.status(200).send("Hotel not found");
        next(error);
    }
}

export const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        if(req.query.city == '') {
            const hotels = await Hotel.find({}).limit(req.query.limit);
            res.status(200).json(hotels);    
        }
        else {
            const hotels = await Hotel.find({
                ...others,
                cheapestPrice: { $gt: min | 1, $lt: max | 900 },
            }).limit(req.query.limit);
            res.status(200).json(hotels)    
        }
    } catch (error) {
        next(error)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',');
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const getCitiesCount = async (req, res, next) => {
    const cities = await Hotel.distinct("city");
    const cityCounts = [];
    for(let i=0;i<cities.length;i++) {
        let city = {};
        city['city'] = cities[i];
        city['count'] = await Hotel.count({'city': cities[i]});
        cityCounts.push(city);
    }
    res.status(200).send(cityCounts);
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const restaurantCount = await Hotel.countDocuments({ type: "restaurant" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "restaurant", count: restaurantCount },
            { type: "villa", count: villaCount },
        ]);

    } catch (error) {
        next(error)
    }
}

export const getHotelRoom = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room);
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err)
    }
}
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}


export const findMainRoom = async (req, res, next) => {
    const roomNums = req.params.id.split(',');
    try {
        const room = await Promise.all(roomNums.map(roomNum => {
            return Room.find({ 'roomNumbers._id': roomNum });
        }))
        console.log(room);
        const roomNum = room.map(num => {
            return num[0]._id;
        })
        const roomName = room.map(name => {
            return name[0].title;
        })
        const cost = room.reduce((sum, num) => {
            return sum + num[0].price;
        }, 0)
        res.status(200).json({roomName ,roomNum, cost});
    } catch (error) {
        next(error)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne({ 'roomNumbers._id': req.params.id }, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        });
        res.status(200).json("Room status has been updated!");
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);

        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
        } catch (err) {
            next(err);
        }
        
        res.status(200).json("Room deleted successfully!")
    } catch (error) {
        next(error)
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}

export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}
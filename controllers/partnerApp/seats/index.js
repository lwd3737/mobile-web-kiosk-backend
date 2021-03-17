const { Room, Seat } = require(__base + '/models');

const seats = {};

seats.getSeats = async (req, res) => {
    try{
        const { roomId } = req.params;
        const { partnerId } = req.query; //향후 session으로 교체

        const room = await Room.findOne({
            partnerId,
            id: roomId
        });
        const seats = await room.getSeats();

        if(!seats || seats.length === 0){
            return res.status(404)
                .json({
                    errorMessage: '좌석이 존재하지 않습니다.'
                })
        };

        return res.status(200)
            .json(seats)
    } catch(e){
        console.error(e.message);
        return res.status(500)
            .json({
                errorMessage: e.message
            })
    }
}

seats.createSeats = async (req, res) => {
    try{
        const { roomId } = req.params;
        const { partnerId, seats } = req.body;
        console.log('seats: ', seats);

        if(!seats || seats.length === 0){
            return res.status(400)
                .json({
                    errorMessage: '생성된 좌석이 없습니다.'
                });
        }

        const room  = await Room.findOne({
            where: {
                partnerId,
                id: roomId
            }
        });

        if(!room){
            return res.status(404)
                .json({
                    errorMessage: '공간이 존재하지 않습니다.'
                });
        }

        const createdSeats = await Seat.bulkCreate(seats);

        await room.setSeats(createdSeats);
        await Seat.updateRoomSeatCount(room, createdSeats);

        return res.status(201)
            .json(createdSeats);

    } catch(e){
        console.error(e.message);
        return res.status(500)
            .json({
                errorMessage: e.message
            })
    }
}

seats.modifySeats = async (req, res) => {
    try{
        const { roomId } = req.params;
        const { partnerId, seats } = req.body;
        console.log('seats: ', seats);

        if(!seats || seats.length === 0){
            return res.status(400)
                .json({
                    errorMessage: '수정된 좌석이 없습니다.'
                });
        }

        const room  = await Room.findOne({
            where: {
                partnerId,
                id: roomId
            }
        });

        if(!room){
            return res.status(404)
                .json({
                    errorMessage: '공간이 존재하지 않습니다.'
                });
        }

        await Seat.destroy({
            where: {
                roomId
            }
        });
        
        const createdSeats = await Seat.bulkCreate(seats);

        await room.setSeats(createdSeats);
        await Seat.updateRoomSeatCount(room, createdSeats);

        return res.status(201)
            .json(createdSeats);

    } catch(e){
        console.error(e.message);
        return res.status(500)
            .json({
                errorMessage: e.message
            })
    }
}

module.exports = seats;
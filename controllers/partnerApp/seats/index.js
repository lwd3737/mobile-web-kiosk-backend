const { Room, Seat } = require(__base + '/models');

const seats = {};

seats.getSeatsForm = async (req, res) => {
    try{
        const { roomId } = req.params;
        const { partnerId } = req.body; //향후 session으로 교체

        const seats = await Seat.findAll({
            where: {
                partnerId,
                roomId
            },
        });

        if(!seats || seats.length === 0){
            return res.status(404)
                .json({
                    errorMessage: 'seats does not exist'
                })
        };

        return res.stats(200)
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

        const room  = await Room.findOne({
            where: {
                partnerId,
                roomId
            }
        });

        if(room.seatCount !== seats.length){
            return res.status(400)
                .json({
                    errorMessage: '생성된 공간의 좌석 개수와 생성된 좌석의 개수가 일치하지 않습니다'
                });
        }

        if(!room){
            return res.status(404)
                .json({
                    errorMessage: '공간이 존재하지 않습니다.'
                });
        }

        await room.setSeats(seats);
        const createdSeats = await room.getSeats();
        console.log('seats: ', createdSeats);

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
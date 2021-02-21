const { Op } = require('sequelize');
const { Room } = require(__base + '/models');

const room = {};

room.getRoomList = async (req, res) => {
    try{
        const rooms = await Room.findAll({
            where: {
                partnerId: 1 //나중에 세션으로 저장
            },
            attributes: ['id', 'number', 'name', 'seatCount']
        });

        if(rooms.length === 0){
            return res.status(404)
                .json({
                    errorMessage: 'rooms not exist'
                });
        }
    
        return res.status(200)
            .json(rooms);
    } catch(e){
        console.log('e: ', e);
        return res.status(400)
            .json({
                errorMessage: e.message
            });
    }

}

room.createRoom = async (req, res) => {
    const { number, name, colSeatCount, rowSeatCount, partnerId } = req.body;

    try{
        let room = await Room.findOne({
            where: {
                partnerId,
                [Op.or]: [
                    { number },
                    { name }
                ]
            }
        });

        console.log('room: ', room);
        if(room){
            return res.status(400)
                .json({
                    errorMessage: 'room number or name is already exist'
                });
        }

        room = await Room.create({
            number,
            name,
            colSeatCount,
            rowSeatCount,
        });
        
        return res.status(201)
            .json({
                ...room.dataValues
            });

    } catch(e){
        console.log('e: ', e);

        return res.status(400)
            .json({
                errorMessage: e.message
            });
    }
};

module.exports = room;
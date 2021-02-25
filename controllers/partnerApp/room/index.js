const { Op } = require('sequelize');
const { Room } = require(__base + '/models');

const room = {};

room.getRoomList = async (req, res) => {
    const { partnerId } = req.query;

    try{
        const rooms = await Room.findAll({
            where: {
                partnerId //나중에 세션으로 저장
            },
            attributes: ['id', 'number', 'name', 'colSeatCount', 'rowSeatCount' ,'seatCount']
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
        console.error('error: ', e);

        return res.status(500)
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
            },
            attributes: ['id', 'number', 'name', 'colSeatCount', 'rowSeatCount', 'seatCount']
        });

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

        room.setPartner(partnerId);
        
        return res.status(201)
            .json({
                ...room.dataValues
            });

    } catch(e){
        console.error('error: ', e);

        return res.status(500)
            .json({
                errorMessage: e.message
            });
    }
};

room.getRoomForm = async (req, res) => {
    const { roomId } = req.params;
    const { partnerId } = req.query;

    try{
        const room = await Room.findOne({
            where: {
                id: roomId,
                partnerId,
            }
        })

        if(!room){
            return res.status(404)
                .json({
                    errorMessage: 'this room does not exist'
                })
        }

        const { id, number, name, colSeatCount, rowSeatCount } = room;

        return res.status(200)
            .json({
                id,
                number,
                name,
                colSeatCount,
                rowSeatCount,
                seatCount
            });

    } catch(e){
        console.log('e: ', e);
        console.error(e.message);

        return res.status(500)
            .json({
                errorMessage: e.message
            })
    }
}

room.modifyRoom = async (req, res) => {

}

module.exports = room;
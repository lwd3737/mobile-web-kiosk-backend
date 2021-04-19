const { Op } = require("sequelize");
const { Room, Seat } = require(__base + "/models");

const rooms = {};

rooms.getRoomList = async (req, res) => {
  try {
    const { partnerId } = req.query;

    const rooms = await Room.findAll({
      where: {
        partnerId, //나중에 세션으로 저장
      },
      attributes: [
        "id",
        "number",
        "name",
        "colSeatCount",
        "rowSeatCount",
        "seatCount",
      ],
      include: {
        model: Seat,
      },
    });

    if (rooms.length === 0) {
      return res.status(404).json({
        errorMessage: "rooms not exist",
      });
    }

    const roomsData = rooms.map((room) => {
      console.log("seats in use:", room.countSeatsInUse());
      const data = {
        ...room.dataValues,
        hasSeats: room.hasSeats(),
        seatCountInUse: room.hasSeats() ? room.countSeatsInUse() : 0,
      };

      delete data.Seats;

      return data;
    });
    //console.log('rooms data: ', roomsData);

    return res.status(200).json(roomsData);
  } catch (e) {
    console.error(e.message);

    return res.status(500).json({
      errorMessage: e.message,
    });
  }
};

rooms.createRoom = async (req, res) => {
  try {
    const { number, name, colSeatCount, rowSeatCount, partnerId } = req.body;

    let [room, created] = await Room.findOrCreate({
      where: {
        partnerId,
        [Op.or]: [{ number }, { name }],
      },
      defaults: {
        number,
        name,
        colSeatCount,
        rowSeatCount,
      },
    });

    if (!created) {
      return res.status(400).json({
        errorMessage: "room number or name is already exist",
      });
    }

    return res.status(201).json({
      ...room.dataValues,
    });
  } catch (e) {
    console.error(e.message);

    return res.status(500).json({
      errorMessage: e.message,
    });
  }
};

rooms.getRoomForm = async (req, res) => {
  const { roomId } = req.params;
  const { partnerId } = req.query;

  try {
    const room = await Room.findOne({
      where: {
        id: roomId,
        partnerId,
      },
    });

    if (!room) {
      return res.status(404).json({
        errorMessage: "this room does not exist",
      });
    }

    const { id, number, name, colSeatCount, rowSeatCount, seatCount } = room;

    return res.status(200).json({
      id,
      number,
      name,
      colSeatCount,
      rowSeatCount,
      seatCount,
    });
  } catch (e) {
    console.error(e.message);

    return res.status(500).json({
      errorMessage: e.message,
    });
  }
};

rooms.modifyRoom = async (req, res) => {
  try {
    const {
      id,
      number,
      name,
      colSeatCount,
      rowSeatCount,
      partnerId,
    } = req.body;

    const seatCount = colSeatCount * rowSeatCount;

    const [roomCount] = await Room.update(
      {
        number,
        name,
        colSeatCount,
        rowSeatCount,
        seatCount,
      },
      {
        where: {
          id,
          partnerId,
        },
      }
    );

    if (roomCount === 0) {
      return res.status(404).json({
        errorMessage: "this room does not exist",
      });
    }

    return res.json({
      id,
      name,
      number,
      colSeatCount,
      rowSeatCount,
      seatCount,
    });
  } catch (e) {
    console.error(e.message);

    return res.status(500).json({
      errorMessage: e.message,
    });
  }
};

rooms.deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { partnerId } = req.body;

    const deletedCount = await Room.destroy({
      where: {
        id: roomId,
        partnerId,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        errorMessage: "There is no Room to delete",
      });
    }

    return res.status(200).json({
      id: roomId,
    });
  } catch (e) {
    console.error(e.message);

    return res.status(500).json({
      errorMessage: e.message,
    });
  }
};

module.exports = rooms;

const { Room, Seat } = require(__base + "/models");

const rooms = {};

rooms.getRoomList = async (req, res) => {
  const { partnerId } = req.params;

  const rooms = await Room.findAll({
    where: {
      partnerId,
    },
    attributes: [
      "id",
      "number",
      "name",
      "rowSeatCount",
      "colSeatCount",
      "seatCount",
      "partnerId",
    ],
    include: [Seat],
  });

  if (!rooms || rooms.length === 0) {
    return res.status(404).json({
      errorMessage: "공간이 존재하지 않습니다.",
    });
  }

  return res.status(200).json(
    rooms.map((room) => {
      const {
        id,
        number,
        name,
        rowSeatCount,
        colSeatCount,
        seatCount,
        partnerId,
      } = room;

      return {
        id,
        number,
        name,
        rowSeatCount,
        colSeatCount,
        seatCount,
        partnerId,
        seatsInUseCount: room.countSeatsInUse(),
      };
    })
  );
};

module.exports = rooms;

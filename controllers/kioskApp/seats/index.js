const { Room, Seat } = require(__base + "/models");

const seats = {};

seats.getSeatList = async (req, res) => {
  const { partnerId, roomId } = req.params;

  const room = await Room.findOne({
    where: {
      id: roomId,
      partnerId,
    },
    attributes: ["id"],
    include: [
      {
        model: Seat,
        attributes: [
          "id",
          "number",
          "x",
          "y",
          "isAvailable",
          "useticketIdInUse",
          "roomId",
        ],
      },
    ],
  });

  if (!room) {
    return res.status(404).json({
      errorMessage: "공간이 존재하지 않습니다.",
    });
  }

  return res.status(200).json({ roomId, seats: room.Seats });
};

module.exports = seats;

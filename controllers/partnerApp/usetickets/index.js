const { UseTicketDefinition, UseTicket, Partner } = require(__base + "/models");

const usetickets = {};

usetickets.getUseTicketDefinitions = async (req, res) => {};

usetickets.createUseTicketDefinition = async (req, res) => {
  try {
    const { partnerId, inputs } = req.body;
    const { name, periodUnit, period, price } = inputs;

    const partner = await Partner.findByPk(partnerId);

    if (!partner) {
      return res
        .status(404)
        .json({ errorMessage: "파트너가 존재하지 않습니다." });
    }

    const useticketDefinition = await UseTicketDefinition.create({
      partnerId,
      name,
      periodUnit,
      period,
      price,
    });

    useticketDefinition.setPartner(partner);

    return res.status(201).json({ ...useticketDefinition.dataValues });
  } catch (e) {
    console.error(e.message);

    return res.status(500).json({ errorMessage: e.message });
  }
};

usetickets.deleteUseTicketDefinition = async (req, res) => {};

usetickets.modifyUseTicketDefinition = async (req, res) => {};

module.exports = usetickets;

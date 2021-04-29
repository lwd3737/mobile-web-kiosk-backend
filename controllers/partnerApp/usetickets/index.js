const {
  UseTicketCategory,
  UseTicketDefinition,
  UseTicket,
  Partner,
} = require(__base + "/models");

const usetickets = {};

//usetickets.getUseTicketCategories = async (req, res) => {};

usetickets.createUseTicketCatetory = async (req, res) => {
  try {
    const { partnerId, name } = req.body;

    const partner = await Partner.findByPk(partnerId);

    if (!partner) {
      return res
        .status(404)
        .json({ errorMessage: "존재하지 않는 계정입니다." });
    }

    const useticketCategory = await UseTicketCategory.create({
      partnerId,
      name,
    });

    console.log("useticket category: ", useticketCategory);

    return res.status(201).json({ ...useticketCategory.dataValues });
  } catch (e) {
    console.error(e.message);

    return res.status(500).json({ errorMessage: e.message });
  }
};

//usetickets.deleteUseTicketCategory = async (req, res) => {};

usetickets.getUseTicketDefinitions = async (req, res) => {
  try {
    const { partnerId } = req.query;

    const useticketDefinitions = await UseTicketDefinition.findAll({
      where: {
        partnerId,
      },
      attributes: ["id", "name", "periodUnit", "period", "price"],
    });

    if (!useticketDefinitions || useticketDefinitions.length === 0) {
      return res
        .status(404)
        .json({ errorMessage: "등록된 이용권이 존재하지 않습니다." });
    }

    console.log("useticket: ", useticketDefinitions);
    return res
      .status(200)
      .json({ useticketDefinitions: useticketDefinitions.dataValues });
  } catch (e) {
    console.error(e.message);

    return res.status(500).json({ errorMessage: e.message });
  }
};

usetickets.createUseTicketDefinition = async (req, res) => {
  try {
    const { partnerId, inputs } = req.body;
    const { useticketCategoryId, name, periodUnit, period, price } = inputs;

    const partner = await Partner.findByPk(partnerId);

    if (!partner) {
      return res
        .status(404)
        .json({ errorMessage: "존재하지 않는 계정입니다." });
    }

    const useticketCategory = await UseTicketCategory.findByPk(
      useticketCategoryId
    );

    if (!useticketCategory) {
      return res
        .status(404)
        .json({ errorMessage: "해당 이용권 카테고리가 존재하지 않습니다." });
    }

    if (
      periodUnit !== "H" &&
      periodUnit !== "D" &&
      periodUnit !== "W" &&
      periodUnit !== "M"
    ) {
      return res
        .status(400)
        .json({ errorMessage: "이용시간 단위가 잘못 입력되었습니다." });
    }

    const useticketDefinition = await UseTicketDefinition.create({
      partnerId,
      name,
      periodUnit,
      period,
      price,
    });

    useticketDefinition.setPartner(partner);
    useticketDefinition.setUseTicketCategory(useticketCategory);

    {
      const {
        id,
        name,
        periodUnit,
        period,
        price,
      } = useticketDefinition.dataValues;

      return res.status(201).json({ id, name, periodUnit, period, price });
    }
  } catch (e) {
    console.error(e.message);

    return res.status(500).json({ errorMessage: e.message });
  }
};

usetickets.deleteUseTicketDefinition = async (req, res) => {};

usetickets.modifyUseTicketDefinition = async (req, res) => {};

module.exports = usetickets;

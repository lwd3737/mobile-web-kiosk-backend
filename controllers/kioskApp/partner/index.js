const { Partner } = require(__base + '/models');

const partner = {};

partner.getPartnerData = async (req, res) => {
    const { partnerId } = req.params;

    const partner = await Partner.findByPk(partnerId, {
        attributes: ['id', 'serviceName']
    });
    if(partner === null){
        return res.status(404)
            .json({ errorMessage: 'partner record not exist' });
    } 
    
    //console.log('partner record:', partner);
    const { id, serviceName } = partner;

    return res.status(200)
        .json({
            id,
            serviceName
        });
    
};

module.exports = partner;
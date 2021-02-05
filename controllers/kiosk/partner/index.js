const partner = {};

partner.getPartnerData = async(req, res) => {
    res.send('home: ' + req.params.partnerId);
};

module.exports = partner;
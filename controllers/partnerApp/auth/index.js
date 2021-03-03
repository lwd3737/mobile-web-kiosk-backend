const { Partner, User } = require(__base + '/models');

const auth = {};

auth.login = async (req, res) => {
    const { ownerId } = req.body;

    //향후 카카오 로그인으로 구현
    const partner = await Partner.findOne({
        where: {
            ownerId
        }
    });
    if(!partner){
        return res.status(404)
            .json({ errorMessage: 'user record not exist' });
    }

    console.log('partner: ', partner);

    return res.status(200)
        .json({...partner.dataValues});
}

module.exports = auth;
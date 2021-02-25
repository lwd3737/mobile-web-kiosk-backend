const { Partner, User } = require(__base + '/models');

const auth = {};

auth.login = async (req, res) => {
    const { username } = req.body;

    //향후 카카오 로그인으로 구현
    const partner = await Partner.findOne({
        include: {
            model: User,
            as: 'owner',
            where: {
                username
            }
        }
    });
    if(partner === null){
        return res.status(404)
            .json({ errorMessage: 'user record not exist' });
    }

    return res.status(200)
        .json({...partner.dataValues});
}

module.exports = auth;
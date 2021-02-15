const { User } = require(__base + '/models');

const auth = {};

auth.login = async (req, res) => {

    //향후 카카오 로그인으로 구현
    const user = await User.findOne({
        where: {
            username: 'limwondong'
        }
    });
    if(user === null){
        return res.status(404)
            .json({ errorMessage: 'user record not exist' });
    }

    return res.status(200)
        .json({...user.dataValues});
}

module.exports = auth;
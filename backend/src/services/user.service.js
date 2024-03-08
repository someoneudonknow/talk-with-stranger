'use strict';

const { BadRequestError, NotFoundError } = require('../core/error.response');
const db = require('../db/init.mysql');

class UserService {
    //param of async is accessToken (I don't know it is an id of token or accessToken)
    static getUserInfo = async(userID) => {
        if(!userID) throw new BadRequestError('Invalid userID');

        const foundUser = await db.User.findOne({
            where: {
                id: userID,
            }
        });
        if(!foundUser) throw new NotFoundError('User not found');
        return foundUser;
    }
}

module.exports = UserService;
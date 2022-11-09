var jwt = require('jsonwebtoken');
const Users = require('../users/model');

exports.verifyToken = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).end('Unauthorized');
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'shhhhh');
    if (!decoded) return res.status(401).end('Unauthorized');
    const user = await Users.findOne({ where: { id: decoded.user.id } });
    if (!user) return res.status(401).end('Unauthorized');
    req.user = user;
    return next();
};

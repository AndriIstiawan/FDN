const Users = require('./model');
const { register } = require('./validation');
const bcrypt = require('bcrypt');
const saltRounds = 5;
var jwt = require('jsonwebtoken');

// Retrieve all Tutorials from the database.
exports.register = async (req, res) => {
    // #swagger.tags = ['User API']
    let { error, value } = register(req.body);
    if (error) return res.status(400).json({ staus: false, message: error.message });
    try {
        value.password = await bcrypt.hash(value.password, saltRounds);
        await Users.create(value);
        return res.status(201).json({ status: true, message: 'success' });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message || 'Some error occurred while creating the Tutorial.' });
    }
};

// Find all published Tutorials`
exports.login = async (req, res) => {
    // #swagger.tags = ['User API']
    let { error, value } = register(req.body);
    if (error) return res.status(400).json({ staus: false, message: error.message });
    try {
        let user = await Users.findOne({ where: { username: value.username } });
        if (!user) return res.status(404).json({ status: false, message: 'username or password is false' });
        const result = await bcrypt.compare(value.password, user.password);
        if (!result) return res.status(404).json({ status: false, message: 'username or password is false' });
        delete user.dataValues.password;
        return res.status(200).json({ status: true, message: 'success', jwt : jwt.sign({ user: user }, 'shhhhh') });
    } catch (error) {
        return res.status(500).send({ status: false, message: 'username or password is false' });
    }  
};

exports.profile = async (req, res) => {
    // #swagger.tags = ['User API']
    try {
        return res.status(200).json({ status: true, message: 'success', data: req.user });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }  
};

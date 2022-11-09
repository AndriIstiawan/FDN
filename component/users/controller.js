const Users = require('./model');
const { register } = require('./validation');
const bcrypt = require('bcrypt');
const saltRounds = 5;
var jwt = require('jsonwebtoken');

// Retrieve all Tutorials from the database.
exports.register = async (req, res) => {
    // #swagger.tags = ['User API']
    // #swagger.summary = 'create user atau craete user toko dengan menambahkan field nama_toko'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'field nama_toko untuk user toko',
                schema: {
                    username: 'barang baru',
                    password: 'barang baru',
                    nama_toko: 'barang baru',
                }
        } */
    let { error, value } = register(req.body);
    if (error) return res.status(400).json({ staus: false, message: error.message });
    try {
        value.password = await bcrypt.hash(value.password, saltRounds);
        await Users.create(value);
        /* #swagger.responses[201] = {
            description: 'create successfully.',
            schema: {
                status: true,
                message: 'success'
            }
        } */
        return res.status(201).json({ status: true, message: 'success' });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message || 'Some error occurred while creating the Tutorial.' });
    }
};

// Find all published Tutorials`
exports.login = async (req, res) => {
    // #swagger.tags = ['User API']
    // #swagger.summary = 'login user'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'api login user',
                schema: {
                    username: 'barang baru',
                    password: 'barang baru'
                }
        } */
    let { error, value } = register(req.body);
    if (error) return res.status(400).json({ staus: false, message: error.message });
    try {
        let user = await Users.findOne({ where: { username: value.username } });
        if (!user) return res.status(404).json({ status: false, message: 'username or password is false' });
        const result = await bcrypt.compare(value.password, user.password);
        if (!result) return res.status(404).json({ status: false, message: 'username or password is false' });
        delete user.dataValues.password;
        /* #swagger.responses[200] = {
            description: 'successfully.',
            schema: {
                status: true,
                message: 'success',
                jwt: 'sadsadwmdsadmaskdsdssa'
            }
        } */
        return res.status(200).json({ status: true, message: 'success', jwt : jwt.sign({ user: user }, 'shhhhh') });
    } catch (error) {
        return res.status(500).send({ status: false, message: 'username or password is false' });
    }  
};

exports.profile = async (req, res) => {
    // #swagger.tags = ['User API']
    // #swagger.summary = 'get profile user'
    try {
        /* #swagger.responses[200] = {
            description: 'successfully.',
            schema: {
                status: true,
                message: 'success',
                data: { $ref: '#/definitions/Users' }
            }
        } */
        return res.status(200).json({ status: true, message: 'success', data: req.user });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }  
};

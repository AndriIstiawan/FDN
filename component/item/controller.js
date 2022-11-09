const Item = require('./model');
const User = require('../users/model');
const { create } = require('./validation');

// Retrieve all Tutorials from the database.
exports.create = async (req, res) => {
    // #swagger.tags = ['Item API']
    let { error, value } = create(req.body);
    if (error) return res.status(400).json({ staus: false, message: error.message });
    try {
        value.userId = req.user.id;
        await Item.create(value);
        return res.status(201).json({ status: true, message: 'success' });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message || 'Some error occurred while creating the Tutorial.' });
    }
};

// Find all published Tutorials`
exports.getAll = async (req, res) => {
    // #swagger.tags = ['Item API']
    try {
        let item = await Item.findAll({
            include: User
        });
        return res.status(200).json({ status: true, message: 'success', data: item });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }  
};

exports.getme = async (req, res) => {
    // #swagger.tags = ['Item API']
    try {
        let item = await Item.findAll({
            where: {
                userId: req.user.id
            }
        });
        return res.status(200).json({ status: true, message: 'success', data: item });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }  
};

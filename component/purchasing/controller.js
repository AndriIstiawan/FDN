const Purchasing = require('./model');
const User = require('../users/model');
const Item = require('../item/model');
const { create } = require('./validation');
const Sequelize = require('sequelize');
const { fn, col } = Purchasing.sequelize;

// Retrieve all Tutorials from the database.
exports.create = async (req, res) => {
    // #swagger.tags = ['Purchasing API']
    // #swagger.summary = 'create purchasing'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    itemId: '123-abc',
                }
        } */
    let { error, value } = create(req.body);
    if (error) return res.status(400).json({ staus: false, message: error.message });
    try {
        value.userId = req.user.id;
        const itemUser = await Item.findOne({
            where: {
                id: value.itemId
            }
        });
        if (!itemUser) return res.status(404).send({ status: false, message: 'item not found' });
        const result = await Purchasing.create(value);
        return res.status(201).json({ 
            status: true, 
            message: 'success', 
            data: { kode_traksaksi: result.id }
        });
    } catch (error) {
        return res.status(500).send({ message: error.message || 'Some error occurred while creating the Tutorial.' });
    }
};

// Find all published Tutorials
exports.findAll = async (req, res) => {
    // #swagger.tags = ['Purchasing API']
    // #swagger.summary = 'findAll purchasing by user toko'
    try {
        const data = await Purchasing.findAll({
            include: [{
                model: Item,
                where: {
                    userId: req.user.id,
                },
            },     
            User],
        });
        return res.status(200).json({ 
            status: true, 
            message: 'success', 
            data: data
        });
    } catch (error) {
        return res.status(500).send({ message: error.message || 'Some error occurred while creating the Tutorial.' });
    }
};

// Find all published Tutorials
exports.findAllUser = async (req, res) => {
    // #swagger.tags = ['Purchasing API']
    // #swagger.summary = 'findAll pelanggan setia'
    try {
        let data = await Purchasing.count({
            include: [{
                model: Item,
                where: {
                    userId: req.user.id,
                },
                attributes: [], 
            }],
            attributes: ['userId'], 
            group: 'purchasing.userId',
        });

        for (let i = 0; i < data.length; i++) {
            let user = await User.findByPk(data[i].userId, {
                attributes: ['username']
            });
            data[i].user = user.dataValues.username;
            data[i].order = data[i].count;
            delete data[i].userId;
            delete data[i].count;
        }
          
        return res.status(200).json({ 
            status: true, 
            message: 'success', 
            data: data.sort((a, b) => b.order - a.order)
        });
    } catch (error) {
        return res.status(500).send({ message: error.message || 'Some error occurred while creating the Tutorial.' });
    }
};

exports.findAllDate = async (req, res) => {
    // #swagger.tags = ['Purchasing API']
    // #swagger.summary = 'findAll purchasing berdasarkan kurun waktu tertentu'
    const day = req.query.day;
    try {
        let data = await Purchasing.count({
            include: [{
                model: Item,
                where: {
                    userId: req.user.id,
                },
                attributes: [], 
            }],
            attributes: ['itemId'], 
            group: 'purchasing.itemId',
            where:{
                createdAt: {
                    [Sequelize.Op.gte]: new Date(new Date() - (day * 24 * 60 * 60 * 1000))
                }
            }
        });

        for (let i = 0; i < data.length; i++) {
            let item = await Item.findByPk(data[i].itemId, {
                attributes: ['name']
            });
            data[i].item = item.dataValues.name;
            data[i].order = data[i].count;
            delete data[i].itemId;
            delete data[i].count;
        }
          
        return res.status(200).json({ 
            status: true, 
            message: 'success', 
            data: data
        });
    } catch (error) {
        return res.status(500).send({ message: error.message || 'Some error occurred while creating the Tutorial.' });
    }
};

exports.findAllItem = async (req, res) => {
    // #swagger.tags = ['Purchasing API']
    // #swagger.summary = 'findAll item yang paling banyak terjual sampai yang paling sedikit terjual'
    try {
        let data = await Purchasing.count({
            include: [{
                model: Item,
                where: {
                    userId: req.user.id,
                },
                attributes: [], 
            }],
            attributes: ['itemId', 'count'], 
            group: 'purchasing.itemId'
        });

        for (let i = 0; i < data.length; i++) {
            let item = await Item.findByPk(data[i].itemId, {
                attributes: ['name']
            });
            data[i].item = item.dataValues.name;
            data[i].order = data[i].count;
            delete data[i].itemId;
            delete data[i].count;
        }
        
        return res.status(200).json({ 
            status: true, 
            message: 'success', 
            data: data.sort((a, b) => b.order - a.order)
        });
    } catch (error) {
        return res.status(500).send({ message: error.message || 'Some error occurred while creating the Tutorial.' });
    }
};

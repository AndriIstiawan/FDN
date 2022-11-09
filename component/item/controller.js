const Item = require('./model');
const User = require('../users/model');
const { create } = require('./validation');

// Retrieve all Tutorials from the database.
exports.create = async (req, res) => {
    // #swagger.tags = ['Item API']
    // #swagger.summary = 'create item untuk user toko'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    name: 'barang baru',
                }
        } */
    if (!req.user.nama_toko) return res.status(401).end('Unauthorized');
    let { error, value } = create(req.body);
    if (error) return res.status(400).json({ staus: false, message: error.message });
    try {
        value.userId = req.user.id;
        await Item.create(value);
        /* #swagger.responses[201] = {
            description: 'save successfully.',
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
exports.getAll = async (req, res) => {
    // #swagger.tags = ['Item API']
    // #swagger.summary = 'getAll item'
    try {
        let item = await Item.findAll({
            include: User,
            attributes: ['id', 'name'],
        });

        item = item.map(item => {
            delete item.dataValues.userId;
            if (item.user.dataValues.nama_toko) item.dataValues.nama_toko = item.user.dataValues.nama_toko;
            delete item.dataValues.user;
            return item;
        });
        /* #swagger.responses[200] = {
            description: 'find successfully.',
            schema: {
                status: true,
                message: 'success',
                data: [{ 
                    id: '123-abc',
                    name: 'barang baru',
                    nama_toko: 'toko mini'
                }]
            }
        } */
        return res.status(200).json({ status: true, message: 'success', data: item });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }  
};

exports.getme = async (req, res) => {
    // #swagger.tags = ['Item API']
    // #swagger.summary = 'getAll item user toko'
    try {
        let item = await Item.findAll({
            where: {
                userId: req.user.id
            },
            attributes: ['id', 'name'],
        });
        return res.status(200).json({ status: true, message: 'success', data: item });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }  
};

exports.update = async (req, res) => {
    // #swagger.tags = ['Item API']
    // #swagger.summary = 'update item user toko'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    name: 'barang baru',
                }
        } */
    const { id } = req.params;
    let { error, value } = create(req.body);
    if (error) return res.status(400).json({ staus: false, message: error.message });
    try {
        await Item.update(value, {
            where: {
                userId : req.user.id,
                id: id
            }
        });
        /* #swagger.responses[200] = {
            description: 'save successfully.',
            schema: {
                status: true,
                message: 'success'
            }
        } */
        return res.status(200).json({ status: true, message: 'success' });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message || 'Some error occurred while creating the Tutorial.' });
    }
};

exports.delete = async (req, res) => {
    // #swagger.tags = ['Item API']
    // #swagger.summary = 'delete item user toko'
    const { id } = req.params;
    try {
        await Item.destroy({
            where: {
                userId: req.user.id,
                id: id
            }
        });
        /* #swagger.responses[200] = {
            description: 'delete successfully.',
            schema: {
                status: true,
                message: 'success'
            }
        } */
        return res.status(200).json({ status: true, message: 'success' });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }  
};

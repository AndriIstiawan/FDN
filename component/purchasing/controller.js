const Purchasing = require('./model');
const { create } = require('./validation');
const Sequelize = require('sequelize');
const { fn, col } = Purchasing.sequelize;

// Retrieve all Tutorials from the database.
exports.create = async (req, res) => {
    // #swagger.tags = ['Purchasing API']
    let { error, value } = create(req.body);
    if (error) return res.status(400).json({ staus: false, message: error.message });
    try {
        value.userId = req.user.id;
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
// exports.findAll = async (req, res) => {
//     try {
//         const { limit, page } = req.query;

//         const pageLimit = parseInt(limit, 10) || 10;
//         const pageSize = parseInt(page, 10) || 1;

//         const getPreviousPage = (pageSize) => {
//             if (pageSize <= 1) {
//                 return false;
//             }
//             return true;
//         };
//         const getNextPage = (page, limit, total) => {
//             if ((total / limit) > page) {
//                 return true;
//             }

//             return false;
//         };
//         // Save Tutorial in the database
//         const { count, rows } = await Order.findAndCountAll({
//             order: [
//                 [Sequelize.cast(Sequelize.col('id'), 'UNSIGNED'), 'ASC']
//             ],
//             limit: pageLimit,
//             offset: (pageSize * pageLimit) - pageLimit,
//             raw: true,
//             plain: false,
//         });

//         return res.json({
//             previousPage: getPreviousPage(pageSize),
//             currentPage: pageSize,
//             nextPage: getNextPage(pageSize, pageLimit, count),
//             total: count,
//             totalPage: count / pageLimit,
//             limit: pageLimit,
//             data: rows
//         });
//     } catch (error) {
//         return res.status(500).send({ message: error.message || 'Some error occurred while creating the Tutorial.' });
//     }
// };

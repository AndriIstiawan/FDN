const Order = require("./model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op
const { fn, col } = Order.sequelize

// Retrieve all Tutorials from the database.
exports.findAllPivot = async (req, res) => {
    try {
        const { limit, page } = req.query

        const pageLimit = parseInt(limit, 10) || 10;
        const pageSize = parseInt(page, 10) || 1;

        const getPreviousPage = (pageSize) => {
            if (pageSize <= 1) {
                return false
            }
            return true;
        }
        const getNextPage = (page, limit, total) => {
            if ((total / limit) > page) {
                return true;
            }

            return false
        }
        // Save Tutorial in the database
        const data = await Order.findAll({
            attributes: [
                [fn('concat', col('firstname'), ' ', col('lastname')), "FullName"],
                ['email', 'Email'],
                [fn('SUM', Sequelize.literal('CASE WHEN (Item="Barang1") THEN quantity ELSE 0 END')), 'Barang1'],
                [fn('SUM', Sequelize.literal('CASE WHEN (Item="Barang2") THEN quantity ELSE 0 END')), 'Barang2'],
                [fn('SUM', Sequelize.literal('CASE WHEN (Item="Barang3") THEN quantity ELSE 0 END')), 'Barang3'],
                [fn('SUM', Sequelize.literal('CASE WHEN (Item="Barang10") THEN quantity ELSE 0 END')), 'Barang10'],
            ],
            group: 'FullName',
            order: [
                [Sequelize.cast(Sequelize.col('id'), 'UNSIGNED'), 'ASC']
            ],
            limit: pageLimit,
            offset: (pageSize * pageLimit) - pageLimit,
            raw: true,
            plain: false,
        })

        const dataAll = await Order.findAll({
            attributes: [
                [fn('concat', col('firstname'), ' ', col('lastname')), "FullName"],],
            group: 'FullName',
            raw: true,
        })

        return res.json({
            previousPage: getPreviousPage(pageSize),
            currentPage: pageSize,
            nextPage: getNextPage(pageSize, pageLimit, dataAll.length),
            total: dataAll.length,
            limit: pageLimit,
            data: data
        });
    } catch (error) {
        return res.status(500).send({ message: error.message || "Some error occurred while creating the Tutorial." });
    }
};

// Find all published Tutorials
exports.findAll = async (req, res) => {
    try {
        const { limit, page } = req.query

        const pageLimit = parseInt(limit, 10) || 10;
        const pageSize = parseInt(page, 10) || 1;

        const getPreviousPage = (pageSize) => {
            if (pageSize <= 1) {
                return false
            }
            return true;
        }
        const getNextPage = (page, limit, total) => {
            if ((total / limit) > page) {
                return true;
            }

            return false
        }
        // Save Tutorial in the database
        const { count, rows } = await Order.findAndCountAll({
            order: [
                [Sequelize.cast(Sequelize.col('id'), 'UNSIGNED'), 'ASC']
            ],
            limit: pageLimit,
            offset: (pageSize * pageLimit) - pageLimit,
            raw: true,
            plain: false,
        })

        return res.json({
            previousPage: getPreviousPage(pageSize),
            currentPage: pageSize,
            nextPage: getNextPage(pageSize, pageLimit, count),
            total: count,
            limit: pageLimit,
            data: rows
        });
    } catch (error) {
        return res.status(500).send({ message: error.message || "Some error occurred while creating the Tutorial." });
    }
};

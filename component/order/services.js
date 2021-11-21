const Order = require('./model')
const Sequelize = require("sequelize");
const Op = Sequelize.Op

exports.create = function (user) {
    return Order.create(user)
};

exports.findAll = () => {
    return Order.findAll()
}

exports.findOne = (id) => {
    return Order.findByPk(id)
}

exports.deleteBook = (id) => {
    return Order.destroy({ where: { id: id } })
}

exports.findAllBy = (query) => {
    // sanitize plain text query to only keep alphanumeric lowercase
    const sanitizedQuery = query.trim().toLowerCase().replace(/[\W_]+/, ' ')
    // split by space as basic tokenization
    const queryTokens = sanitizedQuery.split(/\s+/)
    const options = {
        where: {
            [Op.or]: [queryTokens.map(token =>
                Sequelize.where(Sequelize.fn('lower', Sequelize.col('title')), 'LIKE', `%${token}%`),
            ),
            queryTokens.map(token =>
                Sequelize.where(Sequelize.fn('lower', Sequelize.col('description')), 'LIKE', `%${token}%`),
            )],
        },
        attributes: { exclude: ['password', 'resetPasswordExpires', 'resetPasswordToken'] }
        // include: [{ model: Comment }]
        // offset: 5,
        // limit: 5
    };

    return Order.findAll(options)
}

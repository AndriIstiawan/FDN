const Order = require('../component/order/model')
const seed = async () => {
    const order = [
        {
            id: 1,
            firstname: "Tommy",
            lastname: "Bejo",
            email: "tommy@mail.com",
            item: "Barang1",
            quantity: 2,
            total_price: 100000,
        },
        {
            id: 2,
            firstname: "Joko",
            lastname: "Widodo",
            email: "joko@mail.com",
            item: "Barang2",
            quantity: 1,
            total_price: 50000,
        },
        {
            id: 3,
            firstname: "Jusuf",
            lastname: "Kalla",
            email: "jusuf@mail.com",
            item: "Barang3",
            quantity: 3,
            total_price: 150000,
        },
        {
            id: 4,
            firstname: "Tommy",
            lastname: "Bejo",
            email: "tommy@mail.com",
            item: "Barang2",
            quantity: 2,
            total_price: 100000,
        },
        {
            id: 5,
            firstname: "Tommy",
            lastname: "Bejo",
            email: "tommy@mail.com",
            item: "Barang1",
            quantity: 2,
            total_price: 100000,
        },
        {
            id: 6,
            firstname: "Tommy",
            lastname: "Bejo",
            email: "tommy@mail.com",
            item: "Barang2",
            quantity: 2,
            total_price: 100000,
        },
        {
            id: 7,
            firstname: "Tommy",
            lastname: "Bejo",
            email: "tommy@mail.com",
            item: "Barang2",
            quantity: 2,
            total_price: 100000,
        },
        {
            id: 8,
            firstname: "Tommy",
            lastname: "Bejo",
            email: "tommy@mail.com",
            item: "Barang2",
            quantity: 2,
            total_price: 100000,
        },
        {
            id: 9,
            firstname: "Tommy",
            lastname: "Bejo",
            email: "tommy@mail.com",
            item: "Barang2",
            quantity: 2,
            total_price: 100000,
        },
        {
            id: 10,
            firstname: "Robert",
            lastname: "Garcia",
            email: "robert@mail.com",
            item: "Barang10",
            quantity: 3,
            total_price: 150000,
        }
    ]
    const { count, rows } = await Order.findAndCountAll();
    if (count == 0) Order.bulkCreate(order)
};

module.exports = seed;  
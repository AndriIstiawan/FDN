const chai = require('chai');
const expect = chai.expect;
const Order = require("../../component/order/model");

describe('User model', () => {
    it('should have optional field', async () => {
        let order = await Order.build({
            id: 1,
            firstname: 'andri',
            lastname: 'istiawan',
            item: 'barang1',
            quantity: 1,
            total_price: 50000
        });

        expect(order.dataValues).to.have.property('firstname').to.equal('andri');
        expect(order.dataValues).to.have.property('lastname').to.equal('istiawan');
    })
})

const { findAllPivot, findAll } = require('../../component/order/controller')
const httpMocks = require('node-mocks-http');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

let ordersModel = require('../../component/order/model')
chai.use(sinonChai);

const sandbox = sinon.createSandbox();
//delete user
describe('Order controller test', () => {
    let sample, token;

    beforeEach(() => {
        sampleOrder = {
            id: 1,
            firstname: 'andri',
            lastname: 'istiawan',
            item: 'barang1',
            quantity: 1,
            total_price: 50000
        };

        function rows() {
            [{
                id: 1,
                firstname: 'andri',
                lastname: 'istiawan',
                item: 'barang1',
                quantity: 1,
                total_price: 50000
            }]
        }

        function count() {
            return 1
        }

        sampleOrder2 = {
            count: 1,
            rows: [{
                id: 1,
                Fullname: 'andri istiawan',
                barang1: 1,
                barang2: 0,
                barang3: 0,
                barang4: 0,
            }]
        };
    })

    afterEach(() => {
        sandbox.restore();
        ordersController = rewire('../../component/order/controller.js')
    })

    context('get All orders', () => {
        it('get All success', async function () {
            sandbox.restore();
            let stub = sandbox.stub(ordersModel, 'findAll').returns([sampleOrder]);
            let res = httpMocks.createResponse()
            let req = httpMocks.createRequest();

            await findAllPivot(req, res);
            expect(stub).to.have.been.calledTwice;
            expect(res._getJSONData().data[0]).to.have.property('firstname').to.equal('andri')
        })

        it('get All pivot success', async function () {
            sandbox.restore();
            let stub = sandbox.stub(ordersModel, 'findAndCountAll').returns(sampleOrder2);
            let res = httpMocks.createResponse()
            let req = httpMocks.createRequest();

            await findAll(req, res);
            expect(stub).to.have.been.calledOnce;
            expect(res._getJSONData().data[0]).to.have.property('Fullname').to.equal('andri istiawan')
        })
    })
})
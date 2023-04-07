const ProductModel = require("../models/product.model");
const ResultModel = require("../models/result.model");
const ProductRepository = require("../repositories/product.repository");
const MessagesUtil = require("../utils/messages.util");
const { v4 } = require("uuid");

const repository = new ProductRepository();

class ProductService {

    async insert(event) {
        let resultModel;
        try {
            const req = JSON.parse(event.body);
            req.createAt = new Date().toISOString();
            req.id = v4();
            let model = new ProductModel(req)
            await repository.insert(model);

            resultModel = new ResultModel(200, model, MessagesUtil.success)
        } catch (error) {
            console.log(MessagesUtil.failure, error)
            resultModel = new ResultModel(500, error, MessagesUtil.failure);
        }
        return resultModel;
    }

    async update(event) {
        let resultModel;
        try {
            const { id } = event.pathParameters;
            const req = JSON.parse(event.body);
            req.createAt = new Date().toISOString();
            req.updateAt = new Date().toISOString();

            let model = new ProductModel(req)

            await repository.update(id, model);

            resultModel = new ResultModel(200, model, MessagesUtil.success)
        } catch (error) {
            console.log(MessagesUtil.failure, error)
            resultModel = new ResultModel(500, error, MessagesUtil.failure);
        }
        return resultModel;
    }

    async fetchProductById(event) {
        let resultModel;
        try {
            const { id } = event.pathParameters;
            const response = await repository.fetchById(id);

            resultModel = new ResultModel(200, response, MessagesUtil.success)
        } catch (error) {
            console.log(MessagesUtil.failure, error)
            resultModel = new ResultModel(500, error, MessagesUtil.failure);
        }
        return resultModel;
    }

    async fetchAll() {
        let resultModel;
        try {
            const response = await repository.fetchAll();

            resultModel = new ResultModel(200, response, MessagesUtil.success)
        } catch (error) {
            console.log(MessagesUtil.failure, error)
            resultModel = new ResultModel(500, error, MessagesUtil.failure);
        }
        return resultModel;
    }

}

module.exports = ProductService; 
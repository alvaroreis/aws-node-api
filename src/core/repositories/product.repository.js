const AWS = require('aws-sdk');
const ProductModel = require('../models/product.model');

class ProductRepository {
    #tableName;
    #database;
    constructor() {
        this.#database = new AWS.DynamoDB.DocumentClient();
        this.#tableName = 'ProductServerlessChallenge';
    }

    /**
     * @param {ProductModel} model
     */
    async insert(model) {
        return this.#database.put({
            TableName: this.#tableName,
            Item: model
        }).promise();
    }

    /**
     * @param {ProductModel} model
     * @param {String} id
     */
    async update(id, model) {
        console.log("Update model: ", model)
        return this.#database.update({
            TableName: this.#tableName,
            Key: { id },
            UpdateExpression: "set updateAt = :updateAt, amount = :amount, price = :price, #name = :productName",
            ExpressionAttributeNames: { '#name': 'name' },
            ExpressionAttributeValues: {
                ":updateAt": model.updateAt,
                ":amount": model.amount,
                ":productName": model.name,
                ":price": model.price
            },
            ReturnValues: 'ALL_NEW',
        }).promise();
    }

    /**
     * @param {String} id
     * 
     * @returns {ProductModel}
     */
    async fetchById(id) {
        const response = await this.#database.get({
            TableName: this.#tableName,
            Key: { id },
        }).promise();
        console.log("Response: ", response.Item)
        return new ProductModel(response.Item)

    }


    /**
     * @param {String} id
     * 
     * @returns {[ProductModel]}
     */
    async fetchAll() {
        const response = await this.#database.scan({
            TableName: this.#tableName,
        }).promise();

        console.log("Response: ", response.Items)
        return response.Items.map(product => new ProductModel(product))
    }
}



module.exports = ProductRepository; 
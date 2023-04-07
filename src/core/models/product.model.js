class ProductModel {
    constructor(params) {
        this.id = params.id;
        this.name = params.name
        this.price = params.price
        this.amount = params.amount
        this.createAt = params.createAt || new Date().toISOString()
        this.updateAt = params.updateAt
    }
}

module.exports = ProductModel; 
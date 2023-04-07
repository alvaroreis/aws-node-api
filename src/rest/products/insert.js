'use strict';

const ProductService = require("../../core/service/product.service");

const service = new ProductService();

const insertProduct = async (event) => {
    console.log('Entrou no handler')
    return service.insert(event);
}

module.exports = {
    handler: insertProduct
}
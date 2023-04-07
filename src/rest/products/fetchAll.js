'use strict';

const ProductService = require("../../core/service/product.service");

const service = new ProductService();

module.exports.handler = async (event) => {
    console.log('Entrou no handler')
    return service.fetchAll();
}

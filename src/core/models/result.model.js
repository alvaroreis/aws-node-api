class ResultModel {
    /**
     * @param {Int} statusCode
     * @param {String} message
     * @param {String} data
     */
    constructor(statusCode, data, message) {
        this.statusCode = statusCode;
        this.body = JSON.stringify({
            message: message,
            data: data
        })
    }
}

module.exports = ResultModel; 
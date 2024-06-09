const cybersourceRestApi = require('cybersource-rest-client');
const path = require('path');
const filePath = path.resolve('./Data/Configuration.js');
const configuration = require(filePath);

const configObject = new configuration();
const apiClient = new cybersourceRestApi.ApiClient();

async function authorizePayment(paymentRequest) {
    return new Promise((resolve, reject) => {
        const instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

        instance.createPayment(paymentRequest, (error, data, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

async function capturePayment(paymentId, captureRequest) {
    return new Promise((resolve, reject) => {
        const instance = new cybersourceRestApi.CaptureApi(configObject, apiClient);

        instance.capturePayment(captureRequest, paymentId, (error, data, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = { authorizePayment, capturePayment };

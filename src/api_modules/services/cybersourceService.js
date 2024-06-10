const cybersourceRestApi = require('cybersource-rest-client');
const path = require('path');
const filePath = path.resolve('./Data/Configuration.js');
const configuration = require(filePath);

const configObject = new configuration();
const apiClient = new cybersourceRestApi.ApiClient();


async function authorizePayment(paymentRequest) {
    return new Promise((resolve, reject) => {
        const instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

        instance.createPayment(paymentRequest, async (error, data, response) => {
            if (error) {
                reject(error);
            } else {
                if (data.status === "AUTHORIZED") {
                    const captureRequest = {
                        clientReferenceInformation: data.clientReferenceInformation,
                        orderInformation: {
                            amountDetails: {
                                totalAmount: data.orderInformation.amountDetails.authorizedAmount,
                                currency: data.orderInformation.amountDetails.currency
                            }
                        }
                    };
                    try {
                        const captureResponse = await capturePayment(data.id, captureRequest);
                        resolve({ authorization: data, capture: captureResponse });
                    } catch (captureError) {
                        reject(captureError);
                    }
                } else {
                    resolve({ authorization: data });
                }
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


//*************  Refund Payment Service **************************
async function refundPayment(refundRequest, paymentId) {
    return new Promise((resolve, reject) => {
        const instance = new cybersourceRestApi.RefundApi(configObject, apiClient);

        instance.refundPayment(refundRequest, paymentId, (error, data, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}



//*************  Authorization Reversal **************************

async function processAuthorizationReversal(paymentId, reversalRequest) {
    return new Promise((resolve, reject) => {
        const instance = new cybersourceRestApi.ReversalApi(configObject, apiClient);

        instance.authReversal(paymentId, reversalRequest, (error, data, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}


//*************  Authorization Reversal **************************

async function processAuthorizationReversal(paymentId, reversalRequest) {
    return new Promise((resolve, reject) => {
        const instance = new cybersourceRestApi.ReversalApi(configObject, apiClient);

        instance.mitReversal(reversalRequest, (error, data, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}


module.exports = { authorizePayment, capturePayment, refundPayment, processAuthorizationReversal };

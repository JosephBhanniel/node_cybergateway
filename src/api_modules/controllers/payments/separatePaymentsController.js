// The controller will separately handle both the authorize and capture requests

const { authorizePayment, capturePayment } = require('../../services/separateServices');

const makePayment = async (req, res) => {
    const paymentRequest = req.body;

    try {
        const response = await authorizePayment(paymentRequest);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const captureAuthorizedPayment = async (req, res) => {
    const { paymentId, captureDetails } = req.body;

    try {
        const response = await capturePayment(paymentId, captureDetails);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { makePayment, captureAuthorizedPayment };

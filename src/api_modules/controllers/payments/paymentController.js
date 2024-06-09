// The controller will handle both the authorize and capture requests

const { authorizePayment } = require('../../services/cybersourceService');

const makePayment = async (req, res) => {
    const paymentRequest = req.body;

    try {
        const response = await authorizePayment(paymentRequest);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { makePayment };

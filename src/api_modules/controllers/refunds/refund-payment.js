
const { refundPayment } = require('../../services/cybersourceService');

const refund_payment = async (req, res) => {
    const { refundRequest, paymentId } = req.body;

    try {
        const response = await refundPayment(refundRequest, paymentId);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { refund_payment };
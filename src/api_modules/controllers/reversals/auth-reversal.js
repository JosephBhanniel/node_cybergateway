
const { processAuthorizationReversal } = require('../../services/cybersourceService');

const payment_reversal = async (req, res) => {
    const Id = parseInt(req.params.id)
    const {reversalRequest } = req.body;

    try {
        const response = await processAuthorizationReversal(Id, reversalRequest);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { payment_reversal };
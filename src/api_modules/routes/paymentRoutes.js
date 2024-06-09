const express = require('express');
const { makePayment, capturePayment } = require('../controllers/payments/paymentController');

const router = express.Router();

router.post('/authorize/payment', makePayment);
// router.post('/capture/payment', capturePayment);

module.exports = router;

const express = require('express');
const { makePayment} = require('../controllers/payments/paymentController');
const { refund_payment } = require('../controllers/refunds/refund-payment');
const { payment_reversal } = require('../controllers/reversals/auth-reversal');

const router = express.Router();

router.post('/authorize/payment', makePayment);

//refund payment routes
router.post('/refund/payment', refund_payment);


//******* reversal routes **********
// Auth Reversal
router.post('/auth/reverse/payment/:id', payment_reversal);

module.exports = router;

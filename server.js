const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./src/api_modules/routes/paymentRoutes');
const separateRoutes = require('./src/api_modules/routes/separateRoutes');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use('/api', paymentRoutes);

app.use('/api/separate', separateRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

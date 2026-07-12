const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'TransitOps API running' }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/fuel', require('./routes/fuel'));
app.use('/api/maintenance', require('./routes/maintenance'));
app.use('/api/reports', require('./routes/reports'));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const usageRoutes = require('./routes/usage');
const usageLogger = require('./middleware/usageLogger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(usageLogger);
app.use('/auth', authRoutes);
app.use('/api', usageRoutes);


app.get('/', (req, res) => {
  res.send('API Usage Tracker is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

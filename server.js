require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors({
  origin: `${process.env.FRONT_END_URL}`
}));

// routes
app.use('/', async (req, res) => {
  res.status(200).json({ req: req.path });
});

// connect to db
mongoose.connect(process.env.MONGO_DB).then(() => {
  // listen for request
  app.listen(process.env.USER_BACKEND_PORT, () => {
    console.log(`Connected to mongodb & listening to the port ${process.env.USER_BACKEND_PORT}`);
  });
}).catch((err) => {
  console.log(err);
});
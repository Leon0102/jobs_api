require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

// connectDB
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Example app listening at http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
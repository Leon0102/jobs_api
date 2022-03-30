require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));


// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const authenticateUser = require('./middleware/authentication');

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
app.use(helmet());
app.use(cors());
app.use(xss());

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100
}));


// routes
app.use('/api/auth', authRouter);
app.use('/api/jobs',authenticateUser ,jobsRouter);

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
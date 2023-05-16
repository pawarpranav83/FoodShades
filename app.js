const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
// const pug = require('pug');

const restaurantRouter = require('./routes/restaurantRoute');
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute');
const viewRouter = require('./routes/viewRoute');
const orderRouter = require('./routes/orderRoute');
const orderController = require('./controllers/orderController');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
// const errorController = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Global Middlewares

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  orderController.webhookCheckout
);

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(compression());

// TEST MIDDLEWARE
app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

app.use(cors());
// app.use((req, res, next) => {
//   res.header(
//     'Access-Control-Allow-Origin',
//     'https://127.0.0.1:8000/api/v1/users/login'
//   );
//   next();
// });

// app.use(helmet({ contentSecurityPolicy: false }));

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: ['ratingsAverage', 'deliveryTime'],
  })
);

// ROUTES

app.use('/', viewRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

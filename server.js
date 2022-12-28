import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cors from 'cors';
dotenv.config();


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

///
app.use(cors());
// app.use('/api', createProxyMiddleware({ 
//   target: 'http://localhost:3000/',
//   changeOrigin: true, 
//   //secure: false,
//   onProxyRes: function (proxyRes, req, res) {
//      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//   }
// }));
///

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});

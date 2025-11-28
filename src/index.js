// src/index.js

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// giữ nguyên các require cũ
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mountRoutes = require('./routes/index.routes.js');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// bật CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // cho phép FE gọi
    credentials: true, // nếu cần gửi cookie/token
  }),
);

app.use(express.json());

// inject prisma vào req
app.use((req, _res, next) => {
  req.prisma = prisma;
  next();
});

// mount route
mountRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

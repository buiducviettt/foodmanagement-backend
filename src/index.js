require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mountRoutes = require('./routes/index.routes.js');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());

app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

mountRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 http://localhost:${port}`));

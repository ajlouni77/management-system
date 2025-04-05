const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// إعداد الاتصال بقاعدة البيانات
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// تمرير pool إلى الراوتر
const productRoute = require("./routes/products")(pool);

app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("مرحبا بك في نظام إدارة المخزون!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
});

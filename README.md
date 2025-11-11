# 🧱 Node.js MVC Template

Một template project chuẩn cho ứng dụng **Node.js + Express + MongoDB** theo mô hình **MVC**, dễ dàng mở rộng, tái sử dụng và phù hợp với cả học tập lẫn sản phẩm thực tế.

---

## 📁 Cấu trúc thư mục

```bash
src/
├── app/
│   ├── config/            # Kết nối database, cấu hình
│   │   └── database.js
│   ├── controllers/       # Xử lý logic ứng dụng
│   │   ├── CourseController.js
│   │   ├── UserController.js
│   │   └── ...
│   ├── models/            # Khai báo Mongoose schema
│   │   ├── Course.js
│   │   └── User.js
├── routes/                # Định nghĩa các tuyến đường
│   ├── course.js
│   ├── user.js
│   ├── site.js
│   └── index.js           # Gộp route con
├── public/                # Static files (ảnh, css, js)
├── resource/              # (Tuỳ chọn) chứa view nếu dùng EJS/Pug
└── index.js               # File khởi động app
```

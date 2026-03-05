#🎯 MỤC TIÊU NGÀY 20/01
    1.Template Form
    2.Reactive Form
    3.Cấu hình CORS
    4.Gọi External API GET

##1️⃣ FORM (Template-driven Form)
Kiến thức phải hiểu
    - FormsModule dùng để làm gì
    - [(ngModel)] là two-way binding
Validation cơ bản:
    required
    minlength
    pattern
Truy cập trạng thái form:
    form.valid
    form.invalid
Task cần làm

✔ Import FormsModule trong app.module.ts
✔ Tạo form đăng ký gồm:

name

email

password

✔ Hiển thị:

lỗi required

lỗi minlength

✔ Khi submit:

in dữ liệu ra console

reset form

➡️ Đạt yêu cầu khi:

Form validate đúng

Submit lấy được dữ liệu

# 2️⃣ REACTIVE FORM
Kiến thức phải hiểu

ReactiveFormsModule

FormGroup, FormControl

Validators:

Validators.required
Validators.minLength
Validators.pattern


Lấy dữ liệu:

this.form.value

Task cần làm

✔ Import ReactiveFormsModule
✔ Tạo login form reactive:

email

password

✔ Thêm:

validate email format

password ≥ 6 ký tự

✔ Disable nút submit khi form invalid

➡️ Đạt yêu cầu khi:

Form control bằng TS

Validation hiển thị đúng

Submit lấy được object form

# 3️⃣ CẤU HÌNH CORS POLICY
Kiến thức phải hiểu

Vì sao bị lỗi:
```blocked by CORS policy```
=> Trình duyệt chặn request khác domain

Cách xử lý trong Angular: dùng ***proxy.conf.json***

Task cần làm

✔ Tạo file: ***src/proxy.conf.json***
✔ Cấu hình:
    [
        {
            "context": ["/api"],
            "target": "https://domain-that-you-call.com",
            "secure": true,
            "changeOrigin": true
        }
    ]
✔ Sửa angular.json: ***"proxyConfig": "src/proxy.conf.json"***
✔ Restart server: ng serve
➡️ Đạt yêu cầu khi:
    Không còn lỗi CORS
    Gọi API qua /api/... chạy được

#4️⃣ CALL EXTERNAL API – GET METHOD
Kiến thức phải hiểu
    HttpClientModule
    HttpClient.get()
    Observable
    subscribe()
    Mapping JSON → interface

Task cần làm
***Bước 1 — tạo interface model***
✔ Copy đúng structure JSON từ API
✔ Tạo:
    coin.ts
    product.ts
    bank.ts

***Bước 2 — tạo service***
✔ Command: ng g s services/product
✔ Code:
    constructor(private http: HttpClient) {}

    getAll() {
    return this.http.get<Interface[]>(url);
    }

***Bước 3 — gọi trong component***
✔ Subscribe:
this.service.getAll().subscribe(data => {
  this.data = data;
});

***Bước 4 — hiển thị HTML***
✔ Dùng:
*ngFor
{{ }}
<img [src]>

1. Vì sao cần làm RESTful API?
RESTful API là gì?

Là chuẩn thiết kế API dùng giao thức HTTP để:

Lấy dữ liệu

Thêm mới

Cập nhật

Xóa

👉 Backend cung cấp dữ liệu qua API
👉 Frontend (Angular) gọi API để hiển thị

Vì sao cần?

Tách Frontend – Backend

Angular chỉ lo giao diện

Backend lo dữ liệu & logic

Dễ mở rộng

Sau này có thể dùng chung API cho:

Web

Mobile

Hệ thống khác

Chuẩn công nghiệp

Hầu hết hệ thống TMĐT, SaaS đều dùng REST

2. CRUD API là gì?

CRUD = 4 thao tác cơ bản với dữ liệu:

Thao tác	HTTP Method	Ví dụ
Create	POST	Thêm sản phẩm
Read	GET	Lấy danh sách
Update	PUT/PATCH	Sửa sản phẩm
Delete	DELETE	Xóa sản phẩm

👉 Đây là nền tảng của mọi hệ thống quản lý
(khách hàng, đơn hàng, sản phẩm…)

3. Tạo dự án Backend & tự restart khi code thay đổi
Mục tiêu

Chạy server backend

Khi sửa code → tự reload

Sẵn sàng nhận request từ Angular/Postman

Công cụ thường dùng

Node.js + Express

nodemon

Theo dõi file

Tự restart server

👉 Điều này giúp dev nhanh hơn rất nhiều.

4. Tạo HTTP GET danh sách đối tượng

Ví dụ backend có API:

GET /products


Trả về:

[
  { "id": 1, "name": "Áo thun" },
  { "id": 2, "name": "Giày" }
]


Ý nghĩa:

Đây là bước đầu tiên của mọi REST API

Frontend cần GET danh sách trước khi làm gì tiếp.

5. Angular truy suất dữ liệu API

Bạn cần biết 3 cách kiểm tra API:

(1) Trình duyệt

Gõ URL GET → xem JSON

Chỉ dùng được với GET

(2) Postman

Test được:

POST

PUT

DELETE

Công cụ bắt buộc phải biết khi học backend.

(3) Service Angular

Luồng chuẩn:

Angular Component
        ↓
Angular Service (HttpClient)
        ↓
REST API Backend
        ↓
JSON trả về → hiển thị UI


👉 Đây là mục tiêu cuối cùng của buổi học.

Tóm tắt tư duy quan trọng

Bạn đang học đúng flow chuẩn của dev web hiện đại:

Database
   ↓
Backend REST API
   ↓
Angular gọi API
   ↓
Hiển thị giao diện

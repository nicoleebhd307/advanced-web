# NodeJS + ExpressJS 
## NodeJS
là môi trường giúp chạy JS ở phía server 
do trước khi JS chỉ dùng để làm giao diện web => nhờ NodeJS: JS có thể dùng làm backend, server, API  

>> nhờ NodeJS, có thể: Tạo web server, RESTFUL API, kết nối với database, xử lý request/ response 

## ExpressJS 
là một framework của NodeJS, nó nhỏ gọn -> giúp tạo server và API nhanh hơn, dễ hơn 
>> dùng Express thì viết server ngắn gọn hơn, có sẵn routing, middleware, xử lý request/response, API  

>> NodeJS → nền tảng chạy JavaScript server
>> Express → công cụ xây server/API trên NodeJS
# Mục tiêu bài 35: Tạo server Backend 

Bạn cần:
Tạo project NodeJS + Express
Chạy Web Server port 3000
Khi mở trình duyệt sẽ hiện:
**Hello Restful API**

## BƯỚC 1 — Tạo project my-server
Tạo thư mục: my-serve

## BƯỚC 2 — Khởi tạo NodeJS project

Chạy lệnh:
```npm init```

👉 Sau đó:
Nhấn Enter liên tục để dùng mặc định
Kết quả tạo file: package.json

File này dùng để:
- quản lý thư viện
- cấu hình project NodeJS

## BƯỚC 3 — Cài ExpressJS

Chạy lệnh
```npm install express```

Kết quả:
tạo thư mục ***node_modules***
thêm "express" vào dependencies trong package.json

## BƯỚC 4 — Tạo file index.js

Trong thư mục project, tạo file:

index.js

Code hoàn chỉnh:
const express = require('express');
const app = express();

const port = 3000;

// API mặc định
app.get('/', (req, res) => {
  res.send('Hello Restful API');
});

// chạy server
app.listen(port, () => {
  console.log(`My Server listening on port ${port}`);
});

Giải thích nhanh:

req → dữ liệu client gửi lên

res → dữ liệu server trả về

res.send() → gửi text/JSON về trình duyệt

app.listen() → khởi động web server

## BƯỚC 5 — Chạy Web Server

Trong terminal, chạy:

```node index.js```


Nếu thành công sẽ thấy:

My Server listening on port 3000

## BƯỚC 6 — Kiểm tra trên trình duyệt

Mở browser và truy cập:

http://localhost:3000


👉 Kết quả hiển thị:

Hello Restful API

# Bài 36: Cài nodemon để không cần chạy lại server mỗi khi có thay đổi 
# Bài 37: Dùng morgan command để xem HTTP request logger  
dùng để khi lại thông tin các HTTP Request gửi tới server  

Khi client gọi API, Morgan có thể log:
- Method: GET, POST, PUT, DELETE
- URL được gọi
- Status code: 200, 404, 500
- Thời gian xử lý request
- IP của client
- Dung lượng response

📌 Ví dụ log trên terminal:
GET /products 200 15 ms - 532 bytes

1. `npm init` : create BE folder 
2. `npm install express` : install express  
3. create index.js (manually)  
4. node .\index.js : run BE 
5. `ipconfig` : tim ip cua may <=> thay vafo localhost Wireless LAN adapter Wi-Fi:
   Connection-specific DNS Suffix  . :
   Link-local IPv6 Address . . . . . : fe80::dfe3:7205:14fc:7d83%10
   **IPv4 Address. . . . . . . . . . . : 192.168.1.123**
6. `npm i -g nodemon` : 

Lưu ý: Để phát triển, bạn cần chạy 2 server ***cùng lúc***:
Backend: node index.js (port 3000) - đang chạy ✓
Frontend: ng serve (port 4200) - đang chạy ✓

https://tranduythanh.com/webmaterials/2025_Practice-Advanced-Business-Web-Development.pdf

# Cú pháp đặt tên 
ng g c Listproduct : bài học 
ng g c ListproductEx13 : bài tập 
ng g s tên component + service 

# Angular  
ng g c <component-name> : create folder (Component)
ng g s <service-name>: create service    
- ProductService 
- ProductHTTPService : tạo service HTTP để xử lý data từ file độc lập bên ngoài (cơ chế Ajax)  
    - service xử lý backend data (trong bài đang dùng file json ở local, ở real dự án, gọi là web api, có thể là database bên ngoài)  
        > ***File dữ liệu bên ngoài => (cơ chế AJAX)*** (tham khảo bài 15 trong file bài tập)  
        > 1. tạo dữ liệu json (local)    
        > 2. trong ProductService (product-httpservice.spec.ts) : đọc data từ json, define constructor -> trả về danh sách dữ liệu (export class)    
        > 3. các component triệu gọi ProductService     
my-app\src\app\customer18 : solve exercise 18  
my-app\src\app\list-customer : show list customer and search feature  
# Frontend 
`npm install -g @angular/cli` : install Angular (cd vào thư mục lớn)  
`ng new my-app --no-standalone --routing --ssr=false` : create new Angular project  
`ng serve --open` : run project   

## Tạo project structure với Angular  
- tạo menu trước để tạo routing  
- tạo folder:
    app/  
        - components/  
        - services/  
        - pages/  
- tạo lần lượt component => làm routing => bắt đầu làm  component  
- ngIf, ngSwitch, ngFor, ngClass 

## Midterm: ex25 26 27 28(trọng số cao)  

# RestAPI  
API: phần liên kết giữa FE và BE 
FE: giao diện 
BE: tổng hợp các WebServer và Database(MongoDB)   

## Step-by-step create server  
manually  create BE folder -> `cd my-server`
1. `npm init` : create BE folder (`npm init -y` nếu chưa tạo được file package.json)  
2. `npm install express cors morgan mongodb` : install libs      
3. create index.js (manually)    
4. `node .\index.js` : run BE   
5. (làm mongodb thì ko cần)`ipconfig` : tim ip cua may <=> thay vafo localhost Wireless LAN adapter Wi-Fi:  
   Connection-specific DNS Suffix  . :    
   Link-local IPv6 Address . . . . . : fe80::dfe3:7205:14fc:7d83%10  
   **IPv4 Address. . . . . . . . . . . : 192.168.1.123**  
6. `npm install -g nodemon` : install Nodemon to auto restart after adjusting code   
7. `nodemon index.js` : auto restart server   
8. ` "scripts": {"start": "node index.js"} ` : thêm vào package.json để có thể run server bằng lệnh `npm start `  


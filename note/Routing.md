*
path ở routing 
navigate ở component 
routerLink ở html 
=> cùng 1 tên 

# Routing
- là điều hướng giữa các trong trong SPA (Single Page Application) -> chuyển trang mà ko cần reload lại web 
- giúp điều hướng giữa các trang, tách component theo từng trang, truyền param trên URL
## Tạo Routing trong Angular  
/ 4 bước đầu có thể được tạo tự động / 

1 - (nếu chưa có) Tạo AppRoutingModule: ```ng generate module app-routing --flat --module=app``` => tạo app-routing.module.ts

2 - Khai báo Routes: trong app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { About } from './about/about';
import { Contact } from './contact/contact';

const routes: Routes = [
  { path: 'about', component: About },
  { path: 'contact', component: Contact } // nếu muốn truyền PARAM thì ```{ path: 'product/:id', component: Productdetail }```

];

3 - Kích hoạt Router  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // bắt buộc có 
})
export class AppRoutingModule {}

4 - Import vào app.module.ts
imports: [
  BrowserModule,
  AppRoutingModule   // 👈 chỉ cần dòng này
]

5 - Thêm <router-outlet> vào app.html
<nav>
  <a routerLink="/about">About</a>
  <a routerLink="/contact">Contact</a>
</nav>

<router-outlet></router-outlet>

## Routing có PARAM  
- PARAM (parameter): giá trị động nằm trong URL -> xác định đối tượng cụ thể 
- ex: xem chi tiết sản phẩm từ môt trang tổng hợp -> không cần tạo từng trang chi tiết cho từng sản phẩm

Khai báo : ```{ path: 'product/:id', component: Productdetail } ```
Điều hướng: ```<a [routerLink]="['/product', product.id]">Detail</a> ``` 
Lấy PARAM từ component: 

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
}

## How it works 

HTML (routerLink)
   ↓
Router
   ↓
AppRoutingModule (so khớp path)
   ↓
Component chi tiết được tạo
   ↓
ActivatedRoute lấy param từ URL
   ↓
Service / JSON / API lấy data theo id
   ↓
Template hiển thị

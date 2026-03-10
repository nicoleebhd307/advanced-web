import { NgModule, provideBrowserGlobalErrorListeners } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { About } from "./about/about";
import { Contact } from "./contact/contact";
import { Listproduct1 } from "./listproduct1/listproduct1";
import { Listproduct3 } from "./listproduct3/listproduct3";
import { Customer18 } from "./customer18/customer18";
import { ListCustomer } from "./list-customer/list-customer";
import { Product14 } from "./product14/product14";
import { Exercise10 } from "./exercise10/exercise10";
import { Listproduct2 } from "./listproduct2/listproduct2";
import { Notfound } from "./notfound/notfound";
import { Productdetail } from "./productdetail/productdetail";
import { Exercise13Detail } from "./exercise13-detail/exercise13-detail";
import { ServiceProductImageEventComponent } from "./exercise13/exercise13";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing-module";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { App } from "./app";
import { Exercise19 } from './exercise19/exercise19';
import { DongABankComponent } from './dongabank/dongabank';
import { FakeProductComponent } from './fake-product/fake-product';
import { CoinComponent } from './coin/coin';
import { BooksComponent } from './books/books';
import { Books50Component } from "./exercise50/books/books";
import { Fashion } from './fashion/fashion';
import { Fashion53 } from './fashion53/fashion53';
import { LoginFashion } from './login-fashion/login-fashion';
import { Exercise63 } from './exercise63/exercise63';
import { Cart63 } from './cart63/cart63';
import { ClientFashion58 } from './client-fashion58/client-fashion58';
import { AdminFashion58 } from './admin-fashion58/admin-fashion58';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [
    App,
    About,
    Contact,
    Listproduct1,
    Listproduct3,
    Customer18,
    ListCustomer,
    Product14,
    Exercise10,
    Listproduct2,
    Notfound,
    Productdetail,
    Exercise13Detail,
    ServiceProductImageEventComponent,
    Exercise19,
    DongABankComponent,
    FakeProductComponent,
    CoinComponent,
    BooksComponent,
    Books50Component,
    Fashion,
    Fashion53,
    LoginFashion,
    Exercise63,
    Cart63,
    ClientFashion58,
    AdminFashion58,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    QuillModule.forRoot(),
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App]  
})
export class AppModule { }

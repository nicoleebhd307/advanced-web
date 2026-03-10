import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFashionService } from '../login-fashion';

@Component({
  selector: 'app-login-fashion',
  standalone: false,
  templateUrl: './login-fashion.html',
  styleUrl: './login-fashion.css',
})
export class LoginFashion implements OnInit {
  activeTab: 'login' | 'register' = 'login';
  usr: string = '';
  pwd: string = '';
  regUsr: string = '';
  regPwd: string = '';
  regPwdConfirm: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private _loginService: LoginFashionService,
    private _router: Router
  ) {}

  ngOnInit() {
    if (this._loginService.isLoggedIn()) {
      this._router.navigate(['/ex-53']);
    }
  }

  switchTab(tab: 'login' | 'register') {
    this.activeTab = tab;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onLogin() {
    if (!this.usr.trim() || !this.pwd.trim()) {
      this.errorMessage = 'Vui lòng nhập tên đăng nhập và mật khẩu.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this._loginService.login(this.usr, this.pwd).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          localStorage.setItem('token', res.token);
          this._router.navigate(['/ex-53']);
        } else {
          this.errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
      }
    });
  }

  onRegister() {
    if (!this.regUsr.trim() || !this.regPwd.trim()) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin.';
      return;
    }
    if (this.regPwd !== this.regPwdConfirm) {
      this.errorMessage = 'Mật khẩu xác nhận không khớp.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this._loginService.register(this.regUsr, this.regPwd).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.successMessage = 'Đăng ký thành công! Vui lòng đăng nhập.';
          this.regUsr = '';
          this.regPwd = '';
          this.regPwdConfirm = '';
          setTimeout(() => this.switchTab('login'), 1500);
        } else {
          this.errorMessage = res.message || 'Đăng ký thất bại.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      }
    });
  }
}

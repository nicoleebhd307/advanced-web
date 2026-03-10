import { Component, OnInit } from '@angular/core';
import { FashionAPI } from '../fashion-api';

@Component({
  selector: 'app-admin-fashion58',
  standalone: false,
  templateUrl: './admin-fashion58.html',
  styleUrl: './admin-fashion58.css',
})
export class AdminFashion58 implements OnInit {
  fashions: any[] = [];
  errMessage = '';
  view: 'list' | 'form' = 'list';
  isEditing = false;

  form = {
    _id: '',
    fashion_title: '',
    fashion_details: '',
    thumbnail: '',
    fashion_styles: '',
  };

  constructor(private _service: FashionAPI) {}

  ngOnInit() {
    this.loadFashions();
  }

  loadFashions() {
    this._service.getFashions().subscribe({
      next: (data) => (this.fashions = data),
      error: (err) => (this.errMessage = err.message),
    });
  }

  openAdd() {
    this.form = { _id: '', fashion_title: '', fashion_details: '', thumbnail: '', fashion_styles: '' };
    this.isEditing = false;
    this.view = 'form';
  }

  openEdit(fashion: any) {
    this.form = { ...fashion };
    this.isEditing = true;
    this.view = 'form';
  }

  save() {
    if (this.isEditing) {
      const { _id, ...data } = this.form;
      this._service.updateFashion(_id, data).subscribe({
        next: () => { this.loadFashions(); this.view = 'list'; },
        error: (err) => (this.errMessage = err.message),
      });
    } else {
      const { _id, ...data } = this.form;
      this._service.createFashion(data).subscribe({
        next: () => { this.loadFashions(); this.view = 'list'; },
        error: (err) => (this.errMessage = err.message),
      });
    }
  }

  delete(id: string) {
    if (!confirm('Bạn có chắc chắn muốn xóa mục này?')) return;
    this._service.deleteFashion(id).subscribe({
      next: () => this.loadFashions(),
      error: (err) => (this.errMessage = err.message),
    });
  }

  cancel() {
    this.view = 'list';
  }
}

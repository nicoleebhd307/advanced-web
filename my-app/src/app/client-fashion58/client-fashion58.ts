import { Component, OnInit } from '@angular/core';
import { FashionAPI } from '../fashion-api';

@Component({
  selector: 'app-client-fashion58',
  standalone: false,
  templateUrl: './client-fashion58.html',
  styleUrl: './client-fashion58.css',
})
export class ClientFashion58 implements OnInit {
  fashions: any[] = [];
  filtered: any[] = [];
  grouped: { [style: string]: any[] } = {};
  styleList: string[] = [];
  selectedStyle = '';
  searchInput = '';
  selectedFashion: any = null;
  errMessage = '';

  constructor(private _service: FashionAPI) {}

  ngOnInit() {
    this._service.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
        this.applyFilter();
      },
      error: (err) => (this.errMessage = err.message),
    });
  }

  applyFilter() {
    const term = (this.searchInput || this.selectedStyle).trim().toLowerCase();
    this.filtered = term
      ? this.fashions.filter((f) =>
          (f.fashion_styles || '').toLowerCase().includes(term)
        )
      : [...this.fashions];
    this.buildGroups();
  }

  buildGroups() {
    this.grouped = {};
    for (const f of this.filtered) {
      const style = f.fashion_styles || 'Other';
      if (!this.grouped[style]) this.grouped[style] = [];
      this.grouped[style].push(f);
    }
    this.styleList = Object.keys(this.grouped);
  }

  get allStyles(): string[] {
    const s = new Set(this.fashions.map((f) => f.fashion_styles || 'Other'));
    return Array.from(s).sort();
  }

  onSelectStyle(style: string) {
    this.selectedStyle = style;
    this.searchInput = style;
    this.applyFilter();
  }

  onSearch() {
    this.selectedStyle = '';
    this.applyFilter();
  }

  openDetail(fashion: any) {
    this.selectedFashion = fashion;
  }

  closeDetail() {
    this.selectedFashion = null;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}

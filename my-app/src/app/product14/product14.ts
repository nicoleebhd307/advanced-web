import { Component } from '@angular/core';
import { CatalogService } from '../product14';

@Component({
  selector: 'app-product14',
  standalone: false,
  templateUrl: './product14.html',
  styleUrl: './product14.css',
})
export class Product14 {
  constructor(public catalogService: CatalogService) {}
}

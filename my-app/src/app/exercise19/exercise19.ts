import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercise19',
  standalone: false,
  templateUrl: './exercise19.html',
  styleUrls: ['./exercise19.css'],
})
export class Exercise19 {
  constructor(private router: Router, private activeRouter: ActivatedRoute) {
    // dùng router để điều hướng 
    // avtive router để nhận điều hướng 
  }

}

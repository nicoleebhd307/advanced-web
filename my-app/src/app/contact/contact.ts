import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {
  sendContact(): void {
    const input_name = document.getElementById('name') as HTMLInputElement;
    const input_email = document.getElementById('email') as HTMLInputElement;
    const input_message = document.getElementById('message') as HTMLInputElement;
    alert('Contact form submitted!\n Name: ' + input_name.value + '\n Email: ' + input_email.value + '\n Message: ' + input_message.value);
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-email.html',
  styleUrls: ['./check-email.css']
})
export class CheckEmail {

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
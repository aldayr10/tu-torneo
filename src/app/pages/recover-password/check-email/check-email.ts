import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-email',
  imports: [],
  templateUrl: './check-email.html',
  styleUrl: './check-email.css',
})
export class CheckEmail {
  constructor(private router: Router) {}
  
  goToLogin() {
    this.router.navigate(['/login']);
}}

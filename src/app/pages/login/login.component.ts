import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { User } from '../../model/User';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, RouterLink, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router) { }

  showPassword = false
  invalidType = ''

  usernameOrEmail = ''
  password = ''

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }

  async checkUsernamePassword() {
    let type = ''
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.usernameOrEmail)) {
      type = 'email'
    } else {
      type = 'username'
    }

    this.http.get<User>(`http://localhost:8080/user/validate-login/${type}?${type}=${encodeURIComponent(this.usernameOrEmail)}&password=${encodeURIComponent(this.password)}`).subscribe(data => {
      if (data) {
        localStorage.setItem('user', JSON.stringify(data))
        this.router.navigate([data.role === "Customer"? '' : '/admin'])
      } else {
        this.invalidType = type
      }
    })
  }
}

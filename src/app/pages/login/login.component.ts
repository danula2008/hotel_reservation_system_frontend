import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router) { }

  showPassword = false
  invalidLogin = false

  usernameOrEmail = ''
  password = ''

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }

  async checkUsernamePassword() {
    localStorage.setItem('userId', 'U001')
    this.router.navigate([''])

    let type = ''
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.usernameOrEmail)) {
      type = 'email'
    } else {
      type = 'username'
    }

    this.http.get(`http://localhost:8080/user/validate-login/?${encodeURIComponent(type)}=${encodeURIComponent(this.usernameOrEmail)}&password=${encodeURIComponent(this.password)}`).subscribe(data => {
      if (data.toString() !== 'Invalid') {
        localStorage.setItem('userId', data.toString())
        this.router.navigate([''])
      } else {
        this.invalidLogin = true
      }
    })
  }
}

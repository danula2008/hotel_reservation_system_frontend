import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { User } from '../../model/User';

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
    let type = ''
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.usernameOrEmail)) {
      type = 'email'
    } else {
      type = 'username'
    }

    localStorage.setItem('user', JSON.stringify(new User(
      '12345',
      'johndoe',
      '',
      'John Doe',
      'johndoe@example.com',
      'Admin',
      new Date('2023-01-01T00:00:00Z'),
      new Date()
    )));

    // this.http.get<User>(`http://localhost:8080/user/validate-login/?${encodeURIComponent(type)}=${encodeURIComponent(this.usernameOrEmail)}&password=${encodeURIComponent(this.password)}`).subscribe(data => {
    //   if (data.toString() !== 'Invalid') {
    //     localStorage.setItem('userId', data.toString())
    //     this.router.navigate([''])
    //   } else {
    //     this.invalidLogin = true
    //   }
    // })
  }
}

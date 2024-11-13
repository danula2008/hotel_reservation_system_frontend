import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [NgIf, NgClass, NgFor, RouterLink, FormsModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor(public http: HttpClient) {}

  step = 1;

  showPassword = false
  showConfirmPassword = false
  today = new Date().toISOString().split('T')[0];

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword
  }

  countriesRegions: string[] = [
    'Sri Lanka',
    'Africa',
    'Asia',
    'Australia and Oceania',
    'Caribbean',
    'Central America',
    'Europe',
    'Middle East',
    'North America',
    'South America'
  ];

  // Error message variables
  fName_error = '';
  lName_error = '';
  gender_error = '';
  dob_error = '';
  contact_error = '';
  country_error = '';

  username_error = ''
  email_error = ''
  password_error = ''
  confirmPassword_error = ''

  user = {
    firstName: null,
    lastName: null,
    gender: null,
    dateOfBirth: null,
    contact: null,
    country: null,
    username: null,
    email: null,
    password: '',
    confirmPassword: ''
  };

  fNameValidate() {
    if (!this.user.firstName) {
      this.fName_error = 'First name is required.';
    } else if (!/^[A-Za-z]+$/.test(this.user.firstName)) {
      this.fName_error = 'First name must contain only letters.';
    } else {
      this.fName_error = '';
    }
  }

  lNameValidate() {
    if (!this.user.lastName) {
      this.lName_error = 'Last name is required.';
    } else if (!/^[A-Za-z]+$/.test(this.user.lastName)) {
      this.lName_error = 'Last name must contain only letters.';
    } else {
      this.lName_error = '';
    }
  }

  genderValidate() {
    if (!this.user.gender) {
      this.gender_error = 'Gender is required.';
    } else {
      this.gender_error = '';
    }
  }

  dobValidate() {
    if (!this.user.dateOfBirth) {
      this.dob_error = 'Date of birth is required.';
    } else {
      this.dob_error = '';
    }
  }

  contactValidate() {
    if (!this.user.contact) {
      this.contact_error = 'Contact number is required.';
    } else if (!/^\+([0-9]{1,3})[0-9]{7,15}$/.test(this.user.contact)) {
      this.contact_error = 'Contact number must be with country code and numbers no spaces.';
    } else {
      this.contact_error = '';
    }
  }

  countryValidate() {
    if (!this.user.country) {
      this.country_error = 'Country is required.';
    } else {
      this.country_error = '';
    }
  }

  usernameValidate() {
    if (!this.user.username) {
      this.username_error = 'Username is required.';
    } else if (!/^\S+$/.test(this.user.username)) {
      this.username_error = 'Username cannot contain spaces.';
    } else {
      this.username_error = '';
    }
  }

  emailValidate() {
    if (!this.user.email) {
      this.email_error = 'Email is required.';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.user.email)) {
      this.email_error = 'Please enter a valid email address.';
    } else {
      this.email_error = '';
    }
  }

  passwordValidate() {
    if (!this.user.password) {
      this.password_error = 'Password is required.';
    }
    else if (/\s/.test(this.user.password)) {
      this.password_error = 'Password cannot contain spaces.';
    }
    else if (this.user.password.length < 8) {
      this.password_error = 'Password must be at least 8 characters long.';
    }
    else {
      this.password_error = '';
    }
  }

  confirmPasswordValidate() {
    if (!this.user.confirmPassword) {
      this.confirmPassword_error = 'Please confirm your password.';
    }
    else if (/\s/.test(this.user.confirmPassword)) {
      this.confirmPassword_error = 'Confirm password cannot contain spaces.';
    }
    else {
      this.confirmPassword_error = '';
    }
  }

  validateStep1() {
    return !this.user.firstName || !this.user.lastName || !this.user.gender || !this.user.dateOfBirth || !this.user.contact || !this.user.country || this.fName_error || this.lName_error || this.gender_error || this.dob_error || this.contact_error || this.country_error;
  }

  toStep(step: number) {
    this.step = step
  }

  async register() {
    // await this.checkUsernameAvailable();
    if (this.user.confirmPassword !== this.user.password) {
      this.confirmPassword_error = 'Passwords do not match.';
    }

    if(!this.user.username || !this.user.email || !this.user.password || this.user.confirmPassword || this.username_error || this.email_error || this.password_error || this.confirmPassword_error){
      // await this.registerUser()
      console.log("Registered");
      
    }
  }

  async checkUsernameAvailable() {
    // this.http.get(`http://localhost:8080/user/username-available/${this.user.username}`).subscribe(data => {
    //   if (!data){
    //     this.username_error = "Username taken, enter another."
    //   }
    // })
  }

  async registerUser() {
    // this.http.post(`http://localhost:8080/user//${this.user.username}`).subscribe(data => {
    //   if (!data){
    //     this.username_error = "Username taken, enter another."
    //   }
    // })
  }
}
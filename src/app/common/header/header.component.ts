import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../model/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }

  userImg: string = '';
  userDetails = null;
  isDropdownOpen: boolean = false;
  isMobileHeaderOpen: boolean = false;
  loggedIn = false;
  usersName = ''
  usersEmail = ''

  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if (user) {
      let jsonUser = JSON.parse(user)

      this.usersName = jsonUser.name
      this.usersEmail = jsonUser.email

      this.loggedIn = true
      this.userImg = `https://ui-avatars.com/api/?name=${jsonUser.name}&size=128&rounded=true&background=0D8ABC&color=fff`;
    } else {
      this.loggedIn = false
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileHeader(): void {
    this.isMobileHeaderOpen = !this.isMobileHeaderOpen
  }

  viewProfile(): void {
    this.isDropdownOpen = false;
    this.isMobileHeaderOpen = false;
    this.router.navigate(['/profile']);
  }

  signOut(){
    localStorage.removeItem('user')
    this.loggedIn = false;
  }
}
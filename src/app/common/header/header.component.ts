import { NgIf, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink, NgClass],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUrl: string = '';
  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

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

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        console.log(this.currentUrl)
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
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
    this.isDropdownOpen = false
    this.isMobileHeaderOpen = false
    localStorage.removeItem('user')
    this.loggedIn = false;
  }
}
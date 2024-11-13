import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  userImg: string = '';
  userDetails = null;
  isDropdownOpen: boolean = false;
  isMobileHeaderOpen: boolean = false;

  ngOnInit(): void {
    this.userImg = "https://ui-avatars.com/api/?name=Danula+Rathnayaka&size=128&rounded=true&background=0D8ABC&color=fff";
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
    this.router.navigate(['/profile'], { queryParams: { id: "U001" } });
  }
}
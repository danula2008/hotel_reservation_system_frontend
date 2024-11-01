import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public userImg: string = '';
  public isDropdownOpen: boolean = false;

  ngOnInit(): void {
    this.userImg = "https://ui-avatars.com/api/?name=Danula+Rathnayaka&size=128&rounded=true&background=0D8ABC&color=fff";
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
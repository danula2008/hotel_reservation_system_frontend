import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {

  isEditable = false;

  UserFullName = "Danula Rathnayaka";
  username = "@danular";

  userProfileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.UserFullName)}&background=${'male' == 'male' ? '007BFF' : 'FFB6C1'}&color=FFFFFF&size=128&rounded=true&bold=true`;


  toggleEditable(): void{
    this.isEditable = !this.isEditable;
  }
}

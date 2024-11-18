import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PopupCardComponent } from "../../../common/popup-card/popup-card.component";
import { FormsModule } from '@angular/forms'
import { User } from '../../../model/User';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, PopupCardComponent, FormsModule],
  templateUrl: './manage-user.component.html'
})
export class ManageUserComponent {
  loading = true
  userList: User[] = [];
  permenentUserList: User[] = [];
  selectedUser: User | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  searchTxt = ''
  roleFilter = "All"
  ratingFilter = "All"

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>("http://localhost:8080/user/get/all").subscribe(data => {
      data.forEach(obj => {
        this.loading = false
        this.userList.push(obj);
        this.permenentUserList.push(obj);
      })
    })
  }

  setRoleFilter(filter: string) {
    this.roleFilter = filter;

    if (this.roleFilter !== 'All') {
      this.userList = this.permenentUserList.filter(user => user.role === this.roleFilter);
    } else {
      this.userList = [...this.permenentUserList];
    }
  }

  searchTextFilter() {
    this.userList = this.permenentUserList.filter(user => user.name.toLowerCase().startsWith(this.searchTxt.toLowerCase()) || user.username.toLowerCase().startsWith(this.searchTxt.toLowerCase()) || user.id?.toLowerCase().includes(this.searchTxt.toLowerCase()))
  }

  showModel(user: User) {
    this.selectedUser = user;
  }

  deleteUser(user: User) {
    console.log(user);
  }

  getUserImage(name: string) {
    name = "Danula Rathnayaka"
    const colors = ['FF5733', '4287f5', '34a853', '9b59b6', 'f39c12', '1abc9c', 'e84393', '8e44ad', 'f1c40f'];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&rounded=true&background=${colors[name.charCodeAt(0) % colors.length]}&color=ffffff`;
  }


  formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      return date.replace('T', ' ');
    }
    return '';
  }
}

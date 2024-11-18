import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PopupCardComponent } from "../../../common/popup-card/popup-card.component";
import { FormsModule } from '@angular/forms'
import { User } from '../../../model/User';
import Swal from 'sweetalert2';

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

  newUser: User = new User('', '', '', '', '', 'Admin', new Date(), new Date());

  showPassword = false
  showConfirmPassword = false
  confirmPassword = ''
  passwordsMatch = true;

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword
  }

  searchTxt = ''
  roleFilter = "All"
  ratingFilter = "All"

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    this.userList = []
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
    Swal.fire({
      title: `Are you sure you want to delete User ${user.id}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8080/user/${user.id}`, { responseType: "text" }).subscribe(data => {
          Swal.fire({
            title: "Deleted!",
            text: `User ${user.id} has deleted succesfully.`,
            icon: "success"
          });
          this.loadUsers()
        })
      }
    });
  }

  getUserImage(name: string) {
    const colors = ['FF5733', '4287f5', '34a853', '9b59b6', 'f39c12', '1abc9c', 'e84393', '8e44ad', 'f1c40f'];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&rounded=true&background=${colors[name.charCodeAt(0) % colors.length]}&color=ffffff`;
  }


  formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    // Convert the date to IST (Indian Standard Time)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    const formattedDate = date.toLocaleString('en-GB', {
      ...options,
      timeZone: 'Asia/Kolkata',
    });

    return formattedDate.replace(',', '').replace(' T', '');
  }

  addAdmin() {
    if (this.newUser.password !== this.confirmPassword) {
      this.passwordsMatch = false;
      return;
    }

    this.http
      .post<User>(
        "http://localhost:8080/user", this.newUser).subscribe(data => {this.loadUsers()})
  }

}

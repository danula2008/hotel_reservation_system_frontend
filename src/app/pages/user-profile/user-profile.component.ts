import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.callLoadCustomer();
  }

  customer: any;
  user: any;
  isEditable = false;
  userProfileImage: any;

  async callLoadCustomer() {
    await this.loadCustomer();
  }

  async loadCustomer() {
    this.http.get(`http://localhost:8080/customer/get/user_id/${this.route.snapshot.queryParams['id']}`).subscribe(data => {
      this.customer = data
      this.userProfileImage = `https://ui-avatars.com/api/?name=${this.customer.fname}+${this.customer.lname}&background=${'male' == 'male' ? '007BFF' : 'FFB6C1'}&color=FFFFFF&size=128&rounded=true&bold=true`
    })

    this.http.get(`http://localhost:8080/user/get/id/${this.route.snapshot.queryParams['id']}`).subscribe(data => {
      this.user = data
    })
  }

  toggleEditable(): void {
    this.isEditable = !this.isEditable;
  }

  updateUser() {
    Swal.fire({
      title: "Are you sure you want to save changes?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1c64f2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put(`http://localhost:8080/customer/${this.customer.id}`, this.customer).subscribe(data => {
          this.http.put(`http://localhost:8080/user/${this.user.id}`, this.user).subscribe(data => {
            Swal.fire({
              title: "Saved!",
              text: "Your details has been saved.",
              icon: "success"
            });
          })
        })
      }
    });

    this.toggleEditable()
  }

  deleteUser() {
    Swal.fire({
      title: "Are you sure you want to delete your account.",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#1c64f2",
      cancelButtonColor: "#d33",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8080/customer/id/${this.customer.id}`).subscribe(data => {
          this.http.delete(`http://localhost:8080/user/${this.user.id}`).subscribe(data => {
            Swal.fire({
              title: "Deleted!",
              text: "Your account has been deleted.",
              icon: "success"
            });
          })
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelled",
          text: "Your account is safe :)",
          icon: "error"
        });
      }
    });

  }

  // openChangePasswordModal() {}
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PopupCardComponent } from "../../../common/popup-card/popup-card.component";
import { FormsModule } from '@angular/forms'
import { Customer } from '../../../model/Customer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-customer',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, PopupCardComponent, FormsModule],
  templateUrl: './manage-customer.component.html'
})
export class ManageCustomerComponent {
  loading = true
  customerList: Customer[] = [];
  permenentCustomerList: Customer[] = [];

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

  searchTxt = ''
  countryFilter = "All"
  genderFilter = "All"

  constructor(private http: HttpClient) {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerList = []
    this.http.get<Customer[]>("http://localhost:8080/customer/get/all").subscribe(data => {
      data.forEach(obj => {
        this.loading = false
        this.customerList.push(obj);
        this.permenentCustomerList.push(obj);
      })
    })
  }

  setGenderFilter(filter: string) {
    this.genderFilter = filter;

    if (this.genderFilter !== 'All') {
      this.customerList = this.permenentCustomerList.filter(customer => customer.gender === this.genderFilter);
    } else {
      this.customerList = [...this.permenentCustomerList];
    }
  }

  setCountryFilter(filter: string) {
    this.countryFilter = filter;

    if (this.countryFilter !== 'All') {
      this.customerList = this.permenentCustomerList.filter(customer => customer.country === this.countryFilter);
    } else {
      this.customerList = [...this.permenentCustomerList];
    }
  }

  searchTextFilter() {
    this.customerList = this.permenentCustomerList.filter(customer => customer.fname.toLowerCase().startsWith(this.searchTxt.toLowerCase()) || customer.userId?.toLowerCase().startsWith(this.searchTxt.toLowerCase()) || customer.id?.toLowerCase().includes(this.searchTxt.toLowerCase()))
  }

  getUserImage(name: string) {
    const colors = ['FF5733', '4287f5', '34a853', '9b59b6', 'f39c12', '1abc9c', 'e84393', '8e44ad', 'f1c40f'];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&rounded=true&background=${colors[name.charCodeAt(0) % colors.length]}&color=ffffff`;
  }
}

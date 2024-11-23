import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Reservation } from "../../../model/Reservation";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-reservation',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NgClass],
  templateUrl: './manage-reservation.component.html'
})
export class ManageReservationComponent {
  loading = true
  reservationList: Reservation[] = [];
  permenentReservationList: Reservation[] = [];

  searchTxt = ''
  paymentFilter: boolean | null = null;
  statusFilter = "All"

  reservationStatuses: string[] = [
    "Confirmed",
    "Cancelled",
    "Checked-In",
    "Checked-Out",
    "Waitlisted"
  ];


  constructor(private readonly http: HttpClient) {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationList = []
    this.permenentReservationList = []
    this.http.get<Reservation[]>("http://localhost:8080/reservation/get/all").subscribe(data => {
      console.log(data);

      data.forEach(obj => {
        this.loading = false
        this.reservationList.push(obj);
        this.permenentReservationList.push(obj);
      })
    })
  }

  setPaymentFilter(filter: boolean | null) {
    this.paymentFilter = filter;

    if (this.paymentFilter !== null) {
      this.reservationList = this.permenentReservationList.filter(reservation => reservation.paymentCompleted === this.paymentFilter);
    } else {
      this.reservationList = [...this.permenentReservationList];
    }
  }

  setStatusFilter(filter: string) {
    this.statusFilter = filter;

    if (this.statusFilter !== "All") {
      this.reservationList = this.permenentReservationList.filter(reservation => reservation.status === this.statusFilter);
    } else {
      this.reservationList = [...this.permenentReservationList];
    }
  }

  searchTextFilter() {
    this.reservationList = this.permenentReservationList.filter(reservation => reservation.customerId?.toLowerCase().startsWith(this.searchTxt.toLowerCase()) || reservation.id?.toLowerCase().includes(this.searchTxt.toLowerCase()))
  }

  paid(reservation: Reservation) {
    Swal.fire({
      title: `Are you sure that the payment for ${reservation.id} was completed?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Payment Done."
    }).then((result) => {
      if (result.isConfirmed) {
        reservation.paymentCompleted = true;
        this.http.put("http://localhost:8080/reservation/update", reservation, { responseType: "text" }).subscribe(data => {
          Swal.fire({
            title: "Success!",
            text: `Payment updated succesfully.`,
            icon: "success"
          });
          this.loadReservations()
        });
      }
    });
  }

  changeStatus(reservation: Reservation) {
    this.http.put("http://localhost:8080/reservation/update", reservation, { responseType: "text" }).subscribe(data => {
      Swal.fire({
        title: "Updated!",
        text: `Status Changed to ${reservation.status}!`,
        icon: "success"
      });
      this.loadReservations()
    });
  }

  showDetails(reservation: Reservation) {
    this.http.get<
    {
      roomId?: string;
      hallId?: string;
      dopId?: string;
      reservationId: string;
      arrivalDate: string;
      departureDate: string;
    }
    >(`http://localhost:8080/reserve/${reservation.resourceType.toLocaleLowerCase()}/get/id/${reservation.id}`).subscribe(data => {
      Swal.fire({
        html: `
        <p class="mb-5 font-semibold text-xl">Reservation Details</p>
        <table class="w-full border-collapse text-md">
          <tbody>
            <tr>
              <td class="px-4 py-2 border">Reservation ID</td>
              <td class="px-4 py-2 border">${reservation.id}</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border">Customer ID</td>
              <td class="px-4 py-2 border">${reservation.customerId}</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border">Special Requests</td>
              <td class="px-4 py-2 border">${reservation.specialRequests ? "" : reservation.specialRequests}</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border">Resource ID</td>
              <td class="px-4 py-2 border">${reservation.resourceType === "Room"
            ? data.roomId
            : reservation.resourceType === "Hall"
              ? data.hallId
              : data.dopId
          }</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border">Arrival Date</td>
              <td class="px-4 py-2 border">${data.arrivalDate}</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border">Departure Date</td>
              <td class="px-4 py-2 border">${data.departureDate}</td>
            </tr>
          </tbody>
        </table>
      `,
        showCancelButton: false,
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        background: '#fff',
        padding: '20px',
        customClass: {
          popup: 'max-w-4xl'
        }
      });
    })
  }

}

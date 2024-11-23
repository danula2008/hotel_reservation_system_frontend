import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../model/Customer';
import { Reservation } from '../../model/Reservation';

@Component({
  selector: 'app-reserve-resource',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './reserve-resource.component.html'
})
export class ReserveResourceComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.queryParams = this.route.snapshot.queryParams;

    this.resourceType = this.queryParams.id.startsWith("R")
      ? "Room"
      : this.queryParams.id.startsWith("H")
        ? "Hall"
        : "Dop"

    this.noDays = (new Date(this.queryParams.end).getTime() - new Date(this.queryParams.start).getTime()) / (1000 * 60 * 60 * 24);
    this.loadResourceFunctionCaller();
  }

  async loadResourceFunctionCaller() {
    await this.loadResource()
  }

  async loadResource() {
    this.resourceDetails = JSON.parse(sessionStorage.getItem("reservationResourceDetails") || '{}');
  }

  queryParams: any;
  resourceType = ''
  placingReservation = false;
  resourceDetails: any;

  noDays = 0
  noMembers: string | null = null
  accommodationTypeRoom = ''
  specialRequests = ''

  activeStep = 0;
  nextStep(): void {
    if (this.activeStep < 3) {
      this.activeStep++;
    }
  }

  previousStep(): void {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  validateStep1(): boolean {
    const isValidNoMembers = this.noMembers !== null && /^\d+$/.test(this.noMembers) && Number(this.noMembers) > 0;
    const isAccommodationTypeRoom = typeof this.resourceType === 'string' && this.resourceType === 'Room' && this.accommodationTypeRoom != '';
    return isValidNoMembers && isAccommodationTypeRoom;
  }

  placeReservation() {
    this.placingReservation = true;
    const now = new Date();
    this.http.get<Customer>(`http://localhost:8080/customer/get/user_id/${JSON.parse(localStorage.getItem('user') || '{}').id}`).subscribe(customer => {

      this.http.post('http://localhost:8080/reservation/add', 
        new Reservation(
          null,
          customer.id,
          this.resourceDetails.price * this.noDays,
          "Confirmed",
          Number.parseInt(this.noMembers?? ""),
          false,
          now.toISOString().split('T')[0],
          now.toTimeString().split(' ')[0],
          this.specialRequests,
          this.resourceType
        ), { responseType: 'text' }).subscribe(reservationId => {

        this.http.post(`http://localhost:8080/reserve/room/add`, {
          "reservationId": reservationId,
          "roomId": this.resourceDetails.id,
          "arrivalDate": this.queryParams.start,
          "departureDate": this.queryParams.end
        }, { responseType: 'text' }).subscribe(roomReserveData => {

          this.http.post(`http://localhost:8080/reserve/date`, {
            "reservationId": reservationId,
            "resourceId": this.resourceDetails.id,
            "dates": this.generateDateRange(new Date(this.queryParams.start), new Date(this.queryParams.end))
          }, { responseType: 'text' }).subscribe(reservationDateData => {

            this.placingReservation = false;
            this.nextStep()

          })
        })
      })
    })
  }

  private generateDateRange(startDate: Date | null, endDate: Date | null): string[] {
    if (!startDate || !endDate) return [];

    const dates: string[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
}

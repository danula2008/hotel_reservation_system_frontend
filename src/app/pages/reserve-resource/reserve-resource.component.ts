import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  async loadResourceFunctionCaller(){
    await this.loadResource()
  }

  async loadResource(){
    this.http.get(`http://localhost:8080/${this.resourceType.toLowerCase()}/get/id/${this.queryParams.id}`).subscribe(data => this.resourceDetails = data)
  }

  queryParams: any;
  resourceType = ''

  resourceDetails: any;

  noDays = 0
  noMembers = null
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

  placeReservation(){
    // let reservationDetails = {
    //   "id": "string",
    //   "customerId": localStorage.getItem('customerId'),
    //   "totPrice": 0,
    //   "status": "Booked",
    //   "noMembers": this.noMembers,
    //   "paymentCompleted": false,
    //   "createdDate": new Date().toISOString().split('T')[0],
    //   "createdTime": new Date().toTimeString().slice(0, 8),
    //   "specialRequests": this.specialRequests
    // }

    // this.http.post("http://localhost:8080/reservation/add", reservationDetails).subscribe(data => )
  }
}

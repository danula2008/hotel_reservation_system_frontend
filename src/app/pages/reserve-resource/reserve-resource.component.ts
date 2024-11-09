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
    // routerLink
  ],
  templateUrl: './reserve-resource.component.html'
})
export class ReserveResourceComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.setTempResourceDetails()
  }

  queryParams: any;
  resourceType = ''

  resourceDetails: any;

  noDays = 0
  noMembers = null
  accommodationTypeRoom = ''
  specialRequests = ''

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParams;

    this.resourceType = this.queryParams.id.startsWith("R")
      ? "Room"
      : this.queryParams.id.startsWith("H")
        ? "Hall"
        : "Dop"

        this.noDays = (new Date(this.queryParams.end).getTime() - new Date(this.queryParams.start).getTime()) / (1000 * 60 * 60 * 24);
    // this.http.get(`http://localhost:8080/get/${this.resourceType.toLowerCase()}/${this.queryParams.id}`).subscribe(data => this.resourceDetails = data)
  }

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

  setTempResourceDetails() {
    this.resourceDetails = {
      "id": "R001",
      "type": "Sea View",
      "name": "Ocean Breeze Suite",
      "capacity": 2,
      "features": "Private Balcony, Air Conditioning, Mini Bar, Ocean View",
      "price": 250.0,
      "bedType": "King Bed",
      "view": "Sea View",
      "internetAccess": true,
      "television": true,
      "image": null,
      "rating": 4,
      "available": false
    }
  }

  validateStep1(): boolean {
    const isValidNoMembers = this.noMembers !== null && /^\d+$/.test(this.noMembers) && Number(this.noMembers) > 0;
    const isAccommodationTypeRoom = typeof this.resourceType === 'string' && this.resourceType === 'Room' && this.accommodationTypeRoom != '';
    return isValidNoMembers && isAccommodationTypeRoom;
}
}

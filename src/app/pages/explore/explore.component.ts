import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../common/card/card.component';
import { trigger, transition, style, animate } from '@angular/animations'
import { PopupCardComponent } from './popup-card/popup-card.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [NgFor, NgIf, CardComponent, FormsModule, MatFormFieldModule, MatInputModule, PopupCardComponent, MatSelectModule, HttpClientModule],
  templateUrl: './explore.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class ExploreComponent {

  constructor(public http: HttpClient) {
    // this.getResources()
    this.setResources()
  }

  public selectedFilter: string = "All";
  public showDropDown: boolean = false;
  public searchTxt: string = "";
  selectedId: number | null = null;
  public resourceOptions: string[] = ["All", "Rooms", "Halls", "Day Out Packages"]
  selectedOption = this.resourceOptions[0];

  sortDropdown = false;
  filter = "room"

  resources: any = []

  toggleSortDropdown(){
    this.sortDropdown = !this.sortDropdown;
  }

  getResources() {
    this.http.get(`hhtp://localhost:8080/${this.filter}/get/all`).subscribe(data => this.resources = data)
  }

  setFilter(filter: string): any {
    this.selectedFilter = filter;
    this.showDropDown = false;
  }

  toggleShowDropdown(): void {
    this.showDropDown = !this.showDropDown;
  }

  clearSearchBar(): void {
    this.searchTxt = "";
  }

  setSelectedId(id: number | null) {
    this.selectedId = id;
  }



  setResources() {
    this.resources = [
      {
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
      },
      {
        "id": "R002",
        "type": "Mountain View",
        "name": "Mountain Retreat",
        "capacity": 4,
        "features": "Fireplace, Air Conditioning, Mini Bar, Mountain View",
        "price": 300.0,
        "bedType": "Queen Bed",
        "view": "Mountain View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 5,
        "available": false
      },
      {
        "id": "R003",
        "type": "City View",
        "name": "Skyline Deluxe",
        "capacity": 3,
        "features": "Balcony, King Bed, Coffee Maker, City View",
        "price": 180.0,
        "bedType": "King Bed",
        "view": "City View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 4,
        "available": false
      },
      {
        "id": "R004",
        "type": "Garden View",
        "name": "Cozy Garden Room",
        "capacity": 2,
        "features": "Air Conditioning, Garden View",
        "price": 120.0,
        "bedType": "Double Bed",
        "view": "Garden View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 4,
        "available": false
      },
      {
        "id": "R005",
        "type": "Sky View",
        "name": "Penthouse Suite",
        "capacity": 6,
        "features": "Private Pool, Ocean View, Jacuzzi, Luxury Furnishings",
        "price": 500.0,
        "bedType": "King Bed",
        "view": "Sky View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 5,
        "available": false
      },
      {
        "id": "R006",
        "type": "Pool View",
        "name": "Poolside Retreat",
        "capacity": 2,
        "features": "Private Balcony, Pool View, Mini Bar",
        "price": 200.0,
        "bedType": "King Bed",
        "view": "Pool View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 4,
        "available": false
      },
      {
        "id": "R007",
        "type": "Park View",
        "name": "Family Fun Suite",
        "capacity": 5,
        "features": "Two Bedrooms, Sofa Bed, Park View, Kitchenette",
        "price": 350.0,
        "bedType": "2 Queen Beds",
        "view": "Park View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 5,
        "available": false
      },
      {
        "id": "R008",
        "type": "Ocean View",
        "name": "Luxury Ocean View Room",
        "capacity": 2,
        "features": "Balcony, Ocean View, Air Conditioning, Spa Bath",
        "price": 450.0,
        "bedType": "King Bed",
        "view": "Ocean View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 5,
        "available": false
      },
      {
        "id": "R009",
        "type": "City View",
        "name": "Standard City Room",
        "capacity": 1,
        "features": "Air Conditioning, TV, City View",
        "price": 100.0,
        "bedType": "Single Bed",
        "view": "City View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 4,
        "available": false
      },
      {
        "id": "R010",
        "type": "Beach View",
        "name": "Beachfront Paradise",
        "capacity": 3,
        "features": "Oceanfront, Balcony, Air Conditioning, Mini Bar",
        "price": 320.0,
        "bedType": "Queen Bed",
        "view": "Beach View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 5,
        "available": false
      },
      {
        "id": "R011",
        "type": "Garden View",
        "name": "Spa Retreat Suite",
        "capacity": 2,
        "features": "Private Spa, Hot Tub, Garden View, Air Conditioning",
        "price": 400.0,
        "bedType": "King Bed",
        "view": "Garden View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 5,
        "available": false
      },
      {
        "id": "R012",
        "type": "Ocean View",
        "name": "Honeymoon Suite",
        "capacity": 2,
        "features": "Private Balcony, Jacuzzi, Ocean View",
        "price": 350.0,
        "bedType": "King Bed",
        "view": "Ocean View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 5,
        "available": false
      },
      {
        "id": "R013",
        "type": "City View",
        "name": "Loft with a View",
        "capacity": 2,
        "features": "Open Concept, City View, Full Kitchen",
        "price": 220.0,
        "bedType": "Queen Bed",
        "view": "City View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 4,
        "available": false
      },
      {
        "id": "R014",
        "type": "Forest View",
        "name": "Cozy Cottage",
        "capacity": 4,
        "features": "Fireplace, Forest View, Kitchenette",
        "price": 180.0,
        "bedType": "2 Double Beds",
        "view": "Forest View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 4,
        "available": false
      },
      {
        "id": "R015",
        "type": "Mountain View",
        "name": "Grand Mountain Suite",
        "capacity": 5,
        "features": "Private Balcony, 2 Bedrooms, Mountain View",
        "price": 600.0,
        "bedType": "2 King Beds",
        "view": "Mountain View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 5,
        "available": false
      },
      {
        "id": "R016",
        "type": "City View",
        "name": "Executive Suite",
        "capacity": 3,
        "features": "Work Desk, City View, Air Conditioning",
        "price": 380.0,
        "bedType": "1 King Bed, 1 Sofa Bed",
        "view": "City View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 4,
        "available": false
      },
      {
        "id": "R017",
        "type": "Street View",
        "name": "Single Room",
        "capacity": 1,
        "features": "TV, Street View",
        "price": 85.0,
        "bedType": "Single Bed",
        "view": "Street View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 3,
        "available": false
      },
      {
        "id": "R018",
        "type": "Ocean View",
        "name": "Oceanfront Luxury Villa",
        "capacity": 8,
        "features": "Private Pool, Ocean View, Full Kitchen",
        "price": 1200.0,
        "bedType": "3 King Beds",
        "view": "Ocean View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 5,
        "available": false
      },
      {
        "id": "R019",
        "type": "City View",
        "name": "Budget Double Room",
        "capacity": 2,
        "features": "Air Conditioning, TV, City View",
        "price": 110.0,
        "bedType": "2 Double Beds",
        "view": "City View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 3,
        "available": false
      },
      {
        "id": "R020",
        "type": "Park View",
        "name": "Deluxe Family Room",
        "capacity": 6,
        "features": "Two Bedrooms, Sofa Bed, Park View",
        "price": 400.0,
        "bedType": "1 King Bed, 2 Queen Beds",
        "view": "Park View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 5,
        "available": false
      },
      {
        "id": "R021",
        "type": "Mountain View",
        "name": "Chalet Retreat",
        "capacity": 4,
        "features": "Fireplace, Kitchenette, Mountain View",
        "price": 350.0,
        "bedType": "2 Queen Beds",
        "view": "Mountain View",
        "internetAccess": true,
        "television": true,
        "image": null,
        "rating": 4,
        "available": false
      }
    ]
  }
}

import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../common/card/card.component';
import { trigger, transition, style, animate } from '@angular/animations'
import { PopupCardComponent } from './popup-card/popup-card.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { NgClass } from "@angular/common"

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [NgFor, NgIf, CardComponent, FormsModule, MatFormFieldModule, MatInputModule, PopupCardComponent, MatSelectModule, NgClass],
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
    this.resources = this.setResources("Rooms")
    this.getResourcesFilterLists()
  }

  public searchTxt: string = "";
  selectedId: number | null = null;
  public resourceOptions: string[] = ["Rooms", "Halls", "Day Out Packages"]
  selectedOption = this.resourceOptions[0];

  showMobileFilters = false;
  showResourceDropdown = false;
  selectedResource = "Rooms"

  resources: any = []
  resourceFilterCategories: any = {}

  getResourcesFilterLists() {
    this.resourceFilterCategories = {}
    if (this.selectedResource === this.resourceOptions[0]) {
      let categories: any = {
        "Type": [],
        "Bed Type": [],
        "View": []
      };

      for (let resource of this.resources) {
        categories["Type"][resource.type] = (categories["Type"][resource.type] || 0) + 1;
        categories["Bed Type"][resource.bedType] = (categories["Bed Type"][resource.bedType] || 0) + 1;
        categories["View"][resource.view] = (categories["View"][resource.view] || 0) + 1;
      }
      
      for (let key in categories) {
        this.resourceFilterCategories[key] = Object.keys(categories[key])
          .filter(value => categories[key][value] > 2)
          .sort();
      }

      for (let i in this.resourceFilterCategories){
        if(this.resourceFilterCategories[i].length < 2){
          delete this.resourceFilterCategories[i]
        }
      }
    } else if (this.selectedResource === this.resourceOptions[1]) {
      let categories: any = {
        "Type": [],
        "Decorator Style": []
      };

      for (let resource of this.resources) {
        categories["Type"][resource.type] = (categories["Type"][resource.type] || 0) + 1;
        categories["Decorator Style"][resource.decoratorStyle] = (categories["Decorator Style"][resource.decoratorStyle] || 0) + 1;
      }
      
      for (let key in categories) {
        this.resourceFilterCategories[key] = Object.keys(categories[key])
          .filter(value => categories[key][value] > 2)
          .sort();
      }

      for (let i in this.resourceFilterCategories){
        if(this.resourceFilterCategories[i].length < 2){
          delete this.resourceFilterCategories[i]
        }
      }
    } else if (this.selectedResource === this.resourceOptions[2]) {
      let categories: any = {
        "Duration": [],
        "Age Limit": [],
        "Time Of Day": [],
        "Group Size": []
      };

      for (let resource of this.resources) {
        categories["Duration"][resource.duration] = (categories["Duration"][resource.duration] || 0) + 1;
        categories["Age Limit"][resource.ageLimit] = (categories["Age Limit"][resource.ageLimit] || 0) + 1;
        categories["Time Of Day"][resource.timeOfDay] = (categories["Time Of Day"][resource.timeOfDay] || 0) + 1;
        categories["Group Size"][resource.groupSize] = (categories["Group Size"][resource.groupSize] || 0) + 1;
      }
      
      for (let key in categories) {
        this.resourceFilterCategories[key] = Object.keys(categories[key])
          .filter(value => categories[key][value] > 2)
          .sort();
      }

      for (let i in this.resourceFilterCategories){
        if(this.resourceFilterCategories[i].length < 2){
          delete this.resourceFilterCategories[i]
        }
      }
    }
  }

  toogleShowMobileFilters() {
    this.showMobileFilters = !this.showMobileFilters
  }

  toggleResourceDropdown() {
    this.showResourceDropdown = !this.showResourceDropdown;
  }

  setSelectedResource(resource: string) {
    this.selectedResource = resource;
    this.resources = this.setResources(resource)
    this.showResourceDropdown = false;
    this.showMobileFilters = false;
    this.getResourcesFilterLists()
    console.log(this.resourceFilterCategories)
  }

  getResources() {
    this.http.get(`hhtp://localhost:8080/${this.selectedResource}/get/all`).subscribe(data => this.resources = data)
  }

  clearSearchBar(): void {
    this.searchTxt = "";
  }

  setSelectedId(id: number | null) {
    this.selectedId = id;
  }



  setResources(resource: string) {
    if (resource === "Rooms") {
      return [
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
    } else if (resource === "Halls") {
      return [
        {
          "id": "H001",
          "name": "Ocean View Conference Hall",
          "description": "A spacious hall with a breathtaking ocean view, perfect for corporate meetings and seminars.",
          "type": "Event Hall",
          "capacity": 200,
          "price": 15000.0,
          "availEquip": "Projector, Sound System, Chairs, Tables",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Contemporary",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H002",
          "name": "Beachfront Banquet Hall",
          "description": "A large banquet hall located right on the beach, ideal for weddings and grand events with ocean views.",
          "type": "Banquet Hall",
          "capacity": 300,
          "price": 25000.0,
          "availEquip": "Chairs, Tables, Stage, Sound System",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Elegant",
          "image": null,
          "rating": 5,
          "available": "true"
        },
        {
          "id": "H003",
          "name": "Coral Reef Event Hall",
          "description": "A luxurious hall designed with coral-themed decor, great for conferences, exhibitions, and celebrations.",
          "type": "Event Hall",
          "capacity": 150,
          "price": 12000.0,
          "availEquip": "Projector, Chairs, Tables, Audio System",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Tropical",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H004",
          "name": "Lighthouse Conference Room",
          "description": "A small, modern conference room with advanced tech and a beautiful view of the Galle Lighthouse.",
          "type": "Conference Room",
          "capacity": 50,
          "price": 8000.0,
          "availEquip": "Projector, Video Conferencing, Chairs",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Modern",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H005",
          "name": "Turtle Bay Hall",
          "description": "An eco-friendly hall near turtle nesting sites, perfect for sustainability-themed events and eco-tourism conferences.",
          "type": "Event Hall",
          "capacity": 120,
          "price": 10000.0,
          "availEquip": "Chairs, Tables, Projector, Screen",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Nature",
          "image": null,
          "rating": 3,
          "available": "true"
        },
        {
          "id": "H006",
          "name": "Sunset Terrace Event Hall",
          "description": "A hall with an open terrace and stunning sunset views, perfect for evening parties and social events.",
          "type": "Event Hall",
          "capacity": 180,
          "price": 18000.0,
          "availEquip": "Chairs, Tables, Sound System",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Contemporary",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H007",
          "name": "Pearl Lagoon Conference Hall",
          "description": "A medium-sized hall with a scenic lagoon view, great for intimate business meetings and seminars.",
          "type": "Conference Room",
          "capacity": 80,
          "price": 12000.0,
          "availEquip": "Chairs, Projector, Screen",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Minimalist",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H008",
          "name": "Sea Breeze Banquet Hall",
          "description": "An elegant hall offering a sea breeze ambiance, perfect for weddings, gala dinners, and corporate functions.",
          "type": "Banquet Hall",
          "capacity": 250,
          "price": 22000.0,
          "availEquip": "Chairs, Tables, Stage, Sound System",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Classic",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H009",
          "name": "Cinnamon Grand Ballroom",
          "description": "An expansive ballroom for grand events, featuring luxurious decor and high ceilings for weddings and gala dinners.",
          "type": "Ballroom",
          "capacity": 350,
          "price": 30000.0,
          "availEquip": "Chairs, Tables, Stage, Sound System, Dance Floor",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Royal",
          "image": null,
          "rating": 5,
          "available": "true"
        },
        {
          "id": "H010",
          "name": "Golden Sands Hall",
          "description": "A golden-themed hall perfect for high-profile business events, product launches, and exhibitions by the coast.",
          "type": "Event Hall",
          "capacity": 220,
          "price": 15000.0,
          "availEquip": "Projector, Sound System, Chairs",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Opulent",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H011",
          "name": "Lagoon Vista Conference Hall",
          "description": "A quiet and cozy conference room with panoramic views of the lagoon, perfect for workshops and brainstorming sessions.",
          "type": "Conference Room",
          "capacity": 40,
          "price": 9000.0,
          "availEquip": "Chairs, Projector, Screen",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Modern",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H012",
          "name": "The Pearl Hall",
          "description": "A sophisticated event hall ideal for social events, featuring a pearl-inspired interior design and modern amenities.",
          "type": "Event Hall",
          "capacity": 180,
          "price": 14000.0,
          "availEquip": "Chairs, Tables, Projector",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Elegant",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H013",
          "name": "Tropical Breeze Banquet Hall",
          "description": "A tropical-themed banquet hall, perfect for beachside parties, weddings, and grand celebrations.",
          "type": "Banquet Hall",
          "capacity": 220,
          "price": 16000.0,
          "availEquip": "Chairs, Tables, Stage, Sound System",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Tropical",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H014",
          "name": "Oceanfront Event Hall",
          "description": "A beachfront hall designed for corporate events and social gatherings, offering the sound of waves as a natural backdrop.",
          "type": "Event Hall",
          "capacity": 100,
          "price": 12000.0,
          "availEquip": "Chairs, Tables, Projector",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Contemporary",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H015",
          "name": "Vista Bay Conference Room",
          "description": "A professional conference room with panoramic bay views, ideal for smaller meetings and seminars.",
          "type": "Conference Room",
          "capacity": 60,
          "price": 11000.0,
          "availEquip": "Chairs, Projector, Video Conferencing",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Modern",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H016",
          "name": "Beachfront Pavilion",
          "description": "An open-air pavilion right by the beach, great for casual events, beach parties, and open-air conferences.",
          "type": "Outdoor Event Hall",
          "capacity": 250,
          "price": 18000.0,
          "availEquip": "Chairs, Tables, Sound System",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Rustic",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H017",
          "name": "Royal Galle Hall",
          "description": "A regal banquet hall featuring colonial-style architecture, ideal for weddings and royal-inspired events.",
          "type": "Banquet Hall",
          "capacity": 350,
          "price": 30000.0,
          "availEquip": "Chairs, Tables, Stage, Sound System",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Regal",
          "image": null,
          "rating": 5,
          "available": "true"
        },
        {
          "id": "H018",
          "name": "Lighthouse Ocean Hall",
          "description": "An ocean-themed hall with modern facilities, perfect for corporate events and workshops with scenic views of the lighthouse.",
          "type": "Event Hall",
          "capacity": 180,
          "price": 13000.0,
          "availEquip": "Projector, Sound System, Chairs",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Modern",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H019",
          "name": "Sapphire Sands Banquet Hall",
          "description": "A luxurious banquet hall with sapphire-themed decor, suitable for both corporate and social events.",
          "type": "Banquet Hall",
          "capacity": 220,
          "price": 21000.0,
          "availEquip": "Chairs, Tables, Stage, Sound System",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Luxurious",
          "image": null,
          "rating": 5,
          "available": "true"
        },
        {
          "id": "H020",
          "name": "Golden Sunset Conference Room",
          "description": "A conference room with stunning sunset views, perfect for intimate meetings and professional gatherings.",
          "type": "Conference Room",
          "capacity": 50,
          "price": 8000.0,
          "availEquip": "Chairs, Projector, Video Conferencing",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Minimalist",
          "image": null,
          "rating": 4,
          "available": "true"
        },
        {
          "id": "H021",
          "name": "Ocean Breeze Hall",
          "description": "A breezy hall located by the sea, perfect for corporate events, workshops, and casual gatherings.",
          "type": "Event Hall",
          "capacity": 150,
          "price": 14000.0,
          "availEquip": "Projector, Chairs, Tables",
          "internetAccess": true,
          "climateControl": true,
          "decoratorStyle": "Contemporary",
          "image": null,
          "rating": 4,
          "available": "true"
        }
      ]
    } else if (resource === "Day Out Packages") {
      return [
        {
          "id": "DOP001",
          "name": "Beachfront Wedding Package",
          "description": "A complete wedding package by the beach, including catering, venue setup, and decorations.",
          "duration": "6 hours",
          "price": 50000.0,
          "inclusion": "Venue, Catering, Decoration, Sound System",
          "equipments": "Chairs, Tables, Sound System, Stage, Decoration",
          "ageLimit": "None",
          "timeOfDay": "Evening",
          "foodDetails": "Full-course Meal, Cake, Drinks",
          "groupSize": "50-150 guests",
          "image": null,
          "rating": 5,
          "available": true
        },
        {
          "id": "DOP002",
          "name": "Coral Reef Conference Package",
          "description": "A professional conference package with high-end facilities, designed for corporate events at a coastal venue.",
          "duration": "8 hours",
          "price": 20000.0,
          "inclusion": "Venue, Projector, Sound System",
          "equipments": "Projector, Microphone, Chairs, Tables, Whiteboard",
          "ageLimit": "18+",
          "timeOfDay": "Morning",
          "foodDetails": "Tea, Coffee, Snacks",
          "groupSize": "10-50 people",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP003",
          "name": "Sunset Cocktail Event",
          "description": "A cocktail event on the terrace with a stunning sunset view, perfect for social gatherings and networking events.",
          "duration": "4 hours",
          "price": 15000.0,
          "inclusion": "Venue, Drinks, Snacks",
          "equipments": "Tables, Chairs, Bar Setup, Music System",
          "ageLimit": "21+",
          "timeOfDay": "Evening",
          "foodDetails": "Cocktails, Finger Foods, Refreshments",
          "groupSize": "20-80 guests",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP004",
          "name": "Family Beach Fun Package",
          "description": "A family-friendly package with games, activities, and food for all ages. Ideal for family reunions or casual group events.",
          "duration": "6 hours",
          "price": 10000.0,
          "inclusion": "Venue, Games, Catering",
          "equipments": "Games Equipment, Tables, Chairs, Sound System",
          "ageLimit": "All Ages",
          "timeOfDay": "Afternoon",
          "foodDetails": "BBQ, Snacks, Soft Drinks",
          "groupSize": "30-100 people",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP005",
          "name": "Turtle Conservation Event",
          "description": "A unique eco-tourism event promoting turtle conservation efforts. Includes talks, beach tours, and donation opportunities.",
          "duration": "4 hours",
          "price": 12000.0,
          "inclusion": "Venue, Environmental Talk, Tour",
          "equipments": "Projector, Microphone, Chairs, Tables",
          "ageLimit": "All Ages",
          "timeOfDay": "Morning",
          "foodDetails": "Snacks, Water",
          "groupSize": "10-50 people",
          "image": null,
          "rating": 5,
          "available": true
        },
        {
          "id": "DOP006",
          "name": "Luxury Gala Dinner",
          "description": "An exclusive fine dining event held at the beachside, perfect for luxury celebrations and high-profile guests.",
          "duration": "4 hours",
          "price": 40000.0,
          "inclusion": "Venue, Catering, Entertainment",
          "equipments": "Tables, Chairs, Stage, Lighting, Sound System",
          "ageLimit": "18+",
          "timeOfDay": "Evening",
          "foodDetails": "Multi-course Meal, Wine, Dessert",
          "groupSize": "50-200 people",
          "image": null,
          "rating": 5,
          "available": true
        },
        {
          "id": "DOP007",
          "name": "Corporate Team Building Package",
          "description": "A corporate event package focused on team-building activities, including games, seminars, and lunch.",
          "duration": "6 hours",
          "price": 18000.0,
          "inclusion": "Venue, Activities, Catering",
          "equipments": "Games Equipment, Chairs, Tables, Projector",
          "ageLimit": "18+",
          "timeOfDay": "Afternoon",
          "foodDetails": "Lunch, Tea, Coffee",
          "groupSize": "20-100 people",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP008",
          "name": "Yoga Retreat",
          "description": "A wellness retreat offering yoga sessions, meditation, and spa services by the beach.",
          "duration": "3 days",
          "price": 25000.0,
          "inclusion": "Venue, Yoga, Meals, Spa",
          "equipments": "Yoga Mats, Meditation Area, Chairs, Projector",
          "ageLimit": "18+",
          "timeOfDay": "Morning",
          "foodDetails": "Healthy Meals, Juices, Snacks",
          "groupSize": "10-30 people",
          "image": null,
          "rating": 5,
          "available": true
        },
        {
          "id": "DOP009",
          "name": "Ocean Adventure Package",
          "description": "An adventure package for water sports lovers, including snorkeling, diving, and boat tours along the coast.",
          "duration": "6 hours",
          "price": 22000.0,
          "inclusion": "Activities, Equipment, Catering",
          "equipments": "Snorkeling Gear, Boat, Safety Equipment",
          "ageLimit": "18+",
          "timeOfDay": "Morning",
          "foodDetails": "Lunch, Snacks, Drinks",
          "groupSize": "5-20 people",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP010",
          "name": "Cultural Heritage Tour",
          "description": "A guided tour of nearby cultural sites and historical landmarks along Sri Lanka's coastline.",
          "duration": "5 hours",
          "price": 8000.0,
          "inclusion": "Tour, Guide, Transportation",
          "equipments": "Transportation, Guide, Entrance Fees",
          "ageLimit": "All Ages",
          "timeOfDay": "Morning",
          "foodDetails": "Light Snacks, Water",
          "groupSize": "10-40 people",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP011",
          "name": "Fishing Expedition Package",
          "description": "A deep-sea fishing adventure where guests can experience the thrill of fishing in the Indian Ocean.",
          "duration": "5 hours",
          "price": 15000.0,
          "inclusion": "Boat, Gear, Catering",
          "equipments": "Fishing Rods, Boats, Safety Gear",
          "ageLimit": "18+",
          "timeOfDay": "Morning",
          "foodDetails": "Lunch, Drinks, Snacks",
          "groupSize": "2-10 people",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP012",
          "name": "Beach Yoga and Meditation",
          "description": "A relaxing package combining yoga sessions and meditation at sunrise, set on the beach.",
          "duration": "2 hours",
          "price": 12000.0,
          "inclusion": "Yoga, Meditation, Tea",
          "equipments": "Yoga Mats, Meditation Cushions",
          "ageLimit": "18+",
          "timeOfDay": "Morning",
          "foodDetails": "Tea, Fresh Fruit",
          "groupSize": "10-30 people",
          "image": null,
          "rating": 5,
          "available": true
        },
        {
          "id": "DOP013",
          "name": "Luxury Sunset Cruise",
          "description": "A luxury cruise along Sri Lanka's coast with cocktails and sunset views.",
          "duration": "3 hours",
          "price": 35000.0,
          "inclusion": "Cruise, Drinks, Music",
          "equipments": "Boat, Bar Setup, Music",
          "ageLimit": "18+",
          "timeOfDay": "Evening",
          "foodDetails": "Cocktails, Canapés, Dessert",
          "groupSize": "10-20 people",
          "image": null,
          "rating": 5,
          "available": true
        },
        {
          "id": "DOP014",
          "name": "Beach BBQ Party",
          "description": "An exclusive BBQ party on the beach, complete with music, food, and a bonfire.",
          "duration": "5 hours",
          "price": 12000.0,
          "inclusion": "Venue, BBQ, Drinks",
          "equipments": "BBQ Grill, Tables, Chairs, Music System",
          "ageLimit": "All Ages",
          "timeOfDay": "Evening",
          "foodDetails": "BBQ, Salad, Drinks",
          "groupSize": "20-50 people",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP015",
          "name": "Wildlife Safari Day Trip",
          "description": "A day trip to explore Sri Lanka's wildlife in nearby national parks, with a guide and transport.",
          "duration": "8 hours",
          "price": 18000.0,
          "inclusion": "Tour, Transport, Guide",
          "equipments": "Transport, Guide, Park Fees",
          "ageLimit": "All Ages",
          "timeOfDay": "Morning",
          "foodDetails": "Lunch, Water, Snacks",
          "groupSize": "10-40 people",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP016",
          "name": "Beach side Photography Session",
          "description": "A professional photography session to capture special moments at the beach, ideal for couples or families.",
          "duration": "2 hours",
          "price": 10000.0,
          "inclusion": "Photography, Venue",
          "equipments": "Camera, Backdrops, Lighting",
          "ageLimit": "All Ages",
          "timeOfDay": "Morning",
          "foodDetails": "Refreshments, Water",
          "groupSize": "1-10 people",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP017",
          "name": "Luxury Spa Day Package",
          "description": "A luxury spa experience including massages, facials, and wellness treatments by the beach.",
          "duration": "5 hours",
          "price": 30000.0,
          "inclusion": "Spa, Wellness, Refreshments",
          "equipments": "Spa Equipment, Towels, Aromatherapy",
          "ageLimit": "18+",
          "timeOfDay": "Afternoon",
          "foodDetails": "Spa Treatments, Tea, Fruit",
          "groupSize": "1-10 people",
          "image": null,
          "rating": 5,
          "available": true
        },
        {
          "id": "DOP018",
          "name": "Surfing Experience",
          "description": "An exciting surfing package for both beginners and experienced surfers, with lessons and equipment provided.",
          "duration": "4 hours",
          "price": 15000.0,
          "inclusion": "Lesson, Equipment, Refreshments",
          "equipments": "Surfboards, Wetsuits, Instructor",
          "ageLimit": "18+",
          "timeOfDay": "Morning",
          "foodDetails": "Lunch, Drinks",
          "groupSize": "5-15 people",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP019",
          "name": "Underwater Adventure",
          "description": "An underwater exploration experience with scuba diving, allowing guests to discover Sri Lanka's underwater beauty.",
          "duration": "6 hours",
          "price": 35000.0,
          "inclusion": "Diving, Equipment, Refreshments",
          "equipments": "Scuba Gear, Boat, Instructor",
          "ageLimit": "18+",
          "timeOfDay": "Morning",
          "foodDetails": "Lunch, Drinks, Snacks",
          "groupSize": "5-10 people",
          "image": null,
          "rating": 5,
          "available": true
        },
        {
          "id": "DOP020",
          "name": "Cooking Class with Chef",
          "description": "A culinary experience where guests learn to cook traditional Sri Lankan dishes from a professional chef.",
          "duration": "3 hours",
          "price": 10000.0,
          "inclusion": "Class, Ingredients, Lunch",
          "equipments": "Cooking Equipment, Ingredients, Chef",
          "ageLimit": "All Ages",
          "timeOfDay": "Afternoon",
          "foodDetails": "Traditional Sri Lankan Dishes, Drinks",
          "groupSize": "5-15 people",
          "image": null,
          "rating": 4,
          "available": true
        },
        {
          "id": "DOP021",
          "name": "Beach Volleyball Tournament",
          "description": "A fun and competitive beach volleyball event for teams and groups, including prizes and refreshments.",
          "duration": "4 hours",
          "price": 8000.0,
          "inclusion": "Tournament, Equipment, Refreshments",
          "equipments": "Volleyball, Net, Chairs",
          "ageLimit": "All Ages",
          "timeOfDay": "Afternoon",
          "foodDetails": "Snacks, Water",
          "groupSize": "10-30 people",
          "image": null,
          "rating": 4,
          "available": true
        }
      ]
    }
    return null
  }
}

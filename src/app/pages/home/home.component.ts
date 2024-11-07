import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardComponent } from '../../common/card/card.component';
import { NgFor } from '@angular/common';
import { SliderCardComponent } from './slider-card/slider-card.component';
import { RouterLink } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgFor, SliderCardComponent, RouterLink, HttpClientModule],
  templateUrl: './home.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {

  constructor(public http: HttpClient) { this.setResocurces() }

  rooms: any = []
  halls: any = []
  dop: any = []
  resources: any[] = [["Hotel Rooms", this.rooms], ["Hotel Halls", this.halls], ["Hotel Day Out Packages", this.dop]];

  getResources() {
    this.http.get("http://localhost:8080/room/get?rating=4").subscribe(data => this.rooms = data)
    this.http.get("http://localhost:8080/halls/get?rating=4").subscribe(data => this.halls = data)
    this.http.get("http://localhost:8080/dop/get?rating=4").subscribe(data => this.dop = data)
  }

  setResocurces() {
    this.rooms = [
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
      }
    ]


    this.halls = [
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
      }
    ]

    this.dop = [
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
      }
    ]
  }

}

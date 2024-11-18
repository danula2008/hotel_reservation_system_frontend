import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardComponent } from '../../common/card/card.component';
import { NgFor } from '@angular/common';
import { SliderCardComponent } from './slider-card/slider-card.component';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DayOutPackage } from '../../model/DayOutPackage';
import { Room } from '../../model/Room';
import { Hall } from '../../model/Hall';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgFor, SliderCardComponent, RouterLink],
  templateUrl: './home.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {

  constructor(public http: HttpClient) { this.getResources() }

  rooms: Room[] = []
  halls: Hall[] = []
  dop: DayOutPackage[] = []
  resources: any[] = [["Hotel Rooms", this.rooms], ["Hotel Halls", this.halls], ["Hotel Day Out Packages", this.dop]];

  getResources() {
    this.http.get<Room[]>("http://localhost:8080/room/get?rating=5").subscribe(data => data.forEach(obj => this.rooms.push(obj)))
    this.http.get<Hall[]>("http://localhost:8080/hall/get?rating=5").subscribe(data => data.forEach(obj => this.halls.push(obj)))
    this.http.get<DayOutPackage[]>("http://localhost:8080/dop/get?rating=5").subscribe(data => data.forEach(obj => this.dop.push(obj)))
  }

  hotelReviews = [
    {
      name: "Nimal Perera",
      position: "Business Traveler",
      comment: "I had an excellent experience at Tropical Heaven Hotel. The staff was incredibly attentive, and the rooms were well-appointed and comfortable. The breakfast selection was diverse and delicious, making it a great start to my day. I highly recommend this hotel for anyone visiting the city!",
      rating: 4
    },
    {
      name: "Kavinda Jayasinghe",
      position: "Tourist",
      comment: "Our family stay at Tropical Heaven Hotel was fantastic! The location is perfect, just a short walk from the main attractions. The staff went above and beyond to ensure we had everything we needed. The kids loved the breakfast, especially the fresh pastries!",
      rating: 5
    },
    {
      name: "Anushka Fernando",
      position: "Solo Traveler",
      comment: "As a solo traveler, I felt very safe and welcomed at Tropical Heaven Hotel. The staff were friendly and helpful, offering great recommendations for local sights and restaurants. The room was cozy and clean, making it a perfect retreat after a day of exploring.",
      rating: 4
    },
    {
      name: "Chamara Silva",
      position: "Couples Getaway",
      comment: "My partner and I had a wonderful romantic getaway at Tropical Heaven Hotel. The ambiance was perfect, and the staff surprised us with a complimentary bottle of wine for our anniversary. The breakfast buffet was delightful, with plenty of options to choose from.",
      rating: 5
    },
    {
      name: "Dilani Abeykoon",
      position: "Travel Blogger",
      comment: "Tropical Heaven Hotel exceeded my expectations! The decor is stylish and modern, and the location is ideal for exploring the city. I particularly enjoyed the breakfast spread, which included both local and international dishes. I can't wait to share my experience on my blog!",
      rating: 5
    },
    {
      name: "Rohan Weerasinghe",
      position: "Conference Attendee",
      comment: "I stayed at Tropical Heaven Hotel while attending a conference nearby. The facilities were top-notch, and the staff were incredibly accommodating. I appreciated the quiet atmosphere in my room, which allowed me to prepare for my presentations without distractions.",
      rating: 4
    },
    {
      name: "Samanthi Perera",
      position: "Family Vacationer",
      comment: "We had a lovely family vacation at Tropical Heaven Hotel! The kids enjoyed the spacious rooms and the friendly staff made us feel right at home. The location made it easy to visit all the major attractions without hassle.",
      rating: 5
    },
    {
      name: "Tharindu Kumara",
      position: "Cultural Enthusiast",
      comment: "Tropical Heaven Hotel is a gem! As someone who loves immersing myself in local culture, I found the staff's recommendations for nearby attractions invaluable. The breakfast was fantastic, featuring many local dishes that I thoroughly enjoyed.",
      rating: 5
    }
  ];
}

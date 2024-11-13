import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardComponent } from '../../common/card/card.component';
import { NgFor } from '@angular/common';
import { SliderCardComponent } from './slider-card/slider-card.component';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgFor, SliderCardComponent, RouterLink],
  templateUrl: './home.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {

  constructor(public http: HttpClient) { this.getResources() }

  rooms: any = []
  halls: any = []
  dop: any = []
  resources: any[] = [["Hotel Rooms", this.rooms], ["Hotel Halls", this.halls], ["Hotel Day Out Packages", this.dop]];

  getResources() {
    this.http.get("http://localhost:8080/room/get?rating=5").subscribe(data => this.rooms = data)
    this.http.get("http://localhost:8080/hall/get?rating=5").subscribe(data => this.halls = data)
    this.http.get("http://localhost:8080/dop/get?rating=5").subscribe(data => this.dop = data)
  }
}

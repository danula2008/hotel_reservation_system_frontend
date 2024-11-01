import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardComponent } from '../../common/card/card.component';
import { NgFor } from '@angular/common';
import { SliderCardComponent } from './slider-card/slider-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgFor, SliderCardComponent],
  templateUrl: './home.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider-card.component.html'
})
export class SliderCardComponent {
  @Input()
  public customerComment!: {
    name: string,
    position: string,
    comment: string,
    rating: number
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ReservationCardComponent } from "./reservation-card/reservation-card.component";

@Component({
  selector: 'app-view-users-reservations',
  standalone: true,
  imports: [ReservationCardComponent, CommonModule],
  templateUrl: './view-users-reservations.component.html'
})
export class ViewUsersReservationsComponent {

}

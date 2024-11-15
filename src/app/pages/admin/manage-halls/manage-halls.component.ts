import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PopupCardComponent } from "../../../common/popup-card/popup-card.component";
import { FormsModule } from '@angular/forms'
import { Hall } from '../../../model/Hall';

@Component({
  selector: 'app-manage-halls',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, PopupCardComponent, FormsModule],
  templateUrl: './manage-halls.component.html'
})
export class ManageHallsComponent {
  loading = true
  hallList: Hall[] = [];
  permenentHallList: Hall[] = [];
  selectedHall: Hall | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  searchTxt = ''
  availableFilter = "All"
  ratingFilter = "All"

  constructor(private http: HttpClient) {
    this.loadHalls();
  }

  loadHalls() {
    this.http.get<Hall[]>("http://localhost:8080/hall/get/all").subscribe(data => {
      data.forEach(obj => {      
        this.loading = false
        this.hallList.push(obj);
        this.permenentHallList.push(obj);
      })
    })
  }

  setAvailabilityFilter(filter: string) {
    this.availableFilter = filter;

    if (this.availableFilter === 'Available') {
      this.hallList = this.permenentHallList.filter(hall => hall.available === true);
    } else if (this.availableFilter === 'Not Available') {
      this.hallList = this.permenentHallList.filter(hall => hall.available === false);
    } else {
      this.hallList = [...this.permenentHallList];
    }
  }

  setRatingFilter(filter: string) {
    this.ratingFilter = filter;

    if (this.ratingFilter === 'All') {
      this.hallList = [...this.permenentHallList];
    } else {
      const ratingValue = parseInt(this.ratingFilter.split(' ')[0], 10);
      this.hallList = this.permenentHallList.filter(hall => hall.rating === ratingValue);
    }
  }

  searchTextFilter() {
    this.hallList = this.permenentHallList.filter(hall => hall.name.toLowerCase().startsWith(this.searchTxt.toLowerCase()) || hall.id.toLowerCase().includes(this.searchTxt.toLowerCase()))
  }

  showModel(hall: Hall) {
    this.selectedHall = hall;
  }

  editHall(hall: Hall) {
    console.log(hall);
  }

  deleteHall(hall: Hall) {
    console.log(hall);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeImage(): void {
    this.imagePreview = null;
  }
}

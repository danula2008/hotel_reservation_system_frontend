import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PopupCardComponent } from "../../../common/popup-card/popup-card.component";
import { FormsModule } from '@angular/forms'
import { Hall } from '../../../model/Hall';
import Swal from 'sweetalert2';

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

  newHall: Hall = new Hall('', '', '', '', 0, 0, '', false, false, '', null, 0, true);

  searchTxt = ''
  availableFilter = "All"
  ratingFilter = "All"

  constructor(private http: HttpClient) {
    this.loadHalls();
  }

  loadHalls() {
    this.hallList = []
    this.http.get<Hall[]>("http://localhost:8080/hall/get/all").subscribe(data => {
      data.forEach(obj => {
        this.loading = false
        this.hallList.push(obj);
        this.permenentHallList.push(obj);
      })
      console.log(this.hallList[0].available, this.hallList[0].id)
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

  toogleAvailabilityHall(hall: Hall, newState: boolean) {
    hall.available = newState;
    this.http.put("http://localhost:8080/hall", hall, { responseType: "text" }).subscribe(data => {
      this.loadHalls()
    });
  }

  editHall(hall: Hall) {
    console.log(hall);
  }

  deleteHall(hall: Hall) {
    Swal.fire({
      title: `Are you sure you want to delete Room ${hall.id}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8080/hall/${hall.id}`, { responseType: "text" }).subscribe(data => {
          Swal.fire({
            title: "Deleted!",
            text: `Hall ${hall.id} has deleted succesfully.`,
            icon: "success"
          });
          this.loadHalls()
        })
      }
    });
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

  addHall() {
    this.http.post("http://localhost:8080/hall", this.newHall, { responseType: "text" }).subscribe(data => {
      this.loadHalls()
    })
  }
}

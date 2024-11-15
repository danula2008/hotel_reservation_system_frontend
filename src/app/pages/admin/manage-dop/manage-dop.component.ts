import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { PopupCardComponent } from "../../../common/popup-card/popup-card.component";
import { FormsModule } from '@angular/forms'
import { DayOutPackage } from '../../../model/DayOutPackage';

@Component({
  selector: 'app-manage-dop',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, PopupCardComponent, FormsModule],
  templateUrl: './manage-dop.component.html'
})
export class ManageDopComponent {
  loading = true;
  dopList: DayOutPackage[] = [];
  permenentDopList: DayOutPackage[] = [];
  selectedDop: DayOutPackage | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  searchTxt = ''
  availableFilter = "All"
  ratingFilter = "All"

  constructor(private http: HttpClient) {
    this.loadDops();
  }

  loadDops() {
    this.http.get<DayOutPackage[]>("http://localhost:8080/dop/get/all").subscribe(data => {
      data.forEach(obj => {
        this.loading = false;
        this.dopList.push(obj);
        this.permenentDopList.push(obj);
      })
    })
  }

  setAvailabilityFilter(filter: string) {
    this.availableFilter = filter;

    if (this.availableFilter === 'Available') {
      this.dopList = this.permenentDopList.filter(dop => dop.available === true);
    } else if (this.availableFilter === 'Not Available') {
      this.dopList = this.permenentDopList.filter(dop => dop.available === false);
    } else {
      this.dopList = [...this.permenentDopList];
    }
  }

  setRatingFilter(filter: string) {
    this.ratingFilter = filter;

    if (this.ratingFilter === 'All') {
      this.dopList = [...this.permenentDopList];
    } else {
      const ratingValue = parseInt(this.ratingFilter.split(' ')[0], 10);
      this.dopList = this.permenentDopList.filter(dop => dop.rating === ratingValue);
    }
  }

  searchTextFilter() {
    this.dopList = this.permenentDopList.filter(dop => dop.name.toLowerCase().startsWith(this.searchTxt.toLowerCase()) || dop.id.toLowerCase().includes(this.searchTxt.toLowerCase()))
  }

  showModel(dop: DayOutPackage) {
    this.selectedDop = dop;
  }

  editDop(dop: DayOutPackage) {
    console.log(dop);
  }

  deleteDop(dop: DayOutPackage) {
    console.log(dop);
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

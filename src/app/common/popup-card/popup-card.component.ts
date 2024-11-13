import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-popup-card',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
  templateUrl: './popup-card.component.html'
})
export class PopupCardComponent implements OnChanges {
  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getResourceFeatures()
  }

  @Input() resource: any;
  @Output() close = new EventEmitter<void>();

  isAvailable: boolean = false;
  public star: number = 4

  resourceFeaturesValues: any = [];
  resourceFeaturesNames: any = [];

  dateRange = {
    startDate: null as Date | null,
    endDate: null as Date | null
  };  

  closePopup() {
    this.close.emit();
  }

  getResourceFeatures() {
    if (this.resource.id.startsWith("R")) {
      this.resourceFeaturesNames = ["Type", "Capacity", "Features", "Bed Type", "View", "Internet Access", "Television"];

      ["type", "capacity", "features", "bedType", "view", "internetAccess", "television"].forEach(feature => {
        this.resourceFeaturesValues.push(
          ["internetAccess", "television"].includes(feature)
            ? this.resource[feature] === true ? "Yes" : "No"
            : this.resource[feature])
      })
    } else if (this.resource.id.startsWith("H")) {
      this.resourceFeaturesNames = ["Type", "Capacity", "Availble Equipments", "Decorator Style", "Climate Control", "Internet Access"];

      ["type", "capacity", "availEquip", "decoratorStyle", "climateControl", "internetAccess"].forEach(feature => {
        this.resourceFeaturesValues.push(
          ["climateControl", "internetAccess"].includes(feature)
            ? this.resource[feature] === true ? "Yes" : "No"
            : this.resource[feature])
      })
    } else if (this.resource.id.startsWith("DOP")) {
      this.resourceFeaturesNames = ["Duration", "Inclusions", "Equipments", "Age Limit", "Time Of Day", "Food Details", "Group Size"];

      ["duration", "inclusion", "equipments", "ageLimit", "timeOfDay", "foodDetails", "groupSize"].forEach(feature => {
        this.resourceFeaturesValues.push(this.resource[feature])
      })
    }
  }

  book(): void {
    this.router.navigate(['/reserve'], { queryParams: { 
      id: this.resource.id,
      start: this.dateRange.startDate!.toISOString().slice(0, 10),
      end: this.dateRange.endDate!.toISOString().slice(0, 10)
    }});
  }

  checkAvailability(): void {
    // this.http.get("")
    this.isAvailable = true;
  }
}

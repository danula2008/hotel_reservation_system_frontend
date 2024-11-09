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
  imgAr: string[] = [
    "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
  ];
  selectedSrc: string = this.imgAr[0];
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

  changeImage(src: string) {
    this.selectedSrc = src
  }

  book(): void {
    this.router.navigate(['/reserve'], { queryParams: { 
      id: this.resource.id,
      start: this.dateRange.startDate!.toISOString().slice(0, 10),
      end: this.dateRange.endDate!.toISOString().slice(0, 10)
    }});
  }

  checkAvailability(): void {
    this.isAvailable = true;
  }
}

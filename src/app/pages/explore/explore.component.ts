import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../common/card/card.component';
import { trigger, transition, style, animate } from '@angular/animations'
import { PopupCardComponent } from '../../common/popup-card/popup-card.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { NgClass } from "@angular/common"
import { filter } from 'rxjs';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [NgFor, NgIf, CardComponent, FormsModule, MatFormFieldModule, MatInputModule, PopupCardComponent, MatSelectModule, NgClass],
  templateUrl: './explore.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class ExploreComponent {

  constructor(public http: HttpClient) {
    this.awaitLoadResources()
  }

  public searchTxt: string = "";
  selectedId: number | null = null;
  public resourceOptions: string[] = ["Rooms", "Function Halls", "Day Out Packages"]

  showMobileFilters = true;
  showResourceDropdown = false;
  selectedResource = this.resourceOptions[0]
  isClearRatingFilterShown = false;
  showModel = false;

  selectedFilters: { [key: string]: string[] } = {};

  resources: any = []
  permenentResources: any = []
  resourceFilterCategories: any = {}

  getResourcesFilterLists() {
    this.resourceFilterCategories = [];
    let categories: any = {};

    if (this.selectedResource === this.resourceOptions[0]) {
      categories = {
        "Type": [],
        "Bed Type": [],
        "View": []
      };

      for (let resource of this.resources) {
        categories["Type"][resource.type] = (categories["Type"][resource.type] || 0) + 1;
        categories["Bed Type"][resource.bedType] = (categories["Bed Type"][resource.bedType] || 0) + 1;
        categories["View"][resource.view] = (categories["View"][resource.view] || 0) + 1;
      }

    } else if (this.selectedResource === this.resourceOptions[1]) {
      categories = {
        "Type": [],
        "Decorator Style": []
      };

      for (let resource of this.resources) {
        categories["Type"][resource.type] = (categories["Type"][resource.type] || 0) + 1;
        categories["Decorator Style"][resource.decoratorStyle] = (categories["Decorator Style"][resource.decoratorStyle] || 0) + 1;
      }

    } else if (this.selectedResource === this.resourceOptions[2]) {
      categories = {
        "Duration": [],
        "Age Limit": [],
        "Time Of Day": [],
        "Group Size": []
      };

      for (let resource of this.resources) {
        categories["Duration"][resource.duration] = (categories["Duration"][resource.duration] || 0) + 1;
        categories["Age Limit"][resource.ageLimit] = (categories["Age Limit"][resource.ageLimit] || 0) + 1;
        categories["Time Of Day"][resource.timeOfDay] = (categories["Time Of Day"][resource.timeOfDay] || 0) + 1;
        categories["Group Size"][resource.groupSize] = (categories["Group Size"][resource.groupSize] || 0) + 1;
      }
    }

    // Step 2: Filter, sort and prepare resourceFilterCategories in the list format
    const keys = [];
    const values = [];
    const showClearBoolean = [];

    for (let key in categories) {
      const filteredValues = Object.keys(categories[key])
        .filter(value => categories[key][value] > 2)
        .sort();

      // Only include categories with more than one valid entry
      if (filteredValues.length >= 2) {
        keys.push(key);
        values.push(filteredValues);
      }

      showClearBoolean.push(false)
    }

    // Structure the list format
    this.resourceFilterCategories = [keys, ...values, showClearBoolean];
  }


  toogleShowMobileFilters() {
    this.showMobileFilters = !this.showMobileFilters
  }

  toggleResourceDropdown() {
    this.showResourceDropdown = !this.showResourceDropdown;
  }

  setSelectedResource(resource: string) {
    this.showMobileFilters = false;
    this.showResourceDropdown = false;
    this.resources = this.getResources(resource)
    this.getResourcesFilterLists()
  }

  async awaitLoadResources() {
    await this.getResources(this.resourceOptions[0])
  }

  async getResources(resource: string) {
    this.selectedResource = resource;

    return new Promise<void>((resolve, reject) => {
      this.http.get(`http://localhost:8080/${
        resource === this.resourceOptions[0]
        ? "room"
        : resource === this.resourceOptions[1]
          ? 'hall'
          : 'dop'}/get/all`).subscribe({
            next: (data) => {
              this.resources = data;
              this.permenentResources = data;
              this.getResourcesFilterLists();
            }
          });
    });
  }


  clearSearchBar(): void {
    this.searchTxt = "";
  }

  setSelectedId(id: number | null) {
    this.selectedId = id;
    this.showModel = id? true : id===0? true : false;
  }

  clearFilter(category: string) {
    const radioButtons = document.getElementsByName(category) as NodeListOf<HTMLInputElement>;
    radioButtons.forEach((radio: HTMLInputElement) => {
      radio.checked = false;
    });

    this.resourceFilterCategories[this.resourceFilterCategories[0].indexOf(category)][-1] = false

    this.selectedFilters[category] = [];
    this.filterResources()
  }

  toggleFilter(category: string, value: string) {
    this.selectedFilters[category] = [];
    this.resourceFilterCategories[this.resourceFilterCategories[0].indexOf(category)][-1] = true

    if (this.selectedFilters[category].includes(value)) {
      this.selectedFilters[category] = this.selectedFilters[category].filter(val => val !== value);
    } else {
      this.selectedFilters[category].push(value);
    }

    this.filterResources();
  }

  filterResources() {
    let filteredResources = [...this.permenentResources];

    for (const [category, values] of Object.entries(this.selectedFilters)) {
      if (values.length > 0) {
        filteredResources = filteredResources.filter(resource =>
          values.includes(resource[category.replace(/^([A-Z])/, match => match.toLowerCase()).replace(/ /g, '')])
        );
      }
    }

    this.resources = filteredResources;
  }

  clearRatingFilter() {
    const radioButtons = document.getElementsByName("rating") as NodeListOf<HTMLInputElement>;
    radioButtons.forEach((radio: HTMLInputElement) => {
      radio.checked = false;
    });

    this.isClearRatingFilterShown = false

    this.selectedFilters["rating"] = [];
    this.filterResources()
  }

  filterByRating(rating: number) {
    this.isClearRatingFilterShown = true;

    let filteredResources = [...this.permenentResources];

    for (const [category, values] of Object.entries(this.selectedFilters)) {
      if (values.length > 0) {
        filteredResources = filteredResources.filter(resource =>
          values.includes(resource[category.toLowerCase().replace(/ /g, '')])
        );
      }
    }

    filteredResources = filteredResources.filter(resource => resource.rating === rating);

    this.resources = filteredResources;
  }

}

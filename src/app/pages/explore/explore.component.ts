import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../common/card/card.component';
import { trigger, transition, style, animate } from '@angular/animations'
import { PopupCardComponent } from './popup-card/popup-card.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [NgFor, NgIf, CardComponent, FormsModule, MatFormFieldModule, MatInputModule, PopupCardComponent, MatSelectModule],
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
  public selectedFilter: string = "All";
  public showDropDown: boolean = false;
  public searchTxt: string = "";
  selectedId: number | null = 1;
  public resourceOptions:string[] = ["All", "Rooms", "Halls", "Day Out Packages"]
  selectedOption = this.resourceOptions[0];  

  setFilter(filter: string): any {
    this.selectedFilter = filter;
    this.showDropDown = false;
  }

  toggleShowDropdown(): void {
    this.showDropDown = !this.showDropDown;
  }

  clearSearchBar(): void {
    this.searchTxt = "";
  }

  setSelectedId(id: number | null) {
    this.selectedId = id;
  }
}

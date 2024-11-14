import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHallsComponent } from './manage-halls.component';

describe('ManageHallsComponent', () => {
  let component: ManageHallsComponent;
  let fixture: ComponentFixture<ManageHallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageHallsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

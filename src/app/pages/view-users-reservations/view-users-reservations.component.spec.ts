import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsersReservationsComponent } from './view-users-reservations.component';

describe('ViewUsersReservationsComponent', () => {
  let component: ViewUsersReservationsComponent;
  let fixture: ComponentFixture<ViewUsersReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUsersReservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUsersReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

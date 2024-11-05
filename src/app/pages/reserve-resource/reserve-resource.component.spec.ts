import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveResourceComponent } from './reserve-resource.component';

describe('ReserveResourceComponent', () => {
  let component: ReserveResourceComponent;
  let fixture: ComponentFixture<ReserveResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

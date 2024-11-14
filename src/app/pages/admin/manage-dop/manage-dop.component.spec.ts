import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDopComponent } from './manage-dop.component';

describe('ManageDopComponent', () => {
  let component: ManageDopComponent;
  let fixture: ComponentFixture<ManageDopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

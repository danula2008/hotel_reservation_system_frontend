import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-reserve-resource',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
    // routerLink
  ],
  templateUrl: './reserve-resource.component.html'
})
export class ReserveResourceComponent {
  activeStep = 0;

  goToStep(index: number): void {
    if (index >= 0 && index < 4) {
      this.activeStep = index;
    }
  }

  nextStep(): void {
    if (this.activeStep < 3) {
      this.activeStep++;
    }
  }

  previousStep(): void {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }
}

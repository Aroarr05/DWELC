import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-from',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './from.component.html',
  styleUrl: './from.component.css'
})
export class FromComponent {
  housingForm: FormGroup;
  seguridadOptions = ['alarmas', 'camaras', 'puertasReforzadas', 'detectorHumos', 'otro', 'noTiene'];

  constructor(private fb: FormBuilder) {
    this.housingForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      photo: ['', Validators.required],
      availableUnits: [0, [Validators.required, Validators.min(0)]],
      wifi: [false],
      laundry: [false],
      seguridad: [''],
      tipoSeguridad: ['noTiene'],
      coordinates: this.fb.group({
        lat: [''],
        lng: ['']
      })
    });
  }

  onSubmit() {
    if (this.housingForm.valid) {
      console.log("Form submitted:", this.housingForm.value);
      // Aquí iría la lógica para guardar los datos
    } else {
      console.log("Form is invalid");
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched() {
    Object.values(this.housingForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
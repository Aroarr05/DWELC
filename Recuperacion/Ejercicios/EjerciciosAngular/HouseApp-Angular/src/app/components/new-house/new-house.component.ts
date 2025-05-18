import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HousingService } from '../../service/housing.service';
import { HousingLocation } from '../../model/housinglocation';

@Component({
  selector: 'app-new-house',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-house.component.html',
  styleUrls: ['./new-house.component.css']
})

export class NewHouseComponent {
  houseForm: FormGroup;

  constructor(private fb: FormBuilder, private housingService: HousingService) {
    this.houseForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      photo: ['', Validators.required],
      availableUnits: [0, Validators.required],
      wifi: ['', Validators.required],
      laundry: ['', Validators.required],
      seguridad: ['', Validators.required],
      tipoSeguridad: ['', Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required]
    });
  }

  async onSubmit() {
    if (this.houseForm.valid) {
      const formValue = this.houseForm.value;

      const newLocation: HousingLocation = {
        id: Date.now(),
        name: formValue.name,
        city: formValue.city,
        state: formValue.state,
        photo: formValue.photo,
        availableUnits: formValue.availableUnits,
        wifi: formValue.wifi === 'si',
        laundry: formValue.laundry === 'si',
        seguridad: formValue.seguridad,
        tipoSeguridad: formValue.tipoSeguridad,
        coordinates: {
          latitude: formValue.latitude,
          longitude: formValue.longitude,
        }
      };

      try {
        await this.housingService.addHousingLocation(newLocation);
        console.log('Ubicación añadida:', newLocation);
        this.houseForm.reset();
      } catch (error) {
        console.error('Error al guardar la ubicación:', error);
      }
    }
  }

}

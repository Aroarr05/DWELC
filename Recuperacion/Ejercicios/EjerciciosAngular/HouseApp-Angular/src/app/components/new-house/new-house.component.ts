import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

export class NewHouseComponent implements OnInit{
  houseForm: FormGroup;
  isBrowser: boolean;

  constructor(
    private fb: FormBuilder, 
    private housingService: HousingService,
    @Inject(PLATFORM_ID) private platformId :Object
  ) {
    this.isBrowser = isPlatformBrowser (this.platformId);

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

      if (this.isBrowser){
        localStorage.removeItem('eventFormData');
      }

      this.houseForm. reset();

      try {
        await this.housingService.addHousingLocation(newLocation);
        console.log('Ubicación añadida:', newLocation);
        this.houseForm.reset();
      } catch (error) {
        console.error('Error al guardar la ubicación:', error);
      }
    }
  }

  private saveFormToLocalStorage(){
    if (this.isBrowser){
      localStorage.setItem('eventFormData', JSON.stringify(this.houseForm.value));
    }
  }

  private loadFormFromLocalStorage(){
    if (this.isBrowser){
      const savedForm = localStorage.getItem('eventFormData');
      if(savedForm){
        this.houseForm.patchValue(JSON.parse(savedForm));
      }
    }
  }

  ngOnInit() {
    if (this.isBrowser){
      this.loadFormFromLocalStorage();
    }
    this.houseForm.valueChanges.subscribe(()=>{
      this.saveFormToLocalStorage();
    })
  }

}

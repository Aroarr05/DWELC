import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HousingLocationComponent} from '../../housing-location/housing-location.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

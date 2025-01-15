import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-vista',
  imports: [NavbarComponent, AppComponent],
  templateUrl: './vista.component.html',
  styleUrl: './vista.component.css'
})
export class VistaComponent {

}

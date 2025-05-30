import { Component, inject } from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-root',
  imports: [HomeComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'home-app';

  private router= inject(Router);

  navigateToLogin() {
    this.router.navigate(['/login']); 
  }
}

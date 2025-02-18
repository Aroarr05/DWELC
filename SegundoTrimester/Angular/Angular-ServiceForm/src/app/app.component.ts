import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ServiceForm';
}

// npm install -g json-server
// json-server --watch db.json

// a = new BehaviorSubject<any>(null)
// b = a.asObservable();
// update(value:any) { this.a.next(value); }
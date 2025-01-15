import { Component } from '@angular/core';

@Component({
  selector: 'app-ex04',
  standalone: true,
  imports: [],
  templateUrl: './ex04.component.html',
  styleUrl: './ex04.component.css'
})
export class Ex04Component {
  n: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setNumber() {
    this.n = Math.floor(Math.random() * 10 + 1);
  }

  incNumber() {
    this.n++;
  }

  decNumber() {
    this.n--;
  }
}

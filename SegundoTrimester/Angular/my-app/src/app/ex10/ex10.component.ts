import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-ex10',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './ex10.component.html'
})
export class Ex10Component {
  temperature: number = Math.floor(Math.random() * 20 + 1);

  constructor() { }

  ngOnInit(): void {
  }

  incTemp(inc: number) {
    this.temperature += inc;
  }
}

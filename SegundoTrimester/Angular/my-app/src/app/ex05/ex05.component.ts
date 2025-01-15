import { Component } from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-ex05',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule
  ],
  templateUrl: './ex05.component.html',
  styleUrl: './ex05.component.css'
})
export class Ex05Component {
  word: string = "init...";

  constructor() { }

  ngOnInit(): void {
  }

  clearWord() {
    this.word = "";
  }
}

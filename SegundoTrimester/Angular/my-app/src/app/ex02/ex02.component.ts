import { Component } from '@angular/core';
import {JsonPipe, UpperCasePipe} from "@angular/common";

type Person = {
  name: string;
  position: string;
  salary: number;
}

@Component({
  selector: 'app-ex02',
  standalone: true,
  imports: [
    JsonPipe,
    UpperCasePipe
  ],
  templateUrl: './ex02.component.html',
  styleUrl: './ex02.component.css'
})

export class Ex02Component {
  x: number = 0;
  y: number = 0;
  word: string = "";
  person: Person = {
    name: '',
    position: '',
    salary: 0
  };

  constructor() { }

  ngOnInit(): void {
    this.x = 23;
    this.y = 9;
    this.word = "meetup";
    this.person = {
      name: "Alan Brito",
      position: "full-stack dev",
      salary: 2000
    };
  }

}

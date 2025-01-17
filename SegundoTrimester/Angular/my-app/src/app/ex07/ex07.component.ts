import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ex07',
  standalone: true,
  imports: [
    NgForOf, FormsModule
  ],
  templateUrl: './ex07.component.html'
})
export class Ex07Component {
  numbers: number[] = [];
  fruits: string[] = [];
  fruitsName: string = '';

  constructor() { }

  ngOnInit(): void {
    this.numbers = [1, 5, 8, 24, 32, 11, 55];
    this.fruits = ["pear", "apple", "mango", "watermelon", "kiwi"];
    this.numbers.sort((a, b) => a - b);
    this.fruits.sort();
  }

  updateFruitName(){
    this.fruitsName = this.fruitsName.split('').map(char => char.toUpperCase()).join('');
  }
}

import { Component } from '@angular/core';
//import {Employee} from "../employee";
//import {EMPLOYEE_LIST} from "../employee-list";
//import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-ex09',
  standalone: true,
  imports: [
    //NgForOf
  ],
  templateUrl: './ex09.component.html'
})
export class Ex09Component {
  //employees: Employee[] = [];

  constructor() { }

  ngOnInit(): void {
    //this.employees = EMPLOYEE_LIST;
  }
}

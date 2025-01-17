import { Component } from '@angular/core';
import { Employee } from '../models/employee';
import { EMPLOYEE_LIST } from '../models/employee-list';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-ex09',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './ex09.component.html'
})
export class Ex09Component {
  employees: Employee[] = [];
  sortCriterion: 'name' | 'position' | 'salary' = 'name';  

  constructor() { }

  ngOnInit(): void {
    this.employees = EMPLOYEE_LIST;
    this.sortEmployees(this.sortCriterion);  
  }

 
  sortEmployees(criterion: 'name' | 'position' | 'salary'): void {
    this.sortCriterion = criterion;  
    this.employees.sort((a, b) => {
      if (typeof a[criterion] === 'string' && typeof b[criterion] === 'string') {
        return a[criterion].localeCompare(b[criterion]);
      } else if (typeof a[criterion] === 'number' && typeof b[criterion] === 'number') {
        return a[criterion] - b[criterion];
      }
      return 0;
    });
  }
}

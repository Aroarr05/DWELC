import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  selectedEmployeeName: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    const selectedEmployee = this.employeeService.getSelectedEmployee();
    this.selectedEmployeeName = selectedEmployee ? selectedEmployee.name : 'No employee selected';
  }
}

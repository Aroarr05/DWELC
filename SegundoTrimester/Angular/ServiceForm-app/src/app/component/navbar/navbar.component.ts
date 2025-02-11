import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  selectedEmployeeName: string | null = null;
  employees: { id: number, name: string }[] = [];
  employeeControl: FormControl = new FormControl();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    const selectedEmployee = this.employeeService.getSelectedEmployee();
    this.selectedEmployeeName = selectedEmployee?.name || 'No employee selected';
    if (selectedEmployee) {
      this.employeeControl.setValue(selectedEmployee.id); 
    }

    this.employeeControl.valueChanges.subscribe(employeeId => {
      const selectedEmployee = this.employees.find(emp => emp.id === employeeId);
      this.selectedEmployeeName = selectedEmployee ? selectedEmployee.name : 'No employee selected';
    });
  }

  selectEmployee(employeeId: number): void {
    this.employeeService.selectEmployee(employeeId);
    this.selectedEmployeeName = this.employeeService.getSelectedEmployee()?.name || 'No employee selected';
    this.employeeControl.setValue(employeeId); 
  }
}

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  employees: Employee[] = [];
  selectedEmployeeName: string = 'No employee selected';  
  employeeControl = new FormControl<number | null>(null); 

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {

    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });

    this.employeeService.getSelectedEmployee().subscribe(selectedEmployee => {
      if (selectedEmployee) {
        this.selectedEmployeeName = selectedEmployee.name || selectedEmployee.name;  
        this.employeeControl.setValue(selectedEmployee.id, { emitEvent: false });  
      } else {
        this.selectedEmployeeName = 'No employee selected';
      }
    });

    this.employeeControl.valueChanges.subscribe(employeeId => {
      console.log('Empleado seleccionado:', employeeId);
      const selectedId = Number(employeeId);
      this.employeeService.selectEmployee(selectedId);
    });
  }
}

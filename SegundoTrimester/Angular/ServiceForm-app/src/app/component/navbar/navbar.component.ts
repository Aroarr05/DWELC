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
  
  selectedEmployeeName: string = 'No employee selected';
  employees: Employee[] = [];
  employeeControl: FormControl = new FormControl();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // Suscribirse a la lista de empleados
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });

    // Suscribirse al empleado seleccionado
    this.employeeService.getSelectedEmployee().subscribe(selectedEmployee => {
      if (selectedEmployee) {
        this.selectedEmployeeName = selectedEmployee.name;
        this.employeeControl.setValue(selectedEmployee.id);
      } else {
        this.selectedEmployeeName = 'No employee selected';
      }
    });

    // Escuchar cambios en el control del formulario y actualizar el servicio
    this.employeeControl.valueChanges.subscribe(employeeId => {
      const selectedEmployee = this.employees.find(emp => emp.id === employeeId);
      if (selectedEmployee) {
        this.employeeService.selectEmployee(employeeId);
      }
    });
  }
}

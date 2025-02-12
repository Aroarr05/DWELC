import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  private selectedEmployeeSubject: BehaviorSubject<Employee | null> = new BehaviorSubject<Employee | null>(null);

  constructor() {
    this.loadEmployees();
  }

  private loadEmployees() {
    const apiUrl = 'http://localhost:3000/employee';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => { this.employeesSubject.next(data);
      })
      .catch(error=> console.error('Error al cargar los empleados:', error));
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  selectEmployee(id: number): void {
    const employee = this.employeesSubject.value.find(emp => emp.id === id);
    if (employee) {
      localStorage.setItem('selectedEmployee', JSON.stringify(employee));
      this.selectedEmployeeSubject.next(employee);
    }
  }

  getSelectedEmployee(): Observable<Employee | null> {
    if (typeof localStorage !== 'undefined') {
      const savedEmployee = localStorage.getItem('selectedEmployee');
      if (savedEmployee) {
        this.selectedEmployeeSubject.next(JSON.parse(savedEmployee));
      }
    }
    return this.selectedEmployeeSubject.asObservable();
  }

}

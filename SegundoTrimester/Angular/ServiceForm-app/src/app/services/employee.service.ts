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

  loadEmployees(): void {
    if (typeof localStorage !== 'undefined') {
      const savedEmployees = localStorage.getItem('employees');
      if (savedEmployees) {
        this.employeesSubject.next(JSON.parse(savedEmployees));
      } else {
        const defaultEmployees: Employee[] = [
          { id: 1, name: 'Juan' },
          { id: 2, name: 'Ana' },
          { id: 3, name: 'Carlos' }
        ];
        localStorage.setItem('employees', JSON.stringify(defaultEmployees));
        this.employeesSubject.next(defaultEmployees);
      }
    }
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

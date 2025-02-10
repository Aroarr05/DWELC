import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private employeesUrl = 'assts/employee.json';

  constructor(private http: HttpClient){}

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.employeesUrl);
  }
  
  getSelectedEmployee(): Employee | null{
    const selected = localStorage.getItem('selectedEmployee');
    return selected ? JSON.parse(selected): null;
  }
  
  setSelectedEmployee(employee:Employee): void{
    localStorage.setItem('selectedEmployee', JSON.stringify(employee));
  }

}

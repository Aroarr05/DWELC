import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoggerService } from '../../services/logger.service'; 
import { EmployeeService } from '../../services/employee.service'; 
import { Employee } from '../../model/employee.model'; 
import { EventM } from '../../model/event.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-form',
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  employees: Employee[] = [];
  eventForm: FormGroup;

  constructor(
    private loggerService: LoggerService,
    private employeeService: EmployeeService
  ) {
    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      client: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      classification: new FormControl('log', [Validators.required])
    });
  }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const event: EventM = {
        id: new Date().getTime(),  // Generate a unique ID using the timestamp
        employee: this.employeeService.getSelectedEmployee()!,  // Get the selected employee
        title: this.eventForm.value.title,
        client: this.eventForm.value.client,
        date: this.eventForm.value.date,
        description: this.eventForm.value.description,
        classification: this.eventForm.value.classification,
        creationDate: new Date()
      };
      
      // Call LoggerService to add the event
      this.loggerService.addEvent(event);
      this.eventForm.reset();  // Reset the form
    }
  }
}
